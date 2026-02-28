import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { quizData, getQuestions, leagues, popularPlayers } from './data/questions'
import {
  runCategoryQuizContract,
  runFootballChatContract,
  runPlayerQuizContract
} from './genlayer'

type Bindings = {
  OPENAI_API_KEY?: string
  OPENAI_BASE_URL?: string
  VITE_GENLAYER_KEY?: string
  GENLAYER_CONTRACT_ADDRESS?: string
}

const app = new Hono<{ Bindings: Bindings }>()
const DEFAULT_GENLAYER_CONTRACT = '0x688AA322f581Db6677aa06B80c04C66Bc72E1102'

function getGenLayerConfig(c: any) {
  const privateKey =
    c.env?.VITE_GENLAYER_KEY ||
    (globalThis as any).VITE_GENLAYER_KEY ||
    ''
  const contractAddress =
    c.env?.GENLAYER_CONTRACT_ADDRESS ||
    (globalThis as any).GENLAYER_CONTRACT_ADDRESS ||
    DEFAULT_GENLAYER_CONTRACT
  return { privateKey, contractAddress }
}

app.use('/api/*', cors())

// API: Get leagues list
app.get('/api/leagues', (c) => {
  return c.json({ leagues })
})

// API: Get popular players
app.get('/api/players/popular', (c) => {
  return c.json({ players: popularPlayers })
})

// API: Get quiz questions
app.get('/api/quiz/:category/:difficulty', (c) => {
  const category = c.req.param('category')
  const difficulty = c.req.param('difficulty') as 'easy' | 'medium' | 'hard'
  const count = parseInt(c.req.query('count') || '10')

  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    return c.json({ error: 'Invalid difficulty. Use easy, medium, or hard.' }, 400)
  }

  const questions = getQuestions(category, difficulty, count)

  if (questions.length === 0) {
    // Return some fallback questions if category is not found
    const fallback = getQuestions('champions_league', difficulty, count)
    return c.json({
      questions: fallback,
      total: fallback.length,
      category: 'champions_league',
      difficulty
    })
  }

  return c.json({ questions, total: questions.length, category, difficulty })
})

// API: AI Chat endpoint
app.post('/api/ai/chat', async (c) => {
  const body = await c.req.json()
  const { message, history = [] } = body

  if (!message) {
    return c.json({ error: 'Message is required' }, 400)
  }

  try {
    const { privateKey, contractAddress } = getGenLayerConfig(c)
    if (!privateKey || privateKey.trim() === '') {
      return c.json({ error: 'VITE_GENLAYER_KEY is required for contract calls.' }, 500)
    }

    const result = await runFootballChatContract({
      privateKey,
      contractAddress,
      message,
      history: Array.isArray(history) ? history.slice(-10) : []
    })

    return c.json({
      reply: result.rawJson,
      data: result.payload,
      txHash: result.txHash,
      txStatus: result.txStatus
    })
  } catch (error) {
    console.error('❌ Error:', error)
    return c.json({ error: 'Contract chat failed.' }, 502)
  }
})

