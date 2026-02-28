// FootballIQ - Main Application
// ===============================

// ---- MARKDOWN RENDERER ----
function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    try {
      // Configure marked for safe rendering
      marked.setOptions({ breaks: true, gfm: true });
      return marked.parse(text);
    } catch(e) {}
  }
  // Fallback: convert basic markdown
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold mt-3 mb-1">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-bold mt-2 mb-1">$1</h3>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderDynamicJson(value) {
  if (value === null) return '<span class="text-gray-500">null</span>';
  if (Array.isArray(value)) {
    return `
      <ul class="space-y-2">
        ${value.map((item, index) => `
          <li class="rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-2">
            <div class="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Item ${index + 1}</div>
            ${renderDynamicJson(item)}
          </li>
        `).join('')}
      </ul>
    `;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    return `
      <div class="space-y-2">
        ${entries.map(([key, val]) => `
          <div class="rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-2">
            <div class="text-[11px] uppercase tracking-wide text-blue-500 mb-1">${escapeHtml(key)}</div>
            <div>${renderDynamicJson(val)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  return `<span class="break-words">${escapeHtml(value)}</span>`;
}

function renderAssistantPayload(content) {
  try {
    const parsed = JSON.parse(content);
    return `<div class="ai-json-content text-sm">${renderDynamicJson(parsed)}</div>`;
  } catch {
    return `
      <div class="rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 p-3 text-red-700 dark:text-red-300 text-xs">
        ⚠️ Malformed JSON response from intelligent contract.
      </div>
    `;
  }
}

function renderChatLoadingBubble() {
  const progress = Math.max(1, Math.min(99, AppState.chat.txProgress || 5));
  const statusText = escapeHtml(AppState.chat.txStatus || '⚠️ Transaction Pending...');
  return `
    <div class="chat-message flex justify-start gap-2">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">🤖</div>
      <div class="px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-700 shadow-sm min-w-[210px]">
        <div class="typing-indicator flex gap-1 items-center h-5 mb-2">
          <span></span><span></span><span></span>
        </div>
        <div class="text-[11px] text-gray-500 dark:text-gray-400 mb-1" id="chat-tx-status">${statusText}</div>
        <div class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div id="chat-tx-progress-fill" class="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style="width:${progress}%"></div>
        </div>
      </div>
    </div>
  `;
}

// ---- THEME MANAGEMENT ----
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('fiq_theme') || 'system';
    this.apply(saved);
  },
  apply(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    localStorage.setItem('fiq_theme', theme);
    AppState.theme = theme;
  },
  get() {
    return localStorage.getItem('fiq_theme') || 'system';
  }
};

// ---- APP STATE ----
const AppState = {
  currentPage: 'landing',
  theme: 'system',
  quiz: {
    questions: [],
    current: 0,
    score: 0,
    answers: [],
    category: '',
    difficulty: 'medium',
    playerName: '',
    timeLeft: 30,
    timer: null,
    started: false,
    finished: false
  },
  leagues: [],
  players: [],
  chat: {
    history: [],
    loading: false,
    txProgress: 0,
    txStatus: ''
  }
};

// ---- ROUTER ----
function navigate(page, params = {}) {
  Object.assign(AppState, params);
  AppState.currentPage = page;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- RENDER ENGINE ----
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  let html = '';
  switch (AppState.currentPage) {
    case 'landing': html = renderLanding(); break;
    case 'home': html = renderHome(); break;
    case 'leagues': html = renderLeaguesPage(); break;
    case 'quiz-setup': html = renderQuizSetup(); break;
    case 'quiz': html = renderQuiz(); break;
    case 'quiz-result': html = renderQuizResult(); break;
    case 'players': html = renderPlayersPage(); break;
    case 'ai': html = renderAIPage(); break;
    case 'about': html = renderAbout(); break;
    default: html = renderLanding();
  }

  app.innerHTML = html;
  attachEventListeners();
}

// ---- NAV HTML ----
function renderNav(activePage) {
  const theme = ThemeManager.get();
  const themeIcon = theme === 'dark' ? 'fa-sun' : theme === 'light' ? 'fa-moon' : 'fa-circle-half-stroke';
  const themeLabel = theme === 'dark' ? 'Light' : theme === 'light' ? 'System' : 'Dark';

  const navItems = [
    { page: 'home', icon: 'fa-house', label: 'Home' },
    { page: 'leagues', icon: 'fa-trophy', label: 'Leagues' },
    { page: 'players', icon: 'fa-user-group', label: 'Players' },
    { page: 'ai', icon: 'fa-robot', label: 'AI Chat' },
  ];

  const navLinks = navItems.map(item => `
    <button onclick="navigate('${item.page}')"
      class="nav-link flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
             ${activePage === item.page
               ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
               : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'}">
      <i class="fas ${item.icon} text-xs"></i>
      <span class="hidden sm:inline">${item.label}</span>
    </button>
  `).join('');

  return `
  <nav class="sticky top-0 z-50 glass bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button onclick="navigate('landing')" class="flex items-center gap-2 group">
          <span class="text-2xl">⚽</span>
          <span class="font-bold text-lg hidden sm:block">
            <span class="text-blue-500">Football</span><span class="text-purple-500">IQ</span>
          </span>
        </button>

        <div class="flex items-center gap-1 sm:gap-2">
          ${navLinks}
          <button onclick="cycleTheme()" title="Toggle theme"
            class="theme-toggle ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            <i class="fas ${themeIcon} text-gray-600 dark:text-gray-300"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>`;
}

function cycleTheme() {
  const current = ThemeManager.get();
  const next = current === 'system' ? 'dark' : current === 'dark' ? 'light' : 'system';
  ThemeManager.apply(next);
  render();
}

