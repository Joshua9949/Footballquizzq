# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }

from genlayer import *
import json


class FootballIQBrain(gl.Contract):
    owner: Address
    model_name: str
    system_prompt: str
    max_questions: u32
    total_requests: u64
    last_chat_json: TreeMap[Address, str]
    last_quiz_json: TreeMap[Address, str]

    def __init__(self):
        self.owner = gl.message.sender_address
        self.model_name = "gpt-5-mini"
        self.system_prompt = (
            "You are FootballIQ, an expert football (soccer) assistant. "
            "Stay strictly on football topics and provide factual, concise, useful answers."
        )
        self.max_questions = u32(15)
        self.total_requests = u64(0)
        self.last_chat_json = TreeMap[Address, str]()
        self.last_quiz_json = TreeMap[Address, str]()

    @gl.public.view
    def get_config(self) -> str:
        cfg = {
            "owner": str(self.owner),
            "model_name": self.model_name,
            "max_questions": int(self.max_questions),
            "total_requests": int(self.total_requests),
        }
        return json.dumps(cfg, separators=(",", ":"), ensure_ascii=True)

    @gl.public.view
    def get_last_chat(self, user: str) -> str:
        target = Address(user)
        try:
            return self.last_chat_json[target]
        except Exception:
            return ""

    @gl.public.view
    def get_last_quiz(self, user: str) -> str:
        target = Address(user)
        try:
            return self.last_quiz_json[target]
        except Exception:
            return ""

    @gl.public.write
    def set_owner(self, new_owner: str):
        self._require_owner()
        self.owner = Address(new_owner)

    @gl.public.write
    def set_model_name(self, model_name: str):
        self._require_owner()
        model_name = model_name.strip()
        if model_name == "":
            raise gl.Rollback("empty_model_name")
        self.model_name = model_name

    @gl.public.write
    def set_system_prompt(self, new_prompt: str):
        self._require_owner()
        new_prompt = new_prompt.strip()
        if new_prompt == "":
            raise gl.Rollback("empty_system_prompt")
        self.system_prompt = new_prompt

    @gl.public.write
    def set_max_questions(self, max_questions: u32):
        self._require_owner()
        mq = int(max_questions)
        if mq < 1 or mq > 50:
            raise gl.Rollback("invalid_max_questions")
        self.max_questions = max_questions

    @gl.public.write
    def football_chat(self, message: str, history_json: str = "[]") -> str:
        clean_message = message.strip()
        if clean_message == "":
            raise gl.Rollback("empty_message")
        if len(clean_message) > 4000:
            raise gl.Rollback("message_too_long")

        history_text = self._normalize_history(history_json)

        m_name = self.model_name
        s_prompt = self.system_prompt

        prompt = (
            "Return ONLY pure JSON. No markdown. No code fences. No extra commentary.\n"
            "JSON schema:\n"
            "{\"reply\":\"string\",\"topic\":\"string\",\"confidence\":\"low|medium|high\"}\n"
            "Rules:\n"
            "- reply must be football-only and practical\n"
            "- if non-football input, politely redirect to football\n"
            "- reply should be under 250 words\n"
            "- confidence must be one of: low, medium, high\n"
            f"System context: {s_prompt}\n"
            f"Model hint: {m_name}\n"
            f"Conversation history JSON: {history_text}\n"
            f"User message: {clean_message}\n"
        )

        raw = gl.eq_principle.prompt_non_comparative(
            lambda: prompt,
            task="Generate football assistant chat response",
            criteria=(
                "Output must be valid JSON with keys reply/topic/confidence. "
                "Response must be football-related and safe."
            ),
        )

        data = self._parse_json_object(raw, "ai_invalid_chat_json")
        reply = str(data.get("reply", "")).strip()
        topic = str(data.get("topic", "general")).strip()
        confidence = str(data.get("confidence", "medium")).strip().lower()

        if reply == "":
            raise gl.Rollback("empty_chat_reply")
        if confidence not in ("low", "medium", "high"):
            raise gl.Rollback("invalid_chat_confidence")

        normalized = {
            "reply": reply,
            "topic": topic if topic != "" else "general",
            "confidence": confidence,
        }
        result = json.dumps(normalized, separators=(",", ":"), ensure_ascii=True)

        sender = gl.message.sender_address
        self.last_chat_json[sender] = result
        self._bump_requests()
        return result

    @gl.public.write
    def generate_player_quiz(self, player_name: str, difficulty: str, count: u32 = u32(5)) -> str:
        player = player_name.strip()
        if player == "":
            raise gl.Rollback("empty_player_name")
        diff = self._normalize_difficulty(difficulty)
        count_i = self._validate_count(count)
        result = self._generate_quiz("player", player, diff, count_i)

        sender = gl.message.sender_address
        self.last_quiz_json[sender] = result
        self._bump_requests()
        return result

    @gl.public.write
    def generate_category_quiz(self, category: str, difficulty: str, count: u32 = u32(10)) -> str:
        cat = category.strip().lower()
        if cat == "":
            raise gl.Rollback("empty_category")

        supported = (
            "premier_league", "la_liga", "serie_a", "bundesliga", "ligue_1",
            "primeira_liga", "eredivisie", "belgian_pro", "mls", "super_lig",
            "champions_league", "players", "managers", "trophies"
        )
        if cat not in supported:
            raise gl.Rollback("unsupported_category")

        diff = self._normalize_difficulty(difficulty)
        count_i = self._validate_count(count)
        result = self._generate_quiz("category", cat, diff, count_i)

        sender = gl.message.sender_address
        self.last_quiz_json[sender] = result
        self._bump_requests()
        return result

    def _generate_quiz(self, subject_kind: str, subject_value: str, difficulty: str, count_i: int) -> str:
        m_name = self.model_name
        s_prompt = self.system_prompt

        prompt = (
            "Return ONLY pure JSON. No markdown. No code fences. No explanations outside JSON.\n"
            "Required JSON schema:\n"
            "{"
            "\"subject_kind\":\"string\","
            "\"subject_value\":\"string\","
            "\"difficulty\":\"easy|medium|hard\","
            "\"questions\":["
            "{"
            "\"id\":\"q1\","
            "\"question\":\"string\","
            "\"options\":[\"string\",\"string\",\"string\",\"string\"],"
            "\"answer\":\"string\","
            "\"explanation\":\"string\""
            "}"
            "]"
            "}\n"
            "Rules:\n"
            f"- subject_kind must be exactly '{subject_kind}'\n"
            f"- subject_value must be exactly '{subject_value}'\n"
            f"- difficulty must be exactly '{difficulty}'\n"
            f"- create exactly {count_i} questions\n"
            "- each question must have exactly 4 distinct options\n"
            "- answer must be exactly one of the options\n"
            "- all content must be factual football knowledge\n"
            f"System context: {s_prompt}\n"
            f"Model hint: {m_name}\n"
        )

        raw = gl.eq_principle.prompt_non_comparative(
            lambda: prompt,
            task="Generate football quiz JSON",
            criteria=(
                "Must produce valid JSON matching schema with exact question count, "
                "football-only facts, and valid answer-option consistency."
            ),
        )

        payload = self._parse_json_object(raw, "ai_invalid_quiz_json")
        return self._normalize_quiz_payload(payload, subject_kind, subject_value, difficulty, count_i)

    def _normalize_quiz_payload(self, payload: dict, subject_kind: str, subject_value: str, difficulty: str, count_i: int) -> str:
        ai_subject_kind = str(payload.get("subject_kind", "")).strip()
        ai_subject_value = str(payload.get("subject_value", "")).strip()
        ai_difficulty = str(payload.get("difficulty", "")).strip().lower()

        if ai_subject_kind != subject_kind:
            raise gl.Rollback("subject_kind_mismatch")
        if ai_subject_value != subject_value:
            raise gl.Rollback("subject_value_mismatch")
        if ai_difficulty != difficulty:
            raise gl.Rollback("difficulty_mismatch")

        questions = payload.get("questions")
        if not isinstance(questions, list):
            raise gl.Rollback("invalid_questions_type")
        if len(questions) != count_i:
            raise gl.Rollback("invalid_questions_count")

        cleaned = []
        for idx, q in enumerate(questions):
            if not isinstance(q, dict):
                raise gl.Rollback("invalid_question_object")
            qid = str(q.get("id", f"q{idx + 1}")).strip()
            question = str(q.get("question", "")).strip()
            answer = str(q.get("answer", "")).strip()
            explanation = str(q.get("explanation", "")).strip()
            options = q.get("options")

            if qid == "":
                raise gl.Rollback("empty_question_id")
            if question == "":
                raise gl.Rollback("empty_question_text")
            if not isinstance(options, list):
                raise gl.Rollback("invalid_options_type")
            if len(options) != 4:
                raise gl.Rollback("invalid_options_count")

            opts = [str(o).strip() for o in options]
            if any(o == "" for o in opts):
                raise gl.Rollback("empty_option")
            if len(set(opts)) != 4:
                raise gl.Rollback("duplicate_options")
            if answer == "" or answer not in opts:
                raise gl.Rollback("invalid_answer")

            cleaned.append({
                "id": qid,
                "question": question,
                "options": opts,
                "answer": answer,
                "explanation": explanation,
            })

        normalized = {
            "subject_kind": subject_kind,
            "subject_value": subject_value,
            "difficulty": difficulty,
            "questions": cleaned,
        }
        return json.dumps(normalized, separators=(",", ":"), ensure_ascii=True)

    def _parse_json_object(self, raw: str, rollback_code: str) -> dict:
        try:
            clean_raw = raw.replace("```json", "").replace("```", "").strip()
            obj = json.loads(clean_raw)
        except Exception:
            raise gl.Rollback(rollback_code)
        if not isinstance(obj, dict):
            raise gl.Rollback(rollback_code)
        return obj

    def _normalize_history(self, history_json: str) -> str:
        try:
            history = json.loads(history_json)
        except Exception:
            raise gl.Rollback("invalid_history_json")
        if not isinstance(history, list):
            raise gl.Rollback("history_not_list")

        compact = []
        for item in history[-10:]:
            if not isinstance(item, dict):
                continue
            role = str(item.get("role", "user")).strip().lower()
            if role not in ("user", "assistant", "system"):
                role = "user"
            content = str(item.get("content", "")).strip()
            if content == "":
                continue
            compact.append({"role": role, "content": content[:600]})
        return json.dumps(compact, separators=(",", ":"), ensure_ascii=True)

    def _normalize_difficulty(self, difficulty: str) -> str:
        d = difficulty.strip().lower()
        if d not in ("easy", "medium", "hard"):
            raise gl.Rollback("invalid_difficulty")
        return d

    def _validate_count(self, count: u32) -> int:
        count_i = int(count)
        max_q = int(self.max_questions)
        if count_i < 1:
            raise gl.Rollback("count_too_small")
        if count_i > max_q:
            raise gl.Rollback("count_too_large")
        return count_i

    def _bump_requests(self):
        self.total_requests = u64(self.total_requests + u64(1))

    def _require_owner(self):
        sender = gl.message.sender_address
        if sender != self.owner:
            raise gl.Rollback("forbidden")