function getSmartFootballResponse(message: string): string {
  const msg = message.toLowerCase()
  
  // Messi
  if (msg.includes('messi') || (msg.includes('lionel') && !msg.includes('ronaldo'))) {
    return `## ⭐ Lionel Messi — The Greatest of All Time\n\nBorn **June 24, 1987** in Rosario, Argentina, Messi is the undisputed holder of the GOAT title for most football experts.\n\n**Career Timeline:**\n- 🔵 **FC Barcelona** (2003–2021) — 21 seasons, 778 games, 672 goals, 4 Champions League titles\n- 🔴 **Paris Saint-Germain** (2021–2023) — 75 games, 32 goals\n- 🩷 **Inter Miami** (2023–present) — MLS, helping grow football in the USA\n- 🇦🇷 **Argentina** — 2022 World Cup winner, 3x Copa América\n\n**Individual Honours:**\n- 🏆 **8 Ballon d'Or** awards — an all-time record\n- 🥇 2022 FIFA World Player of the Year\n- 🏅 La Liga all-time top scorer (474 goals)\n- 🎯 91 goals in a calendar year (2012) — world record\n\n**Why is he considered the GOAT?** Messi combined extraordinary dribbling, vision, finishing, and consistency for over 20 years at the highest level. His 2022 World Cup win with Argentina finally completed his trophy cabinet.`
  }
  
  // Ronaldo
  if (msg.includes('ronaldo') || msg.includes('cristiano') || msg.includes('cr7')) {
    return `## ⭐ Cristiano Ronaldo — The Machine\n\nBorn **February 5, 1985** in Funchal, Madeira, Portugal. CR7 is the all-time top scorer in men's football history.\n\n**Career Timeline:**\n- 🟢 **Sporting CP** (2001–2003) — Youth debut\n- 🔴 **Manchester United** (2003–2009) — 118 goals, 1 Champions League\n- ⚪ **Real Madrid** (2009–2018) — 450 goals, 4 Champions League, 2 La Liga titles\n- ⚫ **Juventus** (2018–2021) — 101 goals, 2 Serie A titles\n- 🔴 **Manchester United** (2021–2022) — Return & departure\n- 🟡 **Al-Nassr** (2023–present) — Saudi Pro League\n- 🇵🇹 **Portugal** — Euro 2016 winner, all-time international top scorer (130+ goals)\n\n**Records:**\n- 🥅 **900+ career goals** — no player in history has scored more\n- 🏆 **5 Ballon d'Or** awards\n- 🌟 **5 Champions League titles** (record)\n- ⚡ All-time UCL top scorer (140+ goals)\n\n**His edge:** Ronaldo's physical transformation, work ethic, and aerial ability set him apart. He won titles in FOUR different top leagues.`
  }
  
  // Messi vs Ronaldo
  if ((msg.includes('messi') && msg.includes('ronaldo')) || msg.includes('goat debate') || msg.includes('compare') && (msg.includes('messi') || msg.includes('ronaldo'))) {
    return `## ⚖️ Messi vs Ronaldo — The Greatest Debate\n\nThis is the defining rivalry of modern football. Here's a balanced breakdown:\n\n| Metric | Messi | Ronaldo |\n|--------|-------|--------|\n| Ballon d'Or | **8** | 5 |\n| Career goals | 800+ | **900+** |\n| Champions League | **4** | 5 |\n| World Cup | **✓ (2022)** | 0 |\n| International goals | 108 | **130+** |\n| Playing style | Natural genius | Athletic machine |\n\n**Messi's case:** Better dribbler, more assists, more Ballon d'Ors, won the World Cup (the last piece of his puzzle). His 91-goal year in 2012 is almost superhuman.\n\n**Ronaldo's case:** More goals overall, won leagues in 4 different countries, incredible physical longevity, most international goals ever scored.\n\n**Verdict:** The debate is genuinely unresolvable — both are once-in-a-generation talents. Messi edges it for most analysts due to natural ability and efficiency, but Ronaldo's achievements across multiple leagues make him equally valid.`
  }
  
  // Champions League
  if (msg.includes('champions league') || msg.includes('ucl') || msg.includes('european cup')) {
    return `## 🏆 UEFA Champions League — Europe's Premier Competition\n\nFounded in **1955** as the European Cup, rebranded as the Champions League in **1992**.\n\n**All-Time Winners Table:**\n1. 🇪🇸 **Real Madrid** — 15 titles (record)\n2. 🇩🇪 **AC Milan** — 7 titles\n3. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Liverpool** — 6 titles\n4. 🇩🇪 **Bayern Munich** — 6 titles\n5. 🇪🇸 **Barcelona** — 5 titles\n6. 🇩🇪 **Ajax** — 4 titles\n\n**Key Records:**\n- 🥅 **All-time top scorer:** Cristiano Ronaldo (140+ goals)\n- 🏟️ **Most finals played:** Real Madrid (18)\n- 👑 **Most successful manager in UCL:** Carlo Ancelotti (4 titles — AC Milan x2, Real Madrid x2)\n\n**Iconic Moments:**\n- 🎭 **"Miracle of Istanbul" (2005)** — Liverpool 3-3 AC Milan (5-3 pens) after being 3-0 down at half-time\n- ⚡ **Real Madrid's 3 consecutive titles (2016–2018)** under Zinedine Zidane\n- 🌟 **Barca's 2009 treble** under Pep Guardiola — 6-2 vs Real Madrid en route\n- 💫 **Ajax 1994-95** with De Boer, Seedorf, Kluivert, Davids — peak of Dutch football`
  }
  
  // Premier League
  if (msg.includes('premier league') || msg.includes('epl') || msg.includes('english football')) {
    return `## ⚽ Premier League — The World's Most-Watched League\n\nFounded: **1992** (replacing the old First Division)\nTeams: **20 clubs**, 38 games per season\nCurrent broadcast deal: **£10+ billion** globally\n\n**Title Winners (Most):**\n1. 🔴 **Manchester United** — 13 titles\n2. 🔵 **Manchester City** — 10 titles\n3. 🔵 **Chelsea** — 6 titles\n4. 🔴 **Arsenal** — 3 titles\n5. 🔴 **Liverpool** — 2 titles\n\n**Legendary Records:**\n- 📊 **Alan Shearer** — 260 goals (all-time top scorer)\n- 🛡️ **Petr Cech** — 202 clean sheets (goalkeeper record)\n- 🏆 **Arsenal 2003-04** — "The Invincibles" — 38 games unbeaten\n- ⭐ **Man City 2017-18** — 100 points (all-time record)\n- 🦊 **Leicester City 2015-16** — 5000-1 outsiders who won the title!\n- ⚡ **Shane Long** — Fastest PL goal (7.69 seconds, 2019)\n\n**Most Expensive Transfers:** Jack Grealish to Man City £100m, Declan Rice to Arsenal £105m`
  }
  
  // World Cup
  if (msg.includes('world cup') || msg.includes('worldcup') || msg.includes('fifa world')) {
    return `## 🌍 FIFA World Cup — The Greatest Sporting Event on Earth\n\nHeld every **4 years** since **1930 in Uruguay**. Over **1.5 billion people** watch the final.\n\n**Most World Cup Wins:**\n1. 🇧🇷 **Brazil** — 5 titles (1958, 1962, 1970, 1994, 2002)\n2. 🇩🇪 **Germany** — 4 titles (1954, 1974, 1990, 2014)\n3. 🇮🇹 **Italy** — 4 titles (1934, 1938, 1966, 1982)\n4. 🇦🇷 **Argentina** — 3 titles (1978, 1986, 2022)\n5. 🇫🇷 **France** — 2 titles (1998, 2018)\n\n**Records:**\n- 🥅 **Miroslav Klose** — 16 goals (all-time top scorer)\n- 👑 **Brazil** — only nation to play in every World Cup\n- ⭐ **Pelé** — won his first World Cup aged just 17 in 1958!\n- 🎯 **Mbappe** — youngest (19y 183d) to score in a World Cup final\n\n**Greatest Moments:**\n- 🇦🇷 **Argentina 2022** — Messi's crowning glory after 36 years\n- 🇩🇪 **Germany 7-1 Brazil (2014)** — the most shocking result ever\n- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **England 1966** — still England's only title, at home`
  }
  
  // Managers
  if (msg.includes('manager') || msg.includes('guardiola') || msg.includes('ferguson') || msg.includes('mourinho') || msg.includes('ancelotti') || msg.includes('klopp') || msg.includes('wenger')) {
    return `## 🎩 Greatest Football Managers of All Time\n\n**1. Sir Alex Ferguson** 🏴󠁧󠁢󠁥󠁮󠁧󠁿\nManchester United (1986–2013). **38 trophies** — 13 Premier Leagues, 2 Champions Leagues, 5 FA Cups. The definitive managerial career.\n\n**2. Pep Guardiola** 🇪🇸\nBarcelona (2008–12), Bayern Munich (2013–16), Man City (2016–). Revolutionized football with tiki-taka and positional play. Won trebles with THREE different clubs.\n\n**3. José Mourinho** 🇵🇹\n"The Special One." Champions League with Porto (2004) and Inter Milan (2010). Won the PL with Chelsea, La Liga with Real Madrid, Serie A with Inter.\n\n**4. Carlo Ancelotti** 🇮🇹\nOnly manager to win the Champions League with **4 different clubs** (AC Milan x2, Chelsea, Real Madrid x2). Remarkable for man-management.\n\n**5. Jürgen Klopp** 🇩🇪\nTransformed Liverpool with high-energy gegenpressing. Won the Champions League (2019), Premier League (2020), and FA Cup (2022).\n\n**6. Johan Cruyff** 🇳🇱\nInvented "Total Football" as Ajax manager, created the foundations of Barcelona's tiki-taka through La Masia.`
  }
  
  // Haaland
  if (msg.includes('haaland')) {
    return `## ⚡ Erling Haaland — The Norwegian Goal Machine\n\nBorn **January 21, 2000** in Leeds, England (Norwegian nationality). Son of former Man City player Alfie Haaland.\n\n**Career Stats:**\n- 🇳🇴 **Molde** (2017–2019) — Professional debut\n- 🇦🇹 **RB Salzburg** (2019–20) — 29 goals in 27 games including 8 in UCL group stage\n- 🇩🇪 **Borussia Dortmund** (2020–22) — **86 goals in 89 games** — phenomenal\n- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 **Manchester City** (2022–present) — **£51m** — arguably the bargain of the century\n\n**Records at Manchester City:**\n- 🥅 **36 PL goals in debut season** (2022-23) — smashing the record of 34 set in 38 games\n- ⚡ **Fastest to 50 PL goals** — just 48 games\n- 🏆 **Treble winner** 2022-23 (PL + FA Cup + Champions League)\n\n**Playing Style:** Elite movement, clinical finishing, incredible work rate. At 6'4" but with pace — a truly unique striker.\n\n**Norway:** Despite phenomenal club career, Norway have never qualified for a major tournament with Haaland.`
  }
  
  // Pelé
  if (msg.includes('pele') || msg.includes('pelé') || msg.includes('pele')) {
    return `## 👑 Pelé — The King of Football\n\n**Edson Arantes do Nascimento** (October 23, 1940 – December 29, 2022)\n\n**Career Overview:**\n- 🇧🇷 **Santos FC** (1956–1974) — 643 goals in 659 games\n- 🇺🇸 **New York Cosmos** (1975–1977) — helped launch football in the USA\n- 🇧🇷 **Brazil national team** — 77 goals in 92 games\n\n**World Cup Legend:**\n- 🌍 **3x FIFA World Cup winner** (1958 🇸🇪, 1962 🇨🇱, 1970 🇲🇽)\n- Won his **first World Cup aged 17** in Sweden — the youngest ever winner\n- His 1970 team with Pelé, Jairzinho, Rivellino is considered **the greatest national team ever**\n\n**Records:**\n- 🥅 **1,281 goals in 1,363 games** (per FIFA official records)\n- Only player to win **3 World Cups**\n- Named **FIFA Co-Player of the 20th Century** alongside Maradona\n\n**Legacy:** Pelé never played in European club football, which some argue limits comparison with modern players. But his numbers, his World Cup dominance, and his cultural impact are unmatched.`
  }

  // Maradona
  if (msg.includes('maradona') || msg.includes('diego maradona')) {
    return `## 🙌 Diego Maradona — The Hand of God\n\n**Diego Armando Maradona** (October 30, 1960 – November 25, 2020)\n\n**Career Highlights:**\n- 🇦🇷 **Boca Juniors** (1981–82) — Argentine debut\n- 🇪🇸 **FC Barcelona** (1982–84) — European adventure begins\n- 🇮🇹 **Napoli** (1984–91) — **Greatest chapter**: led them to **2 Serie A titles** as an unfancied club\n- 🇪🇸 **Sevilla, Newell's Old Boys, Boca** — later career\n\n**1986 World Cup — The Greatest Individual Tournament:**\n- 🌍 Led Argentina to glory in Mexico\n- 🎯 Voted **Player of the Tournament**\n- ⚡ **"Goal of the Century"** vs England — dribbled from his own half, beat 6 players\n- 🤚 **"Hand of God"** — the controversial punched goal in the same match\n- Scored **5 goals** and made **5 assists** en route to the final\n\n**Legacy:** Maradona is the ultimate contradiction — divine skill and human flaws. He carried entire teams by himself and made football **personal** in a way no other player ever did. In Argentina and Naples, he is worshipped as a god.`
  }
  
  // Tactical / formations
  if (msg.includes('tactic') || msg.includes('formation') || msg.includes('4-3-3') || msg.includes('4-4-2') || msg.includes('tiki-taka') || msg.includes('gegenpressing') || msg.includes('pressing')) {
    return `## ⚙️ Football Tactics & Formations Explained\n\n**Classic Formations:**\n\n**4-4-2** — The traditional British formation. Two lines of four with two strikers. Simple, effective, defensively solid. Favoured by Sir Alex Ferguson early in his career.\n\n**4-3-3** — Attacking formation with a front three. Used by Guardiola's Barcelona and modern Liverpool. Creates width and triangles.\n\n**3-5-2** — Three defenders, wing-backs providing width. Italy's classic. Used by Antonio Conte at Juventus and Chelsea.\n\n**4-2-3-1** — Two defensive midfielders protecting the back four, with a #10 behind a lone striker. Very popular in the 2000s.\n\n**Tactical Philosophies:**\n\n- 🎨 **Tiki-Taka** (Guardiola/Barcelona) — short passing, high possession, positional superiority\n- ⚡ **Gegenpressing** (Klopp/Liverpool) — winning the ball back immediately after losing it\n- 🏛️ **Catenaccio** (Italian tradition) — deep defending, organized defensive blocks\n- 🌀 **Total Football** (Cruyff/Ajax/Netherlands) — fluid positional interchange between all players`
  }
  
  // La Liga / Spain
  if (msg.includes('la liga') || msg.includes('real madrid') || msg.includes('barcelona') || msg.includes('atletico') || msg.includes('spanish football')) {
    return `## 🇪🇸 La Liga — Spain's Premier Division\n\nFounded: **1929** | 20 clubs | Dominated by the "Big Two"\n\n**Most La Liga Titles:**\n1. 🤍 **Real Madrid** — 36 titles\n2. 🔵 **Barcelona** — 27 titles\n3. 🔴 **Atletico Madrid** — 11 titles\n4. 🔵🟡 **Valencia** — 6 titles\n\n**Real Madrid vs Barcelona — El Clásico:**\n- The most watched club football fixture on Earth\n- Madrid lead on league titles (36 vs 27)\n- Barca lead on Copa del Rey (31 vs 20)\n- UCL: Madrid have 15, Barca have 5\n\n**Key Records:**\n- 🥅 **Messi** — La Liga all-time top scorer (474 goals)\n- ⚡ **Cristiano Ronaldo** — 450 goals for Real Madrid\n- 🏆 **Real Madrid** — Most Champions League titles (15) of any La Liga club\n\n**Golden Era:** Barcelona's 2008-2012 team under Guardiola — Messi, Xavi, Iniesta, Busquets — is considered one of the greatest club sides ever assembled.`
  }
  
  // Serie A / Italy
  if (msg.includes('serie a') || msg.includes('italian football') || msg.includes('juventus') || msg.includes('ac milan') || msg.includes('inter milan')) {
    return `## 🇮🇹 Serie A — Italian Football's Top Flight\n\nFounded: **1898** (as Italian Football Championship)\nKnown for: **Tactical sophistication, defensive mastery (Catenaccio)**\n\n**Most Serie A Titles:**\n1. ⚫⚪ **Juventus** — 36 titles (9 consecutive: 2012–2020)\n2. ⚫ **Inter Milan** — 19 titles\n3. 🔴⚫ **AC Milan** — 19 titles\n4. 🔵 **Genoa** — 9 titles (mostly pre-war)\n5. 🟡🔵 **Torino** — 7 titles\n\n**Champions League Pedigree:**\n- 🏆 **AC Milan** — 7 UCL titles (record in Italy)\n- 🏆 **Inter Milan** — 3 UCL titles (including 2009-10 Treble under Mourinho)\n- 🏆 **Juventus** — 2 UCL titles (1985, 1996)\n\n**Calciopoli Scandal (2006):** Juventus were stripped of 2 Serie A titles after phone-tapping scandal revealed match-fixing. They were relegated to Serie B — one of football's biggest falls from grace.\n\n**Modern stars:** Lautaro Martínez, Vlahović, Theo Hernández, Rafael Leão`
  }
  
  // Bundesliga / Germany
  if (msg.includes('bundesliga') || msg.includes('german football') || msg.includes('bayern munich') || msg.includes('borussia dortmund') || msg.includes('bvb')) {
    return `## 🇩🇪 Bundesliga — Germany's Top Flight\n\nFounded: **1963** | 18 clubs | Known for: **Fan culture, atmosphere, and Bayern's dominance**\n\n**Bundesliga Title Record:**\n1. 🔴 **Bayern Munich** — 32+ titles (11 consecutive: 2013–2023)\n2. 🟡⚫ **Borussia Dortmund** — 8 titles\n3. 🔴⚫ **Borussia Mönchengladbach** — 5 titles\n4. 🔴 **Werder Bremen** — 4 titles\n\n**Bayern Munich Facts:**\n- 🏆 **6 Champions League titles** — second only to Real Madrid\n- 💰 **Most valuable club in Germany** by a distance\n- 🌍 2013 final: Bayern 2-1 Dortmund — an all-German UCL final\n- Legendary players: Beckenbauer, Müller, Ribery, Robben, Lewandowski\n\n**Dortmund's Identity:** The "Yellow Wall" — 25,000 standing fans in the south stand — is the largest fan section in world football. Dortmund have produced: Lewandowski, Haaland, Bellingham, Sancho.\n\n**Safe standing:** Bundesliga maintained affordable terraces with standing sections while English clubs eliminated them.`
  }

  // Default response  
  const defaults = [
    `## ⚽ Welcome to FootballIQ Assistant!\n\nI'm an expert on everything football. Here are some things you can ask me:\n\n**Players & Careers:**\n- "Tell me about Messi's career"\n- "How many goals has Ronaldo scored?"\n- "Who is Erling Haaland?"\n\n**Leagues & Clubs:**\n- "Which club has won the most Premier League titles?"\n- "Tell me about La Liga history"\n- "Explain Bayern Munich's dominance"\n\n**History & Records:**\n- "Who has won the most World Cups?"\n- "What was the Miracle of Istanbul?"\n- "Fastest goal ever scored?"\n\n**Tactics & Analysis:**\n- "What is tiki-taka?"\n- "Explain gegenpressing"\n- "Best formation for attacking football?"\n\n**GOAT Debates:**\n- "Compare Messi and Ronaldo"\n- "Who is the best manager ever?"\n- "Greatest Champions League team ever?"`,
    
    `## 🏆 Football Trivia — Did You Know?\n\n⚡ **Fastest World Cup goal:** Hakan Şükür for Turkey vs South Korea in 2002 — just **11 seconds**!\n\n🔴 **Most red cards in a career:** Gerardo Bedoya (Colombia) received **46 red cards** in his career.\n\n👶 **Youngest World Cup scorer:** Pelé was just **17 years and 239 days** when he scored in the 1958 World Cup final.\n\n🏟️ **Largest stadium:** Rungrado 1st of May Stadium in North Korea holds **114,000 fans**.\n\n💰 **Most expensive transfer:** Neymar from Barcelona to PSG in 2017 for **€222 million**.\n\n⚽ **Longest unbeaten run:** Brazil went **35 games unbeaten** between 1993–1996.\n\nAsk me anything about football for a detailed answer!`,
    
    `## 🌟 Champions League — The Most Prestigious Club Trophy\n\n**Real Madrid** have won it **15 times** — nearly double their nearest rivals!\n\n**Top scorers in Champions League history:**\n1. 🇵🇹 Cristiano Ronaldo — 140 goals\n2. 🇦🇷 Lionel Messi — 129 goals\n3. 🇲🇾 Robert Lewandowski — 91 goals\n4. 🇸🇾 Karim Benzema — 90 goals\n5. 🇷🇺 Raúl — 71 goals\n\n**Most memorable finals:**\n- 2005: Liverpool 3-3 AC Milan (5-3 pens) — "Miracle of Istanbul"\n- 2012: Chelsea 1-1 Bayern Munich (4-3 pens) — Drogba's late header\n- 1999: Man United 2-1 Bayern Munich — 2 goals in injury time!\n\nAsk me about any match, club, or player for a deep dive!`
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

// API: Generate AI quiz for a specific player
app.post('/api/ai/player-quiz', async (c) => {
  const body = await c.req.json()
  const { playerName, difficulty = 'medium', count = 5 } = body

  if (!playerName) {
    return c.json({ error: 'Player name is required' }, 400)
  }

  try {
    const { privateKey, contractAddress } = getGenLayerConfig(c)
    if (!privateKey || privateKey.trim() === '') {
      return c.json({ error: 'VITE_GENLAYER_KEY is required for contract calls.' }, 500)
    }

    const normalizedDifficulty = ['easy', 'medium', 'hard'].includes(difficulty)
      ? difficulty
      : 'medium'
    const countNumber = Number.isFinite(Number(count)) ? Number(count) : 5

    const result = await runPlayerQuizContract({
      privateKey,
      contractAddress,
      playerName,
      difficulty: normalizedDifficulty,
      count: countNumber
    })

    const questions = result.questions.map((q, i) => ({
      id: q.id || `ai_${playerName.replace(/\s+/g, '_')}_${i}`,
      question: q.question,
      options: q.options,
      answer: q.answer,
      difficulty: normalizedDifficulty,
      category: 'players',
      explanation: q.explanation || ''
    }))

    return c.json({
      questions,
      player: playerName,
      txHash: result.txHash,
      txStatus: result.txStatus,
      payload: result.payload
    })
  } catch (error) {
    console.error('❌ Error:', error)
    return c.json({ error: 'Contract quiz generation failed.' }, 502)
  }
})

// API: Generate AI quiz for a specific category using the intelligent contract
app.post('/api/ai/category-quiz', async (c) => {
  const body = await c.req.json()
  const { category, difficulty = 'medium', count = 10 } = body

  if (!category) {
    return c.json({ error: 'Category is required' }, 400)
  }

  try {
    const { privateKey, contractAddress } = getGenLayerConfig(c)
    if (!privateKey || privateKey.trim() === '') {
      return c.json({ error: 'VITE_GENLAYER_KEY is required for contract calls.' }, 500)
    }

    const normalizedDifficulty = ['easy', 'medium', 'hard'].includes(difficulty)
      ? difficulty
      : 'medium'
    const countNumber = Number.isFinite(Number(count)) ? Number(count) : 10

    const result = await runCategoryQuizContract({
      privateKey,
      contractAddress,
      category,
      difficulty: normalizedDifficulty,
      count: countNumber
    })

    const questions = result.questions.map((q, i) => ({
      id: q.id || `cat_${category}_${i}`,
      question: q.question,
      options: q.options,
      answer: q.answer,
      difficulty: normalizedDifficulty,
      category,
      explanation: q.explanation || ''
    }))

    return c.json({
      questions,
      category,
      txHash: result.txHash,
      txStatus: result.txStatus,
      payload: result.payload
    })
  } catch (error) {
    console.error('❌ Error:', error)
    return c.json({ error: 'Contract category quiz generation failed.' }, 502)
  }
})

const playerDatabase: Record<string, {
  nationality: string;
  position: string;
  club?: string;
  birthYear?: string;
  goals?: string;
  ballon?: string;
  worldCups?: string;
  formerClubs?: string;
  height?: string;
}> = {
  'Lionel Messi': { nationality: 'Argentina', position: 'Forward', club: 'Inter Miami', birthYear: '1987', goals: '800+', ballon: '8', worldCups: '1', formerClubs: 'Barcelona, PSG' },
  'Cristiano Ronaldo': { nationality: 'Portugal', position: 'Forward', club: 'Al-Nassr', birthYear: '1985', goals: '900+', ballon: '5', worldCups: '0', formerClubs: 'Man United, Real Madrid, Juventus' },
  'Erling Haaland': { nationality: 'Norway', position: 'Striker', club: 'Manchester City', birthYear: '2000', goals: '200+', formerClubs: 'Borussia Dortmund, Salzburg' },
  'Kylian Mbappe': { nationality: 'France', position: 'Forward', club: 'Real Madrid', birthYear: '1998', worldCups: '1', formerClubs: 'PSG, Monaco' },
  'Neymar': { nationality: 'Brazil', position: 'Forward', birthYear: '1992', formerClubs: 'Santos, Barcelona, PSG' },
  'Kevin De Bruyne': { nationality: 'Belgium', position: 'Midfielder', club: 'Manchester City', birthYear: '1991', formerClubs: 'Wolfsburg, Chelsea' },
  'Mohamed Salah': { nationality: 'Egypt', position: 'Forward', club: 'Liverpool', birthYear: '1992', formerClubs: 'Chelsea, Roma, Fiorentina' },
  'Vinicius Junior': { nationality: 'Brazil', position: 'Forward', club: 'Real Madrid', birthYear: '2000' },
  'Jude Bellingham': { nationality: 'England', position: 'Midfielder', club: 'Real Madrid', birthYear: '2003', formerClubs: 'Birmingham, Borussia Dortmund' },
  'Rodri': { nationality: 'Spain', position: 'Midfielder', club: 'Manchester City', birthYear: '1996', ballon: '1' },
  'Harry Kane': { nationality: 'England', position: 'Striker', club: 'Bayern Munich', birthYear: '1993', formerClubs: 'Tottenham' },
  'Phil Foden': { nationality: 'England', position: 'Midfielder/Forward', club: 'Manchester City', birthYear: '2000' },
  'Luka Modric': { nationality: 'Croatia', position: 'Midfielder', club: 'Real Madrid', birthYear: '1985', ballon: '1', formerClubs: 'Tottenham, Dinamo Zagreb' },
  'Robert Lewandowski': { nationality: 'Poland', position: 'Striker', club: 'Barcelona', birthYear: '1988', goals: '600+', formerClubs: 'Bayern Munich, Borussia Dortmund' },
  'Virgil van Dijk': { nationality: 'Netherlands', position: 'Defender', club: 'Liverpool', birthYear: '1991', formerClubs: 'Southampton, Celtic' },
  'Pedri': { nationality: 'Spain', position: 'Midfielder', club: 'Barcelona', birthYear: '2002' },
  'Bukayo Saka': { nationality: 'England', position: 'Forward/Winger', club: 'Arsenal', birthYear: '2001' },
  'Trent Alexander-Arnold': { nationality: 'England', position: 'Right-back', club: 'Real Madrid', birthYear: '1998', formerClubs: 'Liverpool' },
  'Gavi': { nationality: 'Spain', position: 'Midfielder', club: 'Barcelona', birthYear: '2004' },
  'Marcus Rashford': { nationality: 'England', position: 'Forward', club: 'Manchester United', birthYear: '1997' },
}

function generateFallbackPlayerQuiz(playerName: string, difficulty: string) {
  const pData = playerDatabase[playerName]
  const questions: any[] = []
  const name = playerName.split(' ')[playerName.split(' ').length - 1]

  if (pData) {
    if (pData.nationality) {
      questions.push({
        id: `fb_nat_${Math.random()}`,
        question: `What is ${playerName}'s nationality?`,
        options: shuffle([pData.nationality, 'Germany', 'France', 'Brazil'].filter((v,i,a) => a.indexOf(v) === i).slice(0,4)),
        answer: pData.nationality,
        difficulty,
        category: 'players',
        explanation: `${playerName} was born in ${pData.nationality}.`
      })
    }
    if (pData.position) {
      questions.push({
        id: `fb_pos_${Math.random()}`,
        question: `What position does ${playerName} play?`,
        options: shuffle([pData.position, 'Goalkeeper', 'Midfielder', 'Defender'].filter((v,i,a) => a.indexOf(v) === i).slice(0,4)),
        answer: pData.position,
        difficulty,
        category: 'players'
      })
    }
    if (pData.club) {
      questions.push({
        id: `fb_club_${Math.random()}`,
        question: `Which club does ${playerName} currently play for?`,
        options: shuffle([pData.club, 'Bayern Munich', 'PSG', 'Juventus'].filter((v,i,a) => a.indexOf(v) === i).slice(0,4)),
        answer: pData.club,
        difficulty,
        category: 'players'
      })
    }
    if (pData.birthYear) {
      questions.push({
        id: `fb_year_${Math.random()}`,
        question: `In which year was ${playerName} born?`,
        options: shuffle([pData.birthYear, String(parseInt(pData.birthYear)+2), String(parseInt(pData.birthYear)-2), String(parseInt(pData.birthYear)+4)].slice(0,4)),
        answer: pData.birthYear,
        difficulty,
        category: 'players'
      })
    }
    if (pData.formerClubs) {
      const firstFormer = pData.formerClubs.split(', ')[0]
      questions.push({
        id: `fb_former_${Math.random()}`,
        question: `Which of these clubs did ${playerName} play for earlier in their career?`,
        options: shuffle([firstFormer, 'AC Milan', 'Chelsea', 'Arsenal'].filter((v,i,a) => a.indexOf(v) === i).slice(0,4)),
        answer: firstFormer,
        difficulty,
        category: 'players',
        explanation: `${playerName}'s former clubs include: ${pData.formerClubs}`
      })
    }
    if (pData.ballon) {
      questions.push({
        id: `fb_ballon_${Math.random()}`,
        question: `How many Ballon d'Or awards has ${playerName} won?`,
        options: shuffle([pData.ballon, '2', '0', '3'].filter((v,i,a) => a.indexOf(v) === i).slice(0,4)),
        answer: pData.ballon,
        difficulty,
        category: 'players'
      })
    }
  }

  // Fill with general questions if we don't have enough
  while (questions.length < 5) {
    const fallbacks = [
      {
        id: `fb_gen_${Math.random()}`,
        question: `In which continent does ${playerName} primarily play football?`,
        options: ['Europe', 'South America', 'North America', 'Asia'],
        answer: 'Europe',
        difficulty,
        category: 'players'
      },
      {
        id: `fb_gen2_${Math.random()}`,
        question: `What sport does ${playerName} play?`,
        options: ['Football (Soccer)', 'Basketball', 'Tennis', 'Cricket'],
        answer: 'Football (Soccer)',
        difficulty,
        category: 'players'
      }
    ]
    const fb = fallbacks[questions.length % fallbacks.length]
    if (!questions.find(q => q.question === fb.question)) questions.push(fb)
    else break
  }

  return questions.slice(0, 5)
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

// Main page - serve the SPA
app.get('*', (c) => {
  return c.html(getHTML())
})

function getHTML(): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FootballIQ - The Ultimate Football Quiz</title>
  <meta name="description" content="Test your football knowledge with the ultimate football quiz game. Leagues, players, managers, trophies and more!">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <!-- Marked.js for markdown rendering in AI chat -->
  <script src="https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: { 50:'#eff6ff', 100:'#dbeafe', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8', 900:'#1e3a8a' },
            accent: { 400:'#fbbf24', 500:'#f59e0b', 600:'#d97706' }
          },
          animation: {
            'fade-in': 'fadeIn 0.4s ease-out',
            'slide-up': 'slideUp 0.4s ease-out',
            'bounce-in': 'bounceIn 0.5s ease-out',
            'pulse-slow': 'pulse 3s infinite'
          },
          keyframes: {
            fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
            slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
            bounceIn: { '0%': { transform: 'scale(0.8)', opacity: '0' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)', opacity: '1' } }
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="/static/styles.css">
</head>
<body class="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <script src="/static/app.js"></script>
</body>
</html>`
}

export default app