// ---- LANDING PAGE ----
function renderLanding() {
  return `
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 field-pattern opacity-40"></div>
    <div class="absolute top-20 left-10 text-6xl opacity-10 float-anim">⚽</div>
    <div class="absolute top-40 right-20 text-4xl opacity-10 float-anim" style="animation-delay:2s">🏆</div>
    <div class="absolute bottom-40 left-20 text-5xl opacity-10 float-anim" style="animation-delay:4s">🥅</div>
    <div class="absolute bottom-20 right-10 text-4xl opacity-10 float-anim" style="animation-delay:1s">🎽</div>

    <!-- Nav -->
    <nav class="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <span class="text-3xl">⚽</span>
        <span class="font-bold text-xl text-white"><span class="text-blue-400">Football</span><span class="text-purple-400">IQ</span></span>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="cycleTheme()" class="theme-toggle p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white">
          <i class="fas fa-circle-half-stroke"></i>
        </button>
        <button onclick="navigate('home')" class="px-5 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-semibold text-sm transition-all hover:scale-105">
          Play Now
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-24">
      <div class="mb-6 bounce-in">
        <span class="text-8xl md:text-9xl hero-ball inline-block">⚽</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 slide-up">
        Football<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">IQ</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 mb-4 slide-up" style="animation-delay:0.1s">
        The Ultimate Football Quiz Experience
      </p>
      <p class="text-gray-400 max-w-lg mb-10 slide-up" style="animation-delay:0.2s">
        Test your football knowledge across 11 major leagues, the Champions League, iconic players, legendary managers and historic trophies.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 mb-16 slide-up" style="animation-delay:0.3s">
        <button onclick="navigate('home')"
          class="btn-primary px-8 py-4 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:scale-105 transition-all">
          <i class="fas fa-play"></i> Start Quiz
        </button>
        <button onclick="navigate('ai')"
          class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-lg flex items-center gap-2 transition-all hover:scale-105">
          <i class="fas fa-robot"></i> AI Chat
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full slide-up" style="animation-delay:0.4s">
        ${[
          { num: '11', label: 'Leagues', icon: '🏟️' },
          { num: '300+', label: 'Questions', icon: '❓' },
          { num: '3', label: 'Difficulty Levels', icon: '🎯' },
          { num: 'AI', label: 'Football Assistant', icon: '🤖' }
        ].map(s => `
          <div class="bg-white/10 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
            <div class="text-2xl mb-1">${s.icon}</div>
            <div class="text-2xl font-black text-white">${s.num}</div>
            <div class="text-gray-400 text-sm">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Feature Cards -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 pb-20">
      <h2 class="text-3xl font-bold text-white text-center mb-10">What's Inside?</h2>
      <div class="grid md:grid-cols-3 gap-6">
        ${[
          { icon: '🏆', title: 'League Quizzes', desc: 'Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and 6 more elite leagues plus Champions League.', color: 'from-blue-600/30 to-blue-800/30', btn: 'leagues' },
          { icon: '⭐', title: 'Player Quizzes', desc: 'Quiz about your favourite players. Search any player and get AI-generated questions tailored to them.', color: 'from-purple-600/30 to-purple-800/30', btn: 'players' },
          { icon: '🤖', title: 'AI Football Chat', desc: 'Ask our AI about any player, team, manager, tactic or football fact. Powered by advanced AI.', color: 'from-emerald-600/30 to-emerald-800/30', btn: 'ai' },
        ].map(f => `
          <div class="bg-gradient-to-br ${f.color} backdrop-blur border border-white/10 rounded-2xl p-6 text-center card-hover cursor-pointer"
               onclick="navigate('${f.btn}')">
            <div class="text-5xl mb-4">${f.icon}</div>
            <h3 class="text-xl font-bold text-white mb-2">${f.title}</h3>
            <p class="text-gray-400 text-sm mb-4">${f.desc}</p>
            <span class="text-blue-400 text-sm font-medium">Explore →</span>
          </div>
        `).join('')}
      </div>

      <!-- Leagues preview -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-white mb-6">Leagues Covered</h2>
        <div class="flex flex-wrap justify-center gap-3">
          ${[
            {flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', name:'Premier League'},
            {flag:'🇪🇸', name:'La Liga'},
            {flag:'🇮🇹', name:'Serie A'},
            {flag:'🇩🇪', name:'Bundesliga'},
            {flag:'🇫🇷', name:'Ligue 1'},
            {flag:'🇵🇹', name:'Primeira Liga'},
            {flag:'🇳🇱', name:'Eredivisie'},
            {flag:'🇧🇪', name:'Belgian Pro League'},
            {flag:'🇺🇸', name:'MLS'},
            {flag:'🇹🇷', name:'Süper Lig'},
            {flag:'🌍', name:'Champions League'},
          ].map(l => `
            <div class="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm border border-white/10">
              <span>${l.flag}</span><span>${l.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-white/10 py-8 text-center text-gray-500 text-sm">
      <p>⚽ FootballIQ &copy; 2025 &mdash; The Ultimate Football Quiz</p>
    </footer>
  </div>`;
}

// ---- HOME PAGE ----
function renderHome() {
  return `
  ${renderNav('home')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 page-enter">

    <!-- Hero Banner -->
    <div class="relative rounded-3xl overflow-hidden mb-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8 md:p-12">
      <div class="absolute inset-0 field-pattern opacity-20"></div>
      <div class="absolute right-6 top-6 text-7xl opacity-20 float-anim">⚽</div>
      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl font-black text-white mb-3">
          Test Your <span class="text-yellow-300">Football IQ</span>
        </h1>
        <p class="text-blue-100 text-lg max-w-xl mb-6">
          Choose a league, pick a difficulty, and prove you know the beautiful game inside out.
        </p>
        <div class="flex flex-wrap gap-3">
          <button onclick="navigate('leagues')" class="px-6 py-3 bg-white text-blue-700 rounded-full font-bold hover:bg-yellow-300 transition-all hover:scale-105 flex items-center gap-2">
            <i class="fas fa-trophy"></i> Pick a League
          </button>
          <button onclick="navigate('players')" class="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-full font-bold hover:bg-white/30 transition-all flex items-center gap-2">
            <i class="fas fa-user-group"></i> Player Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Play Section -->
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5">Quick Play</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      ${[
        { id: 'champions_league', name: 'Champions League', flag: '🏆', color: 'from-blue-900 to-yellow-700', desc: 'Europe\'s elite competition' },
        { id: 'premier_league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'from-purple-700 to-purple-900', desc: 'The world\'s most watched league' },
        { id: 'players', name: 'Player Knowledge', flag: '⭐', color: 'from-amber-600 to-orange-700', desc: 'Test your player expertise' },
        { id: 'la_liga', name: 'La Liga', flag: '🇪🇸', color: 'from-red-600 to-yellow-600', desc: 'Spain\'s top football division' },
        { id: 'managers', name: 'Managers & Tactics', flag: '🎩', color: 'from-slate-700 to-slate-900', desc: 'Who are the great bosses?' },
        { id: 'trophies', name: 'Trophies & Records', flag: '🏅', color: 'from-yellow-600 to-amber-800', desc: 'Historic achievements' },
      ].map(q => `
        <div onclick="navigate('quiz-setup', { quizCategory: '${q.id}', quizName: '${q.name}' })"
          class="card-hover cursor-pointer rounded-2xl bg-gradient-to-br ${q.color} p-5 text-white relative overflow-hidden group">
          <div class="absolute right-4 top-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">${q.flag}</div>
          <div class="text-3xl mb-2">${q.flag}</div>
          <h3 class="font-bold text-lg">${q.name}</h3>
          <p class="text-white/70 text-sm">${q.desc}</p>
          <div class="mt-3 flex items-center gap-1 text-white/80 text-sm">
            <i class="fas fa-play-circle text-xs"></i> Play Now
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Difficulty Explainer -->
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5">Choose Your Challenge</h2>
    <div class="grid sm:grid-cols-3 gap-4 mb-10">
      ${[
        { level: 'easy', icon: '🌱', title: 'Easy', color: 'border-green-400', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', desc: 'Basic facts, club colours, founding years. Perfect for beginners.' },
        { level: 'medium', icon: '🔥', title: 'Medium', color: 'border-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', desc: 'Stats, transfers, season records. A good test for fans.' },
        { level: 'hard', icon: '💀', title: 'Hard', color: 'border-red-400', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', desc: 'Deep records, obscure facts, historical data. True experts only.' },
      ].map(d => `
        <div class="rounded-2xl border-2 ${d.color} ${d.bg} p-5 text-center card-hover cursor-pointer"
             onclick="navigate('quiz-setup', { quizCategory: 'champions_league', quizName: 'Champions League', selectedDifficulty: '${d.level}' })">
          <div class="text-4xl mb-3">${d.icon}</div>
          <h3 class="font-bold text-lg ${d.text}">${d.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">${d.desc}</p>
        </div>
      `).join('')}
    </div>

    <!-- AI Chat Promo -->
    <div class="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🤖</div>
        <div>
          <h3 class="font-bold text-white text-lg">Football AI Assistant</h3>
          <p class="text-emerald-100 text-sm">Ask anything about football — players, teams, tactics, history</p>
        </div>
      </div>
      <button onclick="navigate('ai')" class="px-6 py-3 bg-white text-emerald-700 rounded-full font-bold hover:bg-yellow-300 transition-all whitespace-nowrap flex-shrink-0">
        <i class="fas fa-robot mr-2"></i>Ask AI
      </button>
    </div>
  </div>
  ${renderFooter()}`;
}

// ---- LEAGUES PAGE ----
function renderLeaguesPage() {
  const leagueCards = [
    { id: 'premier_league', name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', bg: 'league-card-pl', clubs: 'Arsenal, Chelsea, Man City, Liverpool...' },
    { id: 'la_liga', name: 'La Liga', country: 'Spain', flag: '🇪🇸', bg: 'league-card-ll', clubs: 'Real Madrid, Barcelona, Atletico...' },
    { id: 'serie_a', name: 'Serie A', country: 'Italy', flag: '🇮🇹', bg: 'league-card-sa', clubs: 'Juventus, Inter, AC Milan, Roma...' },
    { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', bg: 'league-card-bl', clubs: 'Bayern Munich, Dortmund, RB Leipzig...' },
    { id: 'ligue_1', name: 'Ligue 1', country: 'France', flag: '🇫🇷', bg: 'league-card-l1', clubs: 'PSG, Monaco, Lyon, Marseille...' },
    { id: 'primeira_liga', name: 'Primeira Liga', country: 'Portugal', flag: '🇵🇹', bg: 'league-card-pl2', clubs: 'Benfica, Porto, Sporting CP...' },
    { id: 'eredivisie', name: 'Eredivisie', country: 'Netherlands', flag: '🇳🇱', bg: 'league-card-er', clubs: 'Ajax, PSV, Feyenoord, AZ...' },
    { id: 'belgian_pro', name: 'Belgian Pro League', country: 'Belgium', flag: '🇧🇪', bg: 'league-card-bp', clubs: 'Anderlecht, Club Brugge, Gent...' },
    { id: 'mls', name: 'Major League Soccer', country: 'USA 🇺🇸 / Canada', flag: '🇺🇸', bg: 'league-card-mls', clubs: 'Inter Miami, LA Galaxy, NYCFC...' },
    { id: 'super_lig', name: 'Süper Lig', country: 'Turkey', flag: '🇹🇷', bg: 'league-card-sl', clubs: 'Galatasaray, Fenerbahce, Besiktas...' },
    { id: 'champions_league', name: 'UEFA Champions League', country: 'Europe', flag: '🌍', bg: 'league-card-cl', clubs: 'Best clubs across Europe compete' },
    { id: 'managers', name: 'Managers & Bosses', country: 'Worldwide', flag: '🎩', bg: 'from-slate-600 to-slate-800', clubs: 'Ferguson, Guardiola, Mourinho...' },
    { id: 'trophies', name: 'Trophies & Records', country: 'Worldwide', flag: '🏅', bg: 'from-yellow-600 to-amber-800', clubs: 'World Cups, domestic trophies, records' },
  ];

  return `
  ${renderNav('leagues')}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 page-enter">
    <div class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
        🏆 Choose Your League
      </h1>
      <p class="text-gray-500 dark:text-gray-400">Select a competition and test your knowledge</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${leagueCards.map((l, i) => `
        <div onclick="navigate('quiz-setup', { quizCategory: '${l.id}', quizName: '${l.name}' })"
          class="card-hover cursor-pointer rounded-2xl ${l.bg.includes('from-') ? 'bg-gradient-to-br ' + l.bg : l.bg} p-6 text-white relative overflow-hidden group slide-up"
          style="animation-delay: ${i * 0.05}s">
          <div class="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">${l.flag}</div>
          <div class="flex items-start justify-between mb-3">
            <span class="text-4xl">${l.flag}</span>
            <span class="text-xs bg-white/20 px-2 py-1 rounded-full">${l.country}</span>
          </div>
          <h3 class="font-bold text-lg mb-1">${l.name}</h3>
          <p class="text-white/70 text-sm mb-4 line-clamp-1">${l.clubs}</p>
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              ${['easy','medium','hard'].map(d => `
                <span class="text-xs px-2 py-0.5 rounded-full bg-white/20">${d}</span>
              `).join('')}
            </div>
            <i class="fas fa-arrow-right text-white/60 group-hover:text-white transition-colors"></i>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  ${renderFooter()}`;
}

// ---- QUIZ SETUP PAGE ----
function renderQuizSetup() {
  const category = AppState.quizCategory || 'champions_league';
  const name = AppState.quizName || 'Champions League';
  const presetDiff = AppState.selectedDifficulty || null;

  return `
  ${renderNav('leagues')}
  <div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 page-enter">
    <button onclick="navigate('leagues')" class="flex items-center gap-2 text-gray-500 hover:text-blue-500 mb-6 transition-colors">
      <i class="fas fa-arrow-left"></i> Back to Leagues
    </button>

    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      <!-- Header -->
      <div class="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-center text-white relative overflow-hidden">
        <div class="absolute inset-0 field-pattern opacity-20"></div>
        <div class="text-5xl mb-3 relative z-10 float-anim">⚽</div>
        <h2 class="text-2xl font-black relative z-10">${name}</h2>
        <p class="text-blue-200 text-sm relative z-10">Choose your difficulty to begin</p>
      </div>

      <div class="p-8">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Select Difficulty</h3>
        <div class="grid grid-cols-3 gap-3 mb-8" id="diff-selector">
          ${[
            { level: 'easy', icon: '🌱', label: 'Easy', color: 'border-green-400 text-green-600', bg: 'bg-green-50 dark:bg-green-900/30', desc: 'For beginners' },
            { level: 'medium', icon: '🔥', label: 'Medium', color: 'border-amber-400 text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/30', desc: 'For fans' },
            { level: 'hard', icon: '💀', label: 'Hard', color: 'border-red-400 text-red-600', bg: 'bg-red-50 dark:bg-red-900/30', desc: 'Experts only' },
          ].map(d => `
            <div onclick="selectDifficulty('${d.level}')" id="diff-${d.level}"
              class="cursor-pointer rounded-2xl border-2 ${presetDiff === d.level ? d.color + ' ' + d.bg + ' ring-2 ring-offset-2' : 'border-gray-200 dark:border-gray-700'} p-4 text-center transition-all hover:${d.bg}">
              <div class="text-3xl mb-2">${d.icon}</div>
              <div class="font-bold text-sm ${presetDiff === d.level ? d.color : 'text-gray-700 dark:text-gray-300'}">${d.label}</div>
              <div class="text-xs text-gray-500 mt-1">${d.desc}</div>
            </div>
          `).join('')}
        </div>

        <div id="question-count-section" class="mb-6">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">Number of Questions</h3>
          <div class="flex gap-3">
            ${[5,10,15].map(n => `
              <button onclick="selectCount(${n})" id="count-${n}"
                class="flex-1 py-3 rounded-xl border-2 ${n === 10 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'} hover:border-blue-400 transition-all text-sm font-medium">
                ${n}
              </button>
            `).join('')}
          </div>
        </div>

        <button id="start-quiz-btn" onclick="startQuiz()"
          class="w-full py-4 btn-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 ${presetDiff ? '' : 'opacity-50 cursor-not-allowed'}"
          ${presetDiff ? '' : 'disabled'}>
          <i class="fas fa-play"></i> Start Quiz
        </button>
      </div>
    </div>
  </div>
  ${renderFooter()}`;
}

let selectedDiff = null;
let selectedCount = 10;

function selectDifficulty(level) {
  selectedDiff = level;
  AppState.selectedDifficulty = level;
  const levels = ['easy', 'medium', 'hard'];
  const colors = {
    easy: 'border-green-400 text-green-600 bg-green-50 dark:bg-green-900/30',
    medium: 'border-amber-400 text-amber-600 bg-amber-50 dark:bg-amber-900/30',
    hard: 'border-red-400 text-red-600 bg-red-50 dark:bg-red-900/30'
  };
  levels.forEach(l => {
    const el = document.getElementById(`diff-${l}`);
    if (!el) return;
    if (l === level) {
      el.className = el.className.replace(/border-\w+-[0-9]+/, '').trim();
      el.className += ` border-2 ${colors[level]} ring-2 ring-offset-2`;
    } else {
      el.className = el.className.replace(/border-\w+-[0-9]+ \S*text-\S+ \S*bg-\S+/g, '');
      el.className = `cursor-pointer rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-800`;
    }
  });

  // Enable start button
  const btn = document.getElementById('start-quiz-btn');
  if (btn) {
    btn.disabled = false;
    btn.className = btn.className.replace('opacity-50 cursor-not-allowed', '');
  }
}

function selectCount(n) {
  selectedCount = n;
  [5,10,15].forEach(c => {
    const el = document.getElementById(`count-${c}`);
    if (!el) return;
    if (c === n) {
      el.className = `flex-1 py-3 rounded-xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold hover:border-blue-400 transition-all text-sm font-medium`;
    } else {
      el.className = `flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 transition-all text-sm font-medium`;
    }
  });
}

async function startQuiz() {
  const diff = selectedDiff || AppState.selectedDifficulty;
  if (!diff) { alert('Please select a difficulty!'); return; }

  const cat = AppState.quizCategory || 'champions_league';
  const count = selectedCount || 10;

  try {
    const res = await axios.get(`/api/quiz/${cat}/${diff}?count=${count}`);
    const { questions } = res.data;

    if (!questions || questions.length === 0) {
      alert('No questions available for this selection. Try another league or difficulty.');
      return;
    }

    AppState.quiz = {
      questions,
      current: 0,
      score: 0,
      answers: [],
      category: cat,
      difficulty: diff,
      playerName: AppState.playerName || '',
      timeLeft: diff === 'easy' ? 45 : diff === 'medium' ? 30 : 20,
      maxTime: diff === 'easy' ? 45 : diff === 'medium' ? 30 : 20,
      timer: null,
      started: true,
      finished: false,
      name: AppState.quizName || cat
    };

    navigate('quiz');
  } catch (e) {
    console.error(e);
    alert('Failed to load questions. Please try again.');
  }
}

// ---- QUIZ PAGE ----
function renderQuiz() {
  const q = AppState.quiz;
  if (!q.started || q.questions.length === 0) {
    navigate('home');
    return '';
  }

  const question = q.questions[q.current];
  const timePercent = (q.timeLeft / q.maxTime) * 100;
  const timerColor = q.timeLeft <= 5 ? 'text-red-500' : q.timeLeft <= 10 ? 'text-amber-500' : 'text-green-500';
  const timerBg   = q.timeLeft <= 5 ? 'bg-red-500'   : q.timeLeft <= 10 ? 'bg-amber-500'   : 'bg-green-500';
  const diffBadge = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };
  const diffEmoji = { easy: '🌱', medium: '🔥', hard: '💀' };

  // Work out answered state for current question
  const currentAnswer = q.answers[q.current];
  const isAnswered = currentAnswer !== undefined;

  const canGoBack    = q.current > 0;
  const canGoForward = q.current < q.questions.length - 1;

  return `
  ${renderNav('leagues')}
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 page-enter">

    <!-- Quiz Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-gray-800 dark:text-gray-200">Q${q.current + 1}<span class="text-gray-400 font-normal">/${q.questions.length}</span></span>
        <span class="px-3 py-1 rounded-full text-white text-xs font-bold ${diffBadge[q.difficulty]}">
          ${diffEmoji[q.difficulty]} ${q.difficulty.toUpperCase()}
        </span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1 text-amber-500">
          <i class="fas fa-star text-sm"></i>
          <span id="score-display" class="font-bold stat-number">${q.score}</span>
        </div>
        <div id="timer-display" class="flex items-center gap-1 font-bold text-lg ${timerColor} ${q.timeLeft <= 5 ? 'timer-urgent' : ''}">
          <i class="fas fa-clock text-sm"></i>
          <span>${q.timeLeft}s</span>
        </div>
      </div>
    </div>

    <!-- Timer Bar -->
    <div class="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
      <div class="h-full ${timerBg} rounded-full progress-bar transition-all duration-1000" id="timer-bar" style="width:${timePercent}%"></div>
    </div>

    <!-- Question Progress Dots (clickable!) -->
    <div class="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-thin">
      ${q.questions.map((_, i) => {
        const ans = q.answers[i];
        let dotClass = 'bg-gray-200 dark:bg-gray-700 cursor-pointer hover:scale-125';
        let title = `Go to Q${i+1}`;
        if (i === q.current) {
          dotClass = 'bg-blue-500 scale-125 ring-2 ring-blue-300 cursor-default';
        } else if (ans !== undefined) {
          dotClass = (ans === q.questions[i].answer ? 'bg-green-500' : 'bg-red-500') + ' cursor-pointer hover:scale-110';
          title = ans === q.questions[i].answer ? `Q${i+1} ✓ Correct` : `Q${i+1} ✗ Wrong`;
        }
        return `<div onclick="jumpToQuestion(${i})" title="${title}"
                  class="flex-shrink-0 w-3 h-3 rounded-full transition-all ${dotClass}"></div>`;
      }).join('')}
    </div>

    <!-- Question Card -->
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-4 slide-up">
      <div class="flex items-start gap-3 mb-6">
        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span class="text-blue-600 dark:text-blue-400 font-bold text-sm">${q.current + 1}</span>
        </div>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">${question.question}</p>
      </div>

      <!-- Options -->
      <div class="grid gap-3" id="options-container">
        ${question.options.map((opt, i) => {
          const letters = ['A', 'B', 'C', 'D'];
          let btnClass = 'quiz-option w-full text-left p-4 rounded-2xl border-2 flex items-center gap-3 transition-all';
          let letterClass = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0';
          let disabled = '';

          if (isAnswered) {
            // Show result state
            disabled = 'disabled';
            if (opt === question.answer) {
              btnClass += ' border-green-500 bg-green-50 dark:bg-green-900/40 text-gray-800 dark:text-gray-100';
              letterClass += ' bg-green-500 text-white';
            } else if (opt === currentAnswer) {
              btnClass += ' border-red-500 bg-red-50 dark:bg-red-900/40 text-gray-800 dark:text-gray-100';
              letterClass += ' bg-red-500 text-white';
            } else {
              btnClass += ' border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-500 opacity-60';
              letterClass += ' bg-gray-200 dark:bg-gray-700 text-gray-400';
            }
          } else {
            btnClass += ' border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-800 dark:text-gray-200 cursor-pointer';
            letterClass += ' bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
          }

          return `
            <button onclick="${isAnswered ? '' : `selectAnswer('${opt.replace(/'/g, "\\'")}')`}" id="opt-${i}"
              class="${btnClass}" ${disabled}>
              <span class="${letterClass}">${isAnswered && opt === question.answer ? '✓' : isAnswered && opt === currentAnswer ? '✗' : letters[i]}</span>
              <span class="font-medium">${opt}</span>
              ${isAnswered && opt === question.answer ? '<span class="ml-auto text-green-500 text-sm font-bold">✓ Correct</span>' : ''}
            </button>`;
        }).join('')}
      </div>

      <!-- Explanation (shown after answering) -->
      ${isAnswered && question.explanation ? `
        <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-300 text-sm flex items-start gap-2">
          <i class="fas fa-lightbulb mt-0.5 flex-shrink-0"></i>
          <span>${question.explanation}</span>
        </div>` : ''}
    </div>

    <!-- Navigation Bar -->
    <div class="flex items-center gap-3">
      <!-- Back -->
      <button onclick="goToPrevQuestion()"
        class="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 font-semibold text-sm transition-all
               ${canGoBack ? 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-500 bg-white dark:bg-gray-900' : 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed bg-gray-50 dark:bg-gray-900/50'}">
        <i class="fas fa-chevron-left"></i>
        <span class="hidden sm:inline">Back</span>
      </button>

      <!-- Question indicator / Jump -->
      <div class="flex-1 text-center">
        <span class="text-gray-500 dark:text-gray-400 text-sm">
          ${isAnswered
            ? (currentAnswer === question.answer
                ? '<span class="text-green-500 font-semibold">✓ Correct!</span>'
                : `<span class="text-red-500 font-semibold">✗ Correct: ${question.answer}</span>`)
            : `<span class="text-gray-400">Question ${q.current + 1} of ${q.questions.length}</span>`}
        </span>
      </div>

      <!-- Skip (if unanswered) / Next (if answered) -->
      ${isAnswered
        ? `<button onclick="goToNextQuestion()"
             class="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm btn-primary text-white transition-all">
             <span class="hidden sm:inline">${canGoForward ? 'Next' : 'Finish'}</span>
             <i class="fas fa-chevron-right"></i>
           </button>`
        : `<button onclick="skipQuestion()"
             class="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-700 font-semibold text-sm text-gray-600 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 bg-white dark:bg-gray-900 transition-all">
             <span class="hidden sm:inline">Skip</span>
             <i class="fas fa-forward"></i>
           </button>`}
    </div>

    <!-- Quit -->
    <div class="mt-4 text-center">
      <button onclick="confirmQuit()" class="text-gray-400 hover:text-red-400 text-xs transition-colors flex items-center gap-1 mx-auto">
        <i class="fas fa-xmark text-xs"></i> Quit quiz
      </button>
    </div>
  </div>`;
}

// Quiz timer management
let quizTimer = null;

function startTimer() {
  clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    if (AppState.currentPage !== 'quiz') { clearInterval(quizTimer); return; }
    // Don't count down if question already answered
    if (AppState.quiz.answers[AppState.quiz.current] !== undefined) return;

    AppState.quiz.timeLeft--;
    const timePercent = (AppState.quiz.timeLeft / AppState.quiz.maxTime) * 100;
    const timerEl  = document.getElementById('timer-display');
    const timerBar = document.getElementById('timer-bar');

    if (timerEl) {
      timerEl.innerHTML = `<i class="fas fa-clock text-sm"></i><span>${AppState.quiz.timeLeft}s</span>`;
      const urgent = AppState.quiz.timeLeft <= 5;
      const amber  = AppState.quiz.timeLeft <= 10;
      timerEl.className = `flex items-center gap-1 font-bold text-lg ${urgent ? 'text-red-500 timer-urgent' : amber ? 'text-amber-500' : 'text-green-500'}`;
      if (timerBar) {
        timerBar.style.width = `${timePercent}%`;
        timerBar.className = timerBar.className.replace(/bg-\w+-\d+/, urgent ? 'bg-red-500' : amber ? 'bg-amber-500' : 'bg-green-500');
      }
    }
    if (AppState.quiz.timeLeft <= 0) {
      clearInterval(quizTimer);
      autoSkipQuestion();
    }
  }, 1000);
}

function resetTimer() {
  AppState.quiz.timeLeft = AppState.quiz.maxTime;
}

function autoSkipQuestion() {
  const q = AppState.quiz;
  if (q.answers[q.current] === undefined) {
    q.answers[q.current] = null; // null = timed out / skipped
  }
  advanceAfterAnswer();
}

function skipQuestion() {
  clearInterval(quizTimer);
  autoSkipQuestion();
}

// ---- NAVIGATE QUESTIONS ----
function jumpToQuestion(idx) {
  clearInterval(quizTimer);
  AppState.quiz.current = idx;
  // Reset timer only if that question hasn't been answered yet
  if (AppState.quiz.answers[idx] === undefined) {
    resetTimer();
    render();
    startTimer();
  } else {
    render();
  }
}

function goToPrevQuestion() {
  const q = AppState.quiz;
  if (q.current === 0) return;
  clearInterval(quizTimer);
  q.current--;
  if (q.answers[q.current] === undefined) {
    resetTimer();
    render();
    startTimer();
  } else {
    render();
  }
}

function goToNextQuestion() {
  const q = AppState.quiz;
  clearInterval(quizTimer);
  if (q.current < q.questions.length - 1) {
    q.current++;
    if (q.answers[q.current] === undefined) {
      resetTimer();
      render();
      startTimer();
    } else {
      render();
    }
  } else {
    // Check for any unanswered questions
    const firstUnanswered = q.questions.findIndex((_, i) => q.answers[i] === undefined);
    if (firstUnanswered !== -1) {
      // Jump to first unanswered
      q.current = firstUnanswered;
      resetTimer();
      render();
      startTimer();
    } else {
      // All answered → show results
      finishQuiz();
    }
  }
}

function advanceAfterAnswer() {
  const q = AppState.quiz;
  // Check if all questions are answered
  const allAnswered = q.questions.every((_, i) => q.answers[i] !== undefined);
  if (allAnswered) {
    setTimeout(finishQuiz, 900);
    return;
  }
  // Find next unanswered
  let nextIdx = q.current + 1;
  while (nextIdx < q.questions.length && q.answers[nextIdx] !== undefined) nextIdx++;
  if (nextIdx >= q.questions.length) {
    nextIdx = q.questions.findIndex((_, i) => q.answers[i] === undefined);
  }
  if (nextIdx === -1 || nextIdx === q.current) {
    setTimeout(finishQuiz, 900);
  } else {
    setTimeout(() => {
      q.current = nextIdx;
      resetTimer();
      render();
      startTimer();
    }, 900);
  }
}

function finishQuiz() {
  clearInterval(quizTimer);
  AppState.quiz.finished = true;
  navigate('quiz-result');
}

function confirmQuit() {
  if (confirm('Quit this quiz? Your progress will be lost.')) {
    clearInterval(quizTimer);
    navigate('home');
  }
}

function selectAnswer(answer) {
  clearInterval(quizTimer);
  const q = AppState.quiz;
  // Prevent re-answering
  if (q.answers[q.current] !== undefined) return;

  const question = q.questions[q.current];
  const isCorrect = answer === question.answer;
  if (isCorrect) q.score++;
  q.answers[q.current] = answer;

  // Re-render to show result state immediately
  render();

  // Update score display
  const scoreEl = document.getElementById('score-display');
  if (scoreEl && isCorrect) {
    scoreEl.classList.add('score-update');
    scoreEl.textContent = q.score;
    setTimeout(() => scoreEl.classList.remove('score-update'), 400);
  }
}

// ---- QUIZ RESULT PAGE ----
function renderQuizResult() {
  const q = AppState.quiz;
  const pct = Math.round((q.score / q.questions.length) * 100);
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

  let grade, gradeColor, gradeMsg;
  if (pct >= 90) { grade = 'Elite'; gradeColor = 'text-yellow-500'; gradeMsg = '🏆 You are a football genius!'; }
  else if (pct >= 70) { grade = 'Pro'; gradeColor = 'text-blue-500'; gradeMsg = '⭐ Impressive knowledge!'; }
  else if (pct >= 50) { grade = 'Amateur'; gradeColor = 'text-green-500'; gradeMsg = '👍 Not bad, keep learning!'; }
  else { grade = 'Rookie'; gradeColor = 'text-gray-500'; gradeMsg = '📚 Study more football!'; }

  if (pct >= 70) {
    setTimeout(launchConfetti, 300);
  }

  return `
  ${renderNav('leagues')}
  <div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 page-enter">
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <!-- Result Header -->
      <div class="bg-gradient-to-br ${pct >= 70 ? 'from-blue-600 to-purple-700' : 'from-gray-600 to-gray-800'} p-10 text-center text-white">
        <div class="flex justify-center gap-3 mb-4">
          ${Array.from({length: 3}, (_, i) => `
            <span class="result-star text-4xl ${i < stars ? 'text-yellow-400' : 'text-white/30'}" style="animation-delay:${i*0.15}s">★</span>
          `).join('')}
        </div>
        <div class="text-6xl font-black mb-1">${pct}%</div>
        <div class="text-xl font-bold mb-1 ${gradeColor.replace('text-', 'text-')} ">${grade}</div>
        <p class="text-white/80">${gradeMsg}</p>
      </div>

      <div class="p-8">
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          ${[
            { label: 'Correct', val: q.score, icon: '✅', color: 'text-green-500' },
            { label: 'Wrong', val: q.questions.length - q.score, icon: '❌', color: 'text-red-500' },
            { label: 'Total', val: q.questions.length, icon: '❓', color: 'text-blue-500' },
          ].map(s => `
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div class="text-2xl mb-1">${s.icon}</div>
              <div class="text-2xl font-bold ${s.color}">${s.val}</div>
              <div class="text-xs text-gray-500">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Question Review -->
        <h3 class="font-bold text-gray-800 dark:text-gray-200 mb-3">Question Review</h3>
        <div class="space-y-3 mb-8 max-h-64 overflow-y-auto pr-1">
          ${q.questions.map((qst, i) => {
            const userAns = q.answers[i];
            const correct = userAns === qst.answer;
            return `
              <div class="flex gap-3 p-3 rounded-xl ${correct ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'} text-sm">
                <span class="flex-shrink-0 text-lg">${correct ? '✅' : '❌'}</span>
                <div>
                  <p class="font-medium text-gray-800 dark:text-gray-200 text-xs">${qst.question}</p>
                  ${!correct ? `<p class="text-red-600 dark:text-red-400 text-xs">Your answer: ${userAns || 'Skipped'}</p>` : ''}
                  <p class="${correct ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'} text-xs">✓ ${qst.answer}</p>
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="retryQuiz()" class="flex-1 py-3 btn-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2">
            <i class="fas fa-redo"></i> Try Again
          </button>
          <button onclick="navigate('leagues')" class="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
            <i class="fas fa-list"></i> More Leagues
          </button>
        </div>
      </div>
    </div>
  </div>
  ${renderFooter()}`;
}

function retryQuiz() {
  AppState.selectedDifficulty = AppState.quiz.difficulty;
  selectedDiff = AppState.quiz.difficulty;
  navigate('quiz-setup');
}

function launchConfetti() {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      top: -20px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ---- PLAYERS PAGE ----
function renderPlayersPage() {
  const popular = [
    'Lionel Messi', 'Cristiano Ronaldo', 'Erling Haaland', 'Kylian Mbappe',
    'Neymar', 'Kevin De Bruyne', 'Mohamed Salah', 'Vinicius Junior',
    'Jude Bellingham', 'Rodri', 'Harry Kane', 'Phil Foden',
    'Luka Modric', 'Robert Lewandowski', 'Virgil van Dijk', 'Pedri',
    'Bukayo Saka', 'Trent Alexander-Arnold', 'Gavi', 'Marcus Rashford'
  ];

  return `
  ${renderNav('players')}
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 page-enter">
    <div class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
        ⭐ Player Quiz
      </h1>
      <p class="text-gray-500 dark:text-gray-400">Test your knowledge about your favourite players</p>
    </div>

    <!-- Search Box -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 mb-8">
      <h2 class="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
        <i class="fas fa-search text-blue-500"></i> Search Any Player
      </h2>
      <div class="flex gap-3">
        <input type="text" id="player-search-input" placeholder="e.g. Thierry Henry, Zinedine Zidane..."
          class="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800
                 text-gray-800 dark:text-gray-200 focus:outline-none search-input transition-all"
          onkeypress="if(event.key==='Enter') searchPlayer()">
        <button onclick="searchPlayer()"
          class="px-6 py-3 btn-primary text-white rounded-xl font-bold flex items-center gap-2">
          <i class="fas fa-search"></i>
          <span class="hidden sm:inline">Search</span>
        </button>
      </div>
      <p class="text-gray-400 text-xs mt-2">🤖 AI will generate personalised questions for any player you search</p>
    </div>

    <!-- Popular Players Grid -->
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-5">🌟 Popular Players</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
      ${popular.map((p, i) => {
        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
        const color = colors[i % colors.length];
        return `
          <button onclick="selectPlayer('${p}')"
            class="card-hover p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md text-left group slide-up"
            style="animation-delay:${i*0.03}s">
            <div class="w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">
              ${p.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div class="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight">${p}</div>
            <div class="text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <i class="fas fa-play text-xs"></i> Quiz me
            </div>
          </button>`;
      }).join('')}
    </div>

    <!-- General Player Quiz -->
    <div class="bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-6 text-white text-center">
      <div class="text-4xl mb-3">🌐</div>
      <h3 class="font-bold text-xl mb-2">General Player Quiz</h3>
      <p class="text-white/80 mb-4 text-sm">Test your knowledge across all players in our database</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        ${['easy','medium','hard'].map(d => `
          <button onclick="navigate('quiz-setup', {quizCategory:'players',quizName:'Player Knowledge',selectedDifficulty:'${d}'})"
            class="px-5 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-bold border border-white/30 transition-all">
            ${d === 'easy' ? '🌱' : d === 'medium' ? '🔥' : '💀'} ${d.charAt(0).toUpperCase()+d.slice(1)}
          </button>
        `).join('')}
      </div>
    </div>
  </div>
  ${renderFooter()}`;
}

function selectPlayer(name) {
  showPlayerDifficultyModal(name);
}

function searchPlayer() {
  const input = document.getElementById('player-search-input');
  const name = input?.value?.trim();
  if (!name) return;
  showPlayerDifficultyModal(name);
}

function showPlayerDifficultyModal(playerName) {
  const modal = document.createElement('div');
  modal.id = 'player-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm bounce-in';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-800">
      <div class="text-center mb-6">
        <div class="text-5xl mb-3">⭐</div>
        <h3 class="text-xl font-black text-gray-800 dark:text-gray-200">${playerName}</h3>
        <p class="text-gray-500 text-sm mt-1">Choose your difficulty</p>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-6">
        ${[
          { level: 'easy', icon: '🌱', label: 'Easy', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300' },
          { level: 'medium', icon: '🔥', label: 'Medium', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300' },
          { level: 'hard', icon: '💀', label: 'Hard', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300' },
        ].map(d => `
          <button onclick="startPlayerQuiz('${playerName.replace(/'/g, "\\'")}','${d.level}')"
            class="p-3 rounded-2xl border ${d.color} text-center hover:scale-105 transition-all">
            <div class="text-2xl mb-1">${d.icon}</div>
            <div class="font-bold text-sm">${d.label}</div>
          </button>
        `).join('')}
      </div>
      <button onclick="document.getElementById('player-modal').remove()"
        class="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
        Cancel
      </button>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

async function startPlayerQuiz(playerName, difficulty) {
  document.getElementById('player-modal')?.remove();

  // Show loading overlay
  const loader = document.createElement('div');
  loader.id = 'quiz-loader';
  loader.className = 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm';
  loader.innerHTML = `
    <div class="text-center text-white">
      <div class="text-6xl mb-4 trophy-bounce">⚽</div>
      <div class="text-xl font-bold mb-2">Generating quiz for ${playerName}...</div>
      <div class="text-gray-400 text-sm mb-3">Powered by Intelligent Contract</div>
      <div class="w-72 max-w-[85vw] mx-auto mb-2">
        <div id="player-quiz-tx-status" class="text-xs text-blue-200 mb-1">⚠️ Transaction Pending...</div>
        <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div id="player-quiz-tx-progress" class="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style="width:6%"></div>
        </div>
      </div>
      <div class="mt-4 flex gap-2 justify-center">
        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay:0.1s"></div>
        <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay:0.2s"></div>
      </div>
    </div>`;
  document.body.appendChild(loader);

  let quizProgress = 6;
  const quizProgressTimer = setInterval(() => {
    quizProgress = Math.min(95, quizProgress + 1);
    const bar = document.getElementById('player-quiz-tx-progress');
    if (bar) bar.style.width = `${quizProgress}%`;
  }, 2000);

  try {
    const res = await axios.post('/api/ai/player-quiz', { playerName, difficulty });
    const { questions } = res.data;
    clearInterval(quizProgressTimer);
    const statusEl = document.getElementById('player-quiz-tx-status');
    const bar = document.getElementById('player-quiz-tx-progress');
    if (statusEl) statusEl.textContent = '✅ ACCEPTED';
    if (bar) bar.style.width = '100%';

    loader.remove();

    if (!questions || questions.length === 0) {
      alert('Could not generate questions. Please try again.');
      return;
    }

    AppState.quiz = {
      questions,
      current: 0,
      score: 0,
      answers: [],
      category: 'players',
      difficulty,
      playerName,
      timeLeft: difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20,
      maxTime: difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20,
      timer: null,
      started: true,
      finished: false,
      name: `${playerName} Quiz`
    };

    navigate('quiz');
  } catch (e) {
    clearInterval(quizProgressTimer);
    loader.remove();
    console.error(e);
    alert('Intelligent contract quiz generation failed. Please try again.');
  }
}

// ---- AI CHAT PAGE ----
function renderChatMessage(msg) {
  const isUser = msg.role === 'user';
  const content = isUser
    ? `<span>${escapeHtml(msg.content)}</span>`
    : renderAssistantPayload(msg.content);
  return `
    <div class="chat-message flex ${isUser ? 'justify-end' : 'justify-start'} gap-2">
      ${!isUser ? '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">🤖</div>' : ''}
      <div class="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? 'bg-blue-500 text-white rounded-tr-sm'
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-200 dark:border-gray-700 shadow-sm'}">
        ${content}
      </div>
      ${isUser ? '<div class="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">👤</div>' : ''}
    </div>`;
}

function renderAIPage() {
  const chatHTML = AppState.chat.history.map(renderChatMessage).join('');

  const suggestions = [
    'Tell me about Lionel Messi\'s career',
    'Who has won the most Champions League titles?',
    'Compare Messi and Ronaldo',
    'What was the Miracle of Istanbul?',
    'Who is the greatest manager ever?',
    'Explain tiki-taka football',
    'Tell me about the 1986 World Cup',
    'How many goals has Haaland scored?'
  ];

  return `
  ${renderNav('ai')}
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 page-enter">
    <div class="mb-6 text-center">
      <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
        🤖 Football AI Chat
      </h1>
      <p class="text-gray-500 dark:text-gray-400">Ask anything about football — players, teams, tactics, history, records</p>
    </div>

    <!-- Chat Area -->
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden" style="height: 620px; display: flex; flex-direction: column;">
      <!-- Chat Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <div class="font-bold text-white">FootballIQ Assistant</div>
          <div class="text-blue-200 text-xs flex items-center gap-1">
            <span class="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span> Online · Powered by AI
          </div>
        </div>
        <div class="ml-auto flex items-center gap-3">
          <span class="text-white/60 text-xs hidden sm:block">${AppState.chat.history.length > 0 ? AppState.chat.history.filter(h=>h.role==='user').length + ' messages' : 'Ask anything!'}</span>
          <button onclick="clearChat()" class="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1">
            <i class="fas fa-trash text-xs"></i>
            <span class="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 chat-area">
        ${AppState.chat.history.length === 0 ? `
          <div class="flex flex-col items-center justify-center h-full text-center py-4 px-4">
            <div class="text-5xl mb-3 float-anim">⚽</div>
            <h3 class="font-bold text-gray-700 dark:text-gray-300 text-lg mb-1">I'm your Football AI Expert</h3>
            <p class="text-gray-500 text-sm max-w-sm mb-5">Ask me anything — player careers, records, history, tactics, transfers, and more. I give detailed, fact-based answers!</p>
            <div class="grid grid-cols-2 gap-2 max-w-lg w-full">
              ${suggestions.map(s => `
                <button onclick="askSuggestion('${s.replace(/'/g, "\\'")}')"
                  class="text-left p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-xs text-blue-700 dark:text-blue-300 leading-tight">
                  <i class="fas fa-comment-dots mr-1 opacity-60"></i>"${s}"
                </button>
              `).join('')}
            </div>
          </div>
        ` : chatHTML}
        ${AppState.chat.loading ? `
          ${renderChatLoadingBubble()}
        ` : ''}
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <div class="flex gap-2">
          <input type="text" id="chat-input" placeholder="Ask about any player, team, manager..."
            class="flex-1 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none search-input transition-all text-sm"
            onkeypress="if(event.key==='Enter') sendChatMessage()">
          <button onclick="sendChatMessage()" id="chat-send-btn"
            class="px-5 py-3 btn-primary text-white rounded-2xl font-bold flex items-center gap-2 transition-all ${AppState.chat.loading ? 'opacity-50 cursor-not-allowed' : ''}">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <p class="text-gray-400 text-xs mt-2 text-center">Powered by AI · FootballIQ</p>
      </div>
    </div>

    <!-- Quick Quizzes from AI -->
    <div class="mt-6 grid sm:grid-cols-3 gap-4">
      ${[
        { title: 'Player Quiz', icon: '⭐', desc: 'AI-generated player questions', action: "navigate('players')" },
        { title: 'League Quiz', icon: '🏆', desc: 'Test league knowledge', action: "navigate('leagues')" },
        { title: 'Champions League', icon: '🌍', desc: 'Europe\'s elite quiz', action: "navigate('quiz-setup',{quizCategory:'champions_league',quizName:'Champions League'})" },
      ].map(c => `
        <div onclick="${c.action}" class="card-hover cursor-pointer p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3">
          <div class="text-3xl">${c.icon}</div>
          <div>
            <div class="font-bold text-gray-800 dark:text-gray-200 text-sm">${c.title}</div>
            <div class="text-gray-500 text-xs">${c.desc}</div>
          </div>
          <i class="fas fa-arrow-right text-gray-400 ml-auto"></i>
        </div>
      `).join('')}
    </div>
  </div>
  ${renderFooter()}`;
}

function askSuggestion(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    sendChatMessage();
  }
}

function clearChat() {
  AppState.chat.history = [];
  render();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input?.value?.trim();
  if (!message || AppState.chat.loading) return;

  input.value = '';
  AppState.chat.history.push({ role: 'user', content: message });
  AppState.chat.loading = true;
  AppState.chat.txProgress = 5;
  AppState.chat.txStatus = '⚠️ Transaction Pending...';

  // Re-render to show user message + typing indicator
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages) {
    chatMessages.innerHTML = AppState.chat.history.map(renderChatMessage).join('') + renderChatLoadingBubble();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Disable send button
  const sendBtn = document.getElementById('chat-send-btn');
  if (sendBtn) sendBtn.disabled = true;

  const progressTimer = setInterval(() => {
    if (!AppState.chat.loading) return;
    AppState.chat.txProgress = Math.min(95, (AppState.chat.txProgress || 5) + 1);
    const fill = document.getElementById('chat-tx-progress-fill');
    if (fill) fill.style.width = `${AppState.chat.txProgress}%`;
  }, 2000);

  try {
    const res = await axios.post('/api/ai/chat', {
      message,
      history: AppState.chat.history.slice(-10)
    });
    if (!res.data?.reply) {
      throw new Error(res.data?.error || 'No reply payload returned');
    }
    AppState.chat.txStatus = '✅ ACCEPTED';
    AppState.chat.txProgress = 100;
    AppState.chat.history.push({ role: 'assistant', content: res.data.reply });
  } catch (e) {
    AppState.chat.history.push({
      role: 'assistant',
      content: JSON.stringify({
        error: "I couldn't complete the contract call. Please check settings and try again."
      })
    });
  } finally {
    clearInterval(progressTimer);
  }

  AppState.chat.loading = false;
  AppState.chat.txStatus = '';
  AppState.chat.txProgress = 0;

  // Re-enable send button
  if (sendBtn) sendBtn.disabled = false;

  // Update chat display with markdown rendered messages
  if (chatMessages) {
    chatMessages.innerHTML = AppState.chat.history.map(renderChatMessage).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// ---- ABOUT PAGE ----
function renderAbout() {
  return `
  ${renderNav('about')}
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 page-enter">
    <div class="text-center mb-12">
      <div class="text-6xl mb-4 float-anim">⚽</div>
      <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-2">About FootballIQ</h1>
      <p class="text-gray-500 dark:text-gray-400">The ultimate football knowledge platform</p>
    </div>
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 space-y-6">
      <p class="text-gray-700 dark:text-gray-300">FootballIQ is a comprehensive football quiz application featuring 10+ major leagues, player quizzes, and an AI-powered football assistant.</p>
    </div>
  </div>
  ${renderFooter()}`;
}

// ---- FOOTER ----
function renderFooter() {
  return `
  <footer class="mt-12 border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-500 dark:text-gray-600 text-sm">
    <p>⚽ FootballIQ &copy; 2025 &mdash; The Ultimate Football Quiz</p>
    <div class="flex justify-center gap-4 mt-3 text-xs">
      <button onclick="navigate('home')" class="hover:text-blue-500 transition-colors">Home</button>
      <button onclick="navigate('leagues')" class="hover:text-blue-500 transition-colors">Leagues</button>
      <button onclick="navigate('players')" class="hover:text-blue-500 transition-colors">Players</button>
      <button onclick="navigate('ai')" class="hover:text-blue-500 transition-colors">AI Chat</button>
    </div>
  </footer>`;
}

// ---- EVENT LISTENERS ----
function attachEventListeners() {
  // Start timer if on quiz page
  if (AppState.currentPage === 'quiz' && AppState.quiz.started) {
    setTimeout(() => startTimer(), 100);
  }

  // Handle preset difficulty on quiz setup
  if (AppState.currentPage === 'quiz-setup' && AppState.selectedDifficulty) {
    selectedDiff = AppState.selectedDifficulty;
  }
}

// ---- INIT ----
function init() {
  ThemeManager.init();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (ThemeManager.get() === 'system') {
      ThemeManager.apply('system');
    }
  });

  render();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
