import { createAccount, createClient } from 'genlayer-js'
import { studionet } from 'genlayer-js/chains'
import { TransactionStatus } from 'genlayer-js/types'

type ChatHistoryItem = {
  role: string
  content: string
}

type JsonObject = Record<string, unknown>

type QuizQuestion = {
  id: string
  question: string
  options: string[]
  answer: string
  explanation?: string
}

let singletonClient: ReturnType<typeof createClient> | null = null
let singletonAccount: ReturnType<typeof createAccount> | null = null
let singletonKey: string | null = null
let consensusInitPromise: Promise<void> | null = null

function normalizePrivateKey(privateKeyRaw: string): `0x${string}` {
  const trimmed = privateKeyRaw.trim()
  if (trimmed === '') {
    throw new Error('GENLAYER_KEY_MISSING')
  }
  if (!trimmed.startsWith('0x')) {
    throw new Error('GENLAYER_KEY_MUST_START_WITH_0x')
  }
  return trimmed as `0x${string}`
}

function normalizeContractAddress(addressRaw: string): `0x${string}` {
  const trimmed = addressRaw.trim()
  if (trimmed === '') {
    throw new Error('GENLAYER_CONTRACT_ADDRESS_MISSING')
  }
  if (!trimmed.startsWith('0x')) {
    throw new Error('GENLAYER_CONTRACT_ADDRESS_INVALID')
  }
  return trimmed as `0x${string}`
}

function parseJsonObject(raw: string, errorCode: string): JsonObject {
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error(errorCode)
    }
    return parsed as JsonObject
  } catch {
    throw new Error(errorCode)
  }
}

function toStringResult(data: unknown): string {
  if (typeof data === 'string') return data
  return JSON.stringify(data)
}

export async function initializeGenLayer(privateKeyRaw: string) {
  const privateKey = normalizePrivateKey(privateKeyRaw)
  if (!singletonClient || !singletonAccount || singletonKey !== privateKey) {
    singletonAccount = createAccount(privateKey)
    singletonClient = createClient({
      chain: studionet,
      account: singletonAccount
    })
    singletonKey = privateKey
    consensusInitPromise = null
  }

  if (!consensusInitPromise) {
    console.log('⚠️ Transaction Pending... Initializing consensus')
    consensusInitPromise = singletonClient.initializeConsensusSmartContract()
      .then(() => {
        console.log('✅ Consensus Initialized')
      })
      .catch((error) => {
        consensusInitPromise = null
        throw error
      })
  }

  await consensusInitPromise
  return { client: singletonClient, account: singletonAccount }
}

export async function runFootballChatContract(args: {
  privateKey: string
  contractAddress: string
  message: string
  history: ChatHistoryItem[]
}) {
  const { client, account } = await initializeGenLayer(args.privateKey)
  const address = normalizeContractAddress(args.contractAddress)

  const txHash = await client.writeContract({
    account,
    address,
    functionName: 'football_chat',
    args: [args.message, JSON.stringify(args.history ?? [])],
    value: 0n
  })

  console.log('⚠️ Transaction Pending...', { txHash, method: 'football_chat' })
  const receipt = await client.waitForTransactionReceipt({
    hash: txHash,
    status: TransactionStatus.ACCEPTED,
    retries: 150,
    interval: 2000
  })
  console.log('✅ Transaction Accepted', { txHash, status: (receipt as any)?.status })

  const readResult = await client.readContract({
    account,
    address,
    functionName: 'get_last_chat',
    args: [account.address]
  })

  const rawJson = toStringResult(readResult)
  const payload = parseJsonObject(rawJson, 'MALFORMED_CHAT_JSON')
  return {
    txHash,
    txStatus: String((receipt as any)?.status ?? 'ACCEPTED'),
    rawJson,
    payload
  }
}

function normalizeQuizPayload(rawJson: string): {
  payload: JsonObject
  questions: QuizQuestion[]
} {
  const payload = parseJsonObject(rawJson, 'MALFORMED_QUIZ_JSON')
  const questionsValue = payload.questions
  if (!Array.isArray(questionsValue)) {
    throw new Error('MALFORMED_QUIZ_QUESTIONS')
  }

  const questions: QuizQuestion[] = questionsValue.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error('MALFORMED_QUIZ_QUESTION_ITEM')
    }
    const q = item as Record<string, unknown>
    const optionsRaw = q.options
    if (!Array.isArray(optionsRaw)) {
      throw new Error('MALFORMED_QUIZ_OPTIONS')
    }
    const options = optionsRaw.map((v) => String(v))
    const question = String(q.question ?? '').trim()
    const answer = String(q.answer ?? '').trim()
    if (!question || !answer || options.length !== 4) {
      throw new Error('MALFORMED_QUIZ_CONTENT')
    }
    return {
      id: String(q.id ?? `q_${index + 1}`),
      question,
      options,
      answer,
      explanation: typeof q.explanation === 'string' ? q.explanation : ''
    }
  })

  return { payload, questions }
}

export async function runPlayerQuizContract(args: {
  privateKey: string
  contractAddress: string
  playerName: string
  difficulty: string
  count: number
}) {
  const { client, account } = await initializeGenLayer(args.privateKey)
  const address = normalizeContractAddress(args.contractAddress)

  const txHash = await client.writeContract({
    account,
    address,
    functionName: 'generate_player_quiz',
    args: [args.playerName, args.difficulty, args.count],
    value: 0n
  })

  console.log('⚠️ Transaction Pending...', { txHash, method: 'generate_player_quiz' })
  const receipt = await client.waitForTransactionReceipt({
    hash: txHash,
    status: TransactionStatus.ACCEPTED,
    retries: 150,
    interval: 2000
  })
  console.log('✅ Transaction Accepted', { txHash, status: (receipt as any)?.status })

  const readResult = await client.readContract({
    account,
    address,
    functionName: 'get_last_quiz',
    args: [account.address]
  })

  const rawJson = toStringResult(readResult)
  const { payload, questions } = normalizeQuizPayload(rawJson)
  return {
    txHash,
    txStatus: String((receipt as any)?.status ?? 'ACCEPTED'),
    rawJson,
    payload,
    questions
  }
}

export async function runCategoryQuizContract(args: {
  privateKey: string
  contractAddress: string
  category: string
  difficulty: string
  count: number
}) {
  const { client, account } = await initializeGenLayer(args.privateKey)
  const address = normalizeContractAddress(args.contractAddress)

  const txHash = await client.writeContract({
    account,
    address,
    functionName: 'generate_category_quiz',
    args: [args.category, args.difficulty, args.count],
    value: 0n
  })

  console.log('⚠️ Transaction Pending...', { txHash, method: 'generate_category_quiz' })
  const receipt = await client.waitForTransactionReceipt({
    hash: txHash,
    status: TransactionStatus.ACCEPTED,
    retries: 150,
    interval: 2000
  })
  console.log('✅ Transaction Accepted', { txHash, status: (receipt as any)?.status })

  const readResult = await client.readContract({
    account,
    address,
    functionName: 'get_last_quiz',
    args: [account.address]
  })

  const rawJson = toStringResult(readResult)
  const { payload, questions } = normalizeQuizPayload(rawJson)
  return {
    txHash,
    txStatus: String((receipt as any)?.status ?? 'ACCEPTED'),
    rawJson,
    payload,
    questions
  }
}
