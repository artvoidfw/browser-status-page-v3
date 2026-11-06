(function () {
  'use strict';

  const Storage = {
    async get(key, defaultValue) {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError || result[key] === undefined) {
              resolve(defaultValue);
            } else {
              resolve(result[key]);
            }
          });
        });
      }
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        return defaultValue;
      }
    },

    async set(key, value) {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [key]: value }, resolve);
        });
      }
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('Storage set failed', e);
      }
    }
  };

  const COUNTRIES = {
    az: {
      code: 'az',
      name: 'Azərbaycan',
      flag: '🇦🇿',
      locale: 'az-AZ',
      timezone: 'Asia/Baku',
      utcOffset: 'UTC+4',
      defaultCity: 'Bakı',
      lat: 40.4093,
      lon: 49.8671,
      lang: 'az'
    },
    tr: {
      code: 'tr',
      name: 'Türkiye',
      flag: '🇹🇷',
      locale: 'tr-TR',
      timezone: 'Europe/Istanbul',
      utcOffset: 'UTC+3',
      defaultCity: 'İstanbul',
      lat: 41.0082,
      lon: 28.9784,
      lang: 'tr'
    },
    us: {
      code: 'us',
      name: 'United States',
      flag: '🇺🇸',
      locale: 'en-US',
      timezone: 'America/New_York',
      utcOffset: 'UTC-5',
      defaultCity: 'New York',
      lat: 40.7128,
      lon: -74.0060,
      lang: 'en'
    },
    ru: {
      code: 'ru',
      name: 'Россия (Russia)',
      flag: '🇷🇺',
      locale: 'ru-RU',
      timezone: 'Europe/Moscow',
      utcOffset: 'UTC+3',
      defaultCity: 'Москва',
      lat: 55.7558,
      lon: 37.6173,
      lang: 'ru'
    },
    it: {
      code: 'it',
      name: 'Italia (Italy)',
      flag: '🇮🇹',
      locale: 'it-IT',
      timezone: 'Europe/Rome',
      utcOffset: 'UTC+1',
      defaultCity: 'Roma',
      lat: 41.9028,
      lon: 12.4964,
      lang: 'it'
    },
    es: {
      code: 'es',
      name: 'España (Spain)',
      flag: '🇪🇸',
      locale: 'es-ES',
      timezone: 'Europe/Madrid',
      utcOffset: 'UTC+1',
      defaultCity: 'Madrid',
      lat: 40.4168,
      lon: -3.7038,
      lang: 'es'
    },
    de: {
      code: 'de',
      name: 'Deutschland (Germany)',
      flag: '🇩🇪',
      locale: 'de-DE',
      timezone: 'Europe/Berlin',
      utcOffset: 'UTC+1',
      defaultCity: 'Berlin',
      lat: 52.5200,
      lon: 13.4050,
      lang: 'de'
    },
    fr: {
      code: 'fr',
      name: 'France (France)',
      flag: '🇫🇷',
      locale: 'fr-FR',
      timezone: 'Europe/Paris',
      utcOffset: 'UTC+1',
      defaultCity: 'Paris',
      lat: 48.8566,
      lon: 2.3522,
      lang: 'fr'
    },
    gb: {
      code: 'gb',
      name: 'United Kingdom',
      flag: '🇬🇧',
      locale: 'en-GB',
      timezone: 'Europe/London',
      utcOffset: 'UTC+0',
      defaultCity: 'London',
      lat: 51.5074,
      lon: -0.1278,
      lang: 'en'
    },
    cn: {
      code: 'cn',
      name: '中国 (China)',
      flag: '🇨🇳',
      locale: 'zh-CN',
      timezone: 'Asia/Shanghai',
      utcOffset: 'UTC+8',
      defaultCity: '北京',
      lat: 39.9042,
      lon: 116.4074,
      lang: 'zh'
    },
    in: {
      code: 'in',
      name: 'भारत (India)',
      flag: '🇮🇳',
      locale: 'en-IN',
      timezone: 'Asia/Kolkata',
      utcOffset: 'UTC+5:30',
      defaultCity: 'New Delhi',
      lat: 28.6139,
      lon: 77.2090,
      lang: 'en'
    },
    jp: {
      code: 'jp',
      name: '日本 (Japan)',
      flag: '🇯🇵',
      locale: 'ja-JP',
      timezone: 'Asia/Tokyo',
      utcOffset: 'UTC+9',
      defaultCity: '東京',
      lat: 35.6762,
      lon: 139.6503,
      lang: 'ja'
    },
    kr: {
      code: 'kr',
      name: '대한민국 (South Korea)',
      flag: '🇰🇷',
      locale: 'ko-KR',
      timezone: 'Asia/Seoul',
      utcOffset: 'UTC+9',
      defaultCity: '서울',
      lat: 37.5665,
      lon: 126.9780,
      lang: 'ko'
    },
    br: {
      code: 'br',
      name: 'Brasil (Brazil)',
      flag: '🇧🇷',
      locale: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      utcOffset: 'UTC-3',
      defaultCity: 'São Paulo',
      lat: -23.5505,
      lon: -46.6333,
      lang: 'pt'
    },
    ca: {
      code: 'ca',
      name: 'Canada',
      flag: '🇨🇦',
      locale: 'en-CA',
      timezone: 'America/Toronto',
      utcOffset: 'UTC-5',
      defaultCity: 'Toronto',
      lat: 43.6532,
      lon: -79.3832,
      lang: 'en'
    },
    au: {
      code: 'au',
      name: 'Australia',
      flag: '🇦🇺',
      locale: 'en-AU',
      timezone: 'Australia/Sydney',
      utcOffset: 'UTC+10',
      defaultCity: 'Sydney',
      lat: -33.8688,
      lon: 151.2093,
      lang: 'en'
    }
  };

  const TRANSLATIONS = {
    az: {
      searchPlaceholder: 'Axtar və ya URL daxil et... (/)',
      zenMode: 'Fokus Rejimi (Zen)',
      zenExit: "Fokus Rejimindən Çıx (və ya 'Esc')",
      todoDrawerTitle: 'Günün Hədəfləri & Qeydlər',
      newTodoPlaceholder: 'Yeni hədəf yazın...',
      emptyTodos: 'Heç bir hədəf yoxdur. Yeni hədəf əlavə edin!',
      notesTitle: '📝 Tez Qeydlər',
      notesPlaceholder: 'Günün ideyaları, kod fraqmentləri və ya qeydlər...',
      notesSaved: 'Yadda saxlanıldı ✓',
      notesSaving: 'Saxlanılır...',
      settingsHeading: 'Tənzimləmələr',
      lblCountryLang: '🌍 Ölkə, Dil və Saat Qurşağı',
      lblTheme: 'Görünüş Mövzusu (Saf Qradientsiz)',
      lblCity: 'Hava Şəhəri',
      lbl24Hour: '24 Saat Formatı',
      lblSeconds: 'Saniyələri Göstər',
      lblStarfield: 'Kosmik Ulduzlar Animasiyası',
      lblWeather: 'Hava Vidcetini Göstər',
      lblShortcuts: 'Qısayolları Göstər',
      lblQuotes: 'Motivasiya Fikirlərini Göstər',
      saveBtn: 'Yadda Saxla və Bağla',
      randomQuoteBtn: 'Stoisizm',
      addShortcut: 'Əlavə et',
      modalAddShortcutTitle: 'Yeni Qısayol Əlavə Et',
      modalSiteName: 'Saytın Adı',
      modalSiteUrl: 'URL Ünvanı',
      cancel: 'Ləğv et',
      save: 'Yadda Saxla'
    },
    tr: {
      searchPlaceholder: 'Ara veya URL girin... (/)',
      zenMode: 'Odak Modu (Zen)',
      zenExit: "Odak Modundan Çık (veya 'Esc')",
      todoDrawerTitle: 'Günün Hedefleri ve Notlar',
      newTodoPlaceholder: 'Yeni bir hedef yazın...',
      emptyTodos: 'Henüz bir hedef yok. Yeni bir hedef ekleyin!',
      notesTitle: '📝 Hızlı Notlar',
      notesPlaceholder: 'Günün fikirleri, bağlantılar veya notlar...',
      notesSaved: 'Kaydedildi ✓',
      notesSaving: 'Kaydediliyor...',
      settingsHeading: 'Ayarlar',
      lblCountryLang: '🌍 Ülke, Dil ve Saat Dilimi',
      lblTheme: 'Görünüm Teması (Saf Düz)',
      lblCity: 'Hava Durumu Şehri',
      lbl24Hour: '24 Saat Formatı',
      lblSeconds: 'Saniyeyi Göster',
      lblStarfield: 'Kozmik Yıldızlar Animasyonu',
      lblWeather: 'Hava Durumunu Göster',
      lblShortcuts: 'Kısayolları Göster',
      lblQuotes: 'Motivasyon Sözlerini Göster',
      saveBtn: 'Kaydet ve Kapat',
      randomQuoteBtn: 'Stoacılık',
      addShortcut: 'Ekle',
      modalAddShortcutTitle: 'Yeni Kısayol Ekle',
      modalSiteName: 'Site Adı',
      modalSiteUrl: 'URL Adresi',
      cancel: 'İptal',
      save: 'Kaydet'
    },
    en: {
      searchPlaceholder: 'Search or type a URL... (/)',
      zenMode: 'Zen Focus Mode',
      zenExit: "Exit Zen Mode (or 'Esc')",
      todoDrawerTitle: 'Daily Goals & Notes',
      newTodoPlaceholder: 'Add a new goal...',
      emptyTodos: 'No goals set. Add your first goal!',
      notesTitle: '📝 Quick Notes',
      notesPlaceholder: 'Ideas, snippets, thoughts for today...',
      notesSaved: 'Saved ✓',
      notesSaving: 'Saving...',
      settingsHeading: 'Settings',
      lblCountryLang: '🌍 Country, Language & Timezone',
      lblTheme: 'Appearance Theme (Pure Flat)',
      lblCity: 'Weather City',
      lbl24Hour: '24-Hour Format',
      lblSeconds: 'Show Seconds',
      lblStarfield: 'Cosmic Starfield Animation',
      lblWeather: 'Show Weather Widget',
      lblShortcuts: 'Show Speed Dial Shortcuts',
      lblQuotes: 'Show Motivational Quotes',
      saveBtn: 'Save & Close',
      randomQuoteBtn: 'Stoicism',
      addShortcut: 'Add New',
      modalAddShortcutTitle: 'Add New Shortcut',
      modalSiteName: 'Site Name',
      modalSiteUrl: 'URL Address',
      cancel: 'Cancel',
      save: 'Save'
    },
    ru: {
      searchPlaceholder: 'Поиск или ввод URL... (/)',
      zenMode: 'Дзен Режим',
      zenExit: "Выйти из Дзен (или 'Esc')",
      todoDrawerTitle: 'Задачи и Заметки',
      newTodoPlaceholder: 'Новая задача...',
      emptyTodos: 'Нет задач. Добавьте новую!',
      notesTitle: '📝 Заметки',
      notesPlaceholder: 'Идеи, ссылки, быстрые заметки...',
      notesSaved: 'Сохранено ✓',
      notesSaving: 'Сохранение...',
      settingsHeading: 'Настройки',
      lblCountryLang: '🌍 Страна, Язык и Часовой пояс',
      lblTheme: 'Тема оформления',
      lblCity: 'Город погоды',
      lbl24Hour: '24-часовой формат',
      lblSeconds: 'Показывать секунды',
      lblStarfield: 'Анимация звездного неба',
      lblWeather: 'Виджет погоды',
      lblShortcuts: 'Быстрые ссылки',
      lblQuotes: 'Цитаты и мудрость',
      saveBtn: 'Сохранить и закрыть',
      randomQuoteBtn: 'Стоицизм',
      addShortcut: 'Добавить',
      modalAddShortcutTitle: 'Новая закладка',
      modalSiteName: 'Название',
      modalSiteUrl: 'URL адрес',
      cancel: 'Отмена',
      save: 'Сохранить'
    }
  };

  const QUOTES = [
    {
      text: "Xarici hadisələrə deyil, yalnız öz fikirlərinə hökm edə bilərsən. Bunu anlasan, sarsılmaz güc tapacaqsan.",
      author: "Markus Avreli"
    },
    {
      text: "Bizi qorxudan şeylər, əslində bizə zərər verə biləcək şeylərdən daha çoxdur.",
      author: "Seneka"
    },
    {
      text: "Hardasa inanılmaz bir şey kəşf olunmağı gözləyir.",
      author: "Karl Saqan"
    },
    {
      text: "Baş verən hadisələri idarə edə bilməzsən, lakin onlara verdiyin reaksiyanı idarə edə bilərsən.",
      author: "Epiktet"
    },
    {
      text: "Kosmos bizim daxilimizdədir. Biz ulduz tozundan yoğrulmuşuq.",
      author: "Karl Saqan"
    },
    {
      text: "Ulduzlara baxın, ayaqlarınızın altına deyil. Gördüyünüzün mənasını anlamağa çalışın.",
      author: "Stiven Hokinq"
    },
    {
      text: "Ən böyük qələbə insanın öz üzərində qazandığı qələbədir.",
      author: "Platon"
    },
    {
      text: "Hər səhər oyandıqda düşün ki, yaşamaq, düşünmək, sevmək necə böyük bir imtiyazdır.",
      author: "Markus Avreli"
    },
    {
      text: "Zaman dəniz kənarındakı qum kimidir, onu möhkəm tutduqca barmaqlarının arasından süzülüb gedər.",
      author: "Seneka"
    },
    {
      text: "Kainatın sirri sadəlikdə və nizamdadır.",
      author: "Albert Eynşteyn"
    }
  ];

  const SEARCH_ENGINES = {
    google: { name: 'Google', icon: '🌐', queryUrl: 'https://www.google.com/search?q=' },
    brave: { name: 'Brave', icon: '🦁', queryUrl: 'https://search.brave.com/search?q=' },
    duckduckgo: { name: 'DuckDuckGo', icon: '🦆', queryUrl: 'https://duckduckgo.com/?q=' },
    chatgpt: { name: 'ChatGPT', icon: '🤖', queryUrl: 'https://chatgpt.com/?q=' },
    perplexity: { name: 'Perplexity', icon: '🔮', queryUrl: 'https://www.perplexity.ai/search?q=' },
    github: { name: 'GitHub', icon: '🐙', queryUrl: 'https://github.com/search?q=' },
    youtube: { name: 'YouTube', icon: '📺', queryUrl: 'https://www.youtube.com/results?search_query=' },
    reddit: { name: 'Reddit', icon: '👽', queryUrl: 'https://www.reddit.com/search/?q=' },
    wikipedia: { name: 'Wikipedia', icon: '📚', queryUrl: 'https://wikipedia.org/wiki/Special:Search?search=' }
  };

  const DEFAULT_SETTINGS = {
    country: 'az',
    theme: 'cyan',
    is24Hour: true,
    showSeconds: true,
    showStarfield: true,
    showWeather: true,
    showShortcuts: true,
    showQuotes: true,
    searchEngine: 'google',
    cityName: 'Bakı',
    customBgUrl: '',
    customBgDim: 40,
    orbitSpeed: 1
  };

  const DEFAULT_SHORTCUTS = [
    { id: '1', title: 'YouTube', url: 'https://youtube.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
    { id: '3', title: 'ChatGPT', url: 'https://chatgpt.com' },
    { id: '4', title: 'X (Twitter)', url: 'https://x.com' },
    { id: '5', title: 'Reddit', url: 'https://reddit.com' },
    { id: '6', title: 'Gmail', url: 'https://mail.google.com' },
    { id: '7', title: 'Spotify', url: 'https://open.spotify.com' }
  ];

  let appState = {
    settings: { ...DEFAULT_SETTINGS },
    shortcuts: [...DEFAULT_SHORTCUTS],
    todos: [],
    scratchpad: '',
    isZenMode: false
  };

  let selectedCountryTemp = 'az';
  let networkTimeOffset = 0;

  const els = {
    body: document.body,
    spaceCanvas: document.getElementById('spaceCanvas'),
    customBgLayer: document.getElementById('customBgLayer'),
    customBgDimmer: document.getElementById('customBgDimmer'),
    appWrapper: document.getElementById('appWrapper'),
    topBar: document.getElementById('topBar'),
    searchEngineBtn: document.getElementById('searchEngineBtn'),
    currentEngineIcon: document.getElementById('currentEngineIcon'),
    currentEngineName: document.getElementById('currentEngineName'),
    engineDropdown: document.getElementById('engineDropdown'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    addShortcutHeaderBtn: document.getElementById('addShortcutHeaderBtn'),
    portfolioBtn: document.getElementById('portfolioBtn'),
    weatherPill: document.getElementById('weatherPill'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherTemp: document.getElementById('weatherTemp'),
    weatherCity: document.getElementById('weatherCity'),
    zenBtn: document.getElementById('zenBtn'),
    todoToggleBtn: document.getElementById('todoToggleBtn'),
    todoBadge: document.getElementById('todoBadge'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    settingsBtn: document.getElementById('settingsBtn'),

    mainContent: document.getElementById('mainContent'),
    orbitalFrame: document.getElementById('orbitalFrame'),
    cosmicCore: document.getElementById('cosmicCore'),
    clockHoursMinutes: document.getElementById('clockHoursMinutes'),
    clockSeconds: document.getElementById('clockSeconds'),
    clockAmPm: document.getElementById('clockAmPm'),
    clockTimezoneBadge: document.getElementById('clockTimezoneBadge'),
    quoteContainer: document.getElementById('quoteContainer'),
    quoteText: document.getElementById('quoteText'),
    quoteAuthor: document.getElementById('quoteAuthor'),

    shortcutsContainer: document.getElementById('shortcutsContainer'),
    shortcutsGrid: document.getElementById('shortcutsGrid'),

    bottomBar: document.getElementById('bottomBar'),
    randomQuoteBtn: document.getElementById('randomQuoteBtn'),
    randomQuoteBtnLabel: document.getElementById('randomQuoteBtnLabel'),
    timeZoneInfo: document.getElementById('timeZoneInfo'),
    userGithubLink: document.getElementById('userGithubLink'),

    zenExitBar: document.getElementById('zenExitBar'),
    zenExitBtn: document.getElementById('zenExitBtn'),
    zenExitText: document.getElementById('zenExitText'),

    todoDrawer: document.getElementById('todoDrawer'),
    todoDrawerTitle: document.getElementById('todoDrawerTitle'),
    closeTodoDrawer: document.getElementById('closeTodoDrawer'),
    newTodoInput: document.getElementById('newTodoInput'),
    addTodoBtn: document.getElementById('addTodoBtn'),
    todoList: document.getElementById('todoList'),
    scratchpadTitle: document.getElementById('scratchpadTitle'),
    scratchpadArea: document.getElementById('scratchpadArea'),
    noteSavedStatus: document.getElementById('noteSavedStatus'),

    shortcutModal: document.getElementById('shortcutModal'),
    shortcutModalTitle: document.getElementById('shortcutModalTitle'),
    closeShortcutModal: document.getElementById('closeShortcutModal'),
    cancelShortcutModal: document.getElementById('cancelShortcutModal'),
    saveShortcutModal: document.getElementById('saveShortcutModal'),
    modalShortcutTitle: document.getElementById('modalShortcutTitle'),
    modalShortcutUrl: document.getElementById('modalShortcutUrl'),

    settingsModal: document.getElementById('settingsModal'),
    settingsHeading: document.getElementById('settingsHeading'),
    closeSettingsModal: document.getElementById('closeSettingsModal'),
    saveSettingsBtn: document.getElementById('saveSettingsBtn'),
    bgUrlInput: document.getElementById('bgUrlInput'),
    bgFileInput: document.getElementById('bgFileInput'),
    clearBgBtn: document.getElementById('clearBgBtn'),
    bgDimmerSlider: document.getElementById('bgDimmerSlider'),
    bgDimmerVal: document.getElementById('bgDimmerVal'),
    orbitSpeedSlider: document.getElementById('orbitSpeedSlider'),
    orbitSpeedVal: document.getElementById('orbitSpeedVal'),
    lblCountryLang: document.getElementById('lblCountryLang'),
    countryDropdownBtn: document.getElementById('countryDropdownBtn'),
    countryDropdownMenu: document.getElementById('countryDropdownMenu'),
    countryCurrentFlag: document.getElementById('countryCurrentFlag'),
    countryCurrentName: document.getElementById('countryCurrentName'),
    countryCurrentUtc: document.getElementById('countryCurrentUtc'),
    countryChevron: document.getElementById('countryChevron'),
    countryTimezoneHint: document.getElementById('countryTimezoneHint'),
    lblTheme: document.getElementById('lblTheme'),
    themeSelector: document.getElementById('themeSelector'),
    lblCity: document.getElementById('lblCity'),
    settingCityName: document.getElementById('settingCityName'),
    lbl24Hour: document.getElementById('lbl24Hour'),
    lblSeconds: document.getElementById('lblSeconds'),
    lblStarfield: document.getElementById('lblStarfield'),
    lblWeather: document.getElementById('lblWeather'),
    lblShortcuts: document.getElementById('lblShortcuts'),
    lblQuotes: document.getElementById('lblQuotes'),
    toggle24Hour: document.getElementById('toggle24Hour'),
    toggleSeconds: document.getElementById('toggleSeconds'),
    toggleStarfield: document.getElementById('toggleStarfield'),
    toggleWeather: document.getElementById('toggleWeather'),
    toggleShortcuts: document.getElementById('toggleShortcuts'),
    toggleQuotes: document.getElementById('toggleQuotes')
  };

  let starfieldAnimId = null;
  const Starfield = {
    canvas: null,
    ctx: null,
    stars: [],
    meteors: [],
    width: 0,
    height: 0,
    numStars: 140,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,

    init() {
      this.canvas = els.spaceCanvas;
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();

      window.addEventListener('resize', () => this.resize());
      window.addEventListener('mousemove', (e) => {
        this.targetMouseX = (e.clientX - this.width / 2) * 0.03;
        this.targetMouseY = (e.clientY - this.height / 2) * 0.03;
      });

      this.createStars();
      this.animate();
    },

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },

    createStars() {
      this.stars = [];
      const colors = ['#ffffff', '#e2e8f0', '#93c5fd', '#fef08a', '#67e8f9'];
      for (let i = 0; i < this.numStars; i++) {
        this.stars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.5 + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.3,
          alpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    },

    spawnMeteor() {
      if (Math.random() > 0.007 || this.meteors.length >= 2) return;
      const startX = Math.random() * this.width;
      const startY = Math.random() * (this.height * 0.4);
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
      const speed = Math.random() * 6 + 6;
      this.meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length: Math.random() * 70 + 40,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    },

    animate() {
      if (!appState.settings.showStarfield) {
        if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
        starfieldAnimId = requestAnimationFrame(() => this.animate());
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        const renderX = star.x + this.mouseX * star.radius;
        const renderY = star.y + this.mouseY * star.radius;

        this.ctx.globalAlpha = star.alpha;
        this.ctx.fillStyle = star.color;
        this.ctx.beginPath();
        this.ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.spawnMeteor();
      for (let i = this.meteors.length - 1; i >= 0; i--) {
        const m = this.meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > this.width || m.y > this.height) {
          this.meteors.splice(i, 1);
          continue;
        }

        this.ctx.globalAlpha = m.life;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.moveTo(m.x, m.y);
        this.ctx.lineTo(m.x - m.dx * 3, m.y - m.dy * 3);
        this.ctx.stroke();
      }

      this.ctx.globalAlpha = 1.0;
      starfieldAnimId = requestAnimationFrame(() => this.animate());
    }
  };

  function applyOrbitSpeed(speed) {
    const s = parseFloat(speed) || 1;
    appState.settings.orbitSpeed = s;
    if (els.orbitalFrame) {
      els.orbitalFrame.style.setProperty('--orbit-speed', s);
    }
    if (els.orbitSpeedSlider) {
      els.orbitSpeedSlider.value = s;
    }
    if (els.orbitSpeedVal) {
      els.orbitSpeedVal.textContent = `${s.toFixed(1)}x`;
    }
  }

  function applyCustomBackground() {
    const bgUrl = (appState.settings.customBgUrl || '').trim();
    const dimPercentage = appState.settings.customBgDim !== undefined ? appState.settings.customBgDim : 40;
    const dimAlpha = (dimPercentage / 100).toFixed(2);

    if (bgUrl && bgUrl !== 'none') {
      els.customBgLayer.style.display = 'block';
      els.customBgLayer.style.backgroundImage = `url("${bgUrl}")`;
      els.customBgDimmer.style.display = 'block';
      document.documentElement.style.setProperty('--custom-bg-dim', dimAlpha);
    } else {
      els.customBgLayer.style.display = 'none';
      els.customBgLayer.style.backgroundImage = 'none';
      els.customBgDimmer.style.display = 'none';
    }

    if (els.bgUrlInput) els.bgUrlInput.value = bgUrl === 'none' ? '' : bgUrl;
    if (els.bgDimmerSlider) els.bgDimmerSlider.value = dimPercentage;
    if (els.bgDimmerVal) els.bgDimmerVal.textContent = `${dimPercentage}%`;
  }

  function applyTheme(themeName) {
    const validThemes = ['cyan', 'amber', 'emerald', 'amethyst', 'crimson', 'minimal'];
    const active = validThemes.includes(themeName) ? themeName : 'cyan';

    validThemes.forEach(t => els.body.classList.remove(`theme-${t}`));
    els.body.classList.add(`theme-${active}`);

    document.querySelectorAll('.theme-pill-btn').forEach(btn => {
      if (btn.dataset.theme === active) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function getActiveCountry() {
    return COUNTRIES[appState.settings.country] || COUNTRIES.az;
  }

  function getI18n() {
    const country = getActiveCountry();
    return TRANSLATIONS[country.lang] || TRANSLATIONS.az;
  }

  function formatTimezoneLabel(country, city) {
    return `${country.timezone} (${country.utcOffset})`;
  }

  function applyLanguage() {
    const country = getActiveCountry();
    const t = getI18n();

    document.documentElement.lang = country.lang || 'az';
    els.searchInput.placeholder = t.searchPlaceholder || 'Axtar və ya URL daxil et... (/)';
    els.zenBtn.title = t.zenMode || 'Fokus Rejimi (Zen)';
    els.zenExitText.textContent = t.zenExit || "Fokus Rejimindən Çıx (və ya 'Esc')";
    els.todoDrawerTitle.textContent = t.todoDrawerTitle || 'Günün Hədəfləri & Qeydlər';
    els.newTodoInput.placeholder = t.newTodoPlaceholder || 'Yeni hədəf yazın...';
    els.scratchpadTitle.textContent = t.notesTitle || '📝 Tez Qeydlər';
    els.scratchpadArea.placeholder = t.notesPlaceholder || 'Günün ideyaları, kod fraqmentləri və ya qeydlər...';
    els.settingsHeading.textContent = t.settingsHeading || 'Tənzimləmələr';
    els.lblCountryLang.querySelector('span:first-child').textContent = t.lblCountryLang || '🌍 Ölkə, Dil və Saat Qurşağı';
    els.lblTheme.textContent = t.lblTheme || 'Görünüş Mövzusu (Saf Qradientsiz)';
    els.lblCity.textContent = t.lblCity || 'Hava Şəhəri';
    els.lbl24Hour.textContent = t.lbl24Hour || '24 Saat Formatı';
    els.lblSeconds.textContent = t.lblSeconds || 'Saniyələri Göstər';
    els.lblStarfield.textContent = t.lblStarfield || 'Kosmik Ulduzlar Animasiyası';
    els.lblWeather.textContent = t.lblWeather || 'Hava Vidcetini Göstər';
    els.lblShortcuts.textContent = t.lblShortcuts || 'Qısayolları Göstər';
    els.lblQuotes.textContent = t.lblQuotes || 'Motivasiya Fikirlərini Göstər';
    els.saveSettingsBtn.textContent = t.saveBtn || 'Yadda Saxla və Bağla';
    els.randomQuoteBtnLabel.textContent = t.randomQuoteBtn || 'Stoisizm';
    els.shortcutModalTitle.textContent = t.modalAddShortcutTitle || 'Yeni Qısayol Əlavə Et';
    els.cancelShortcutModal.textContent = t.cancel || 'Ləğv et';
    els.saveShortcutModal.textContent = t.save || 'Yadda Saxla';

    els.timeZoneInfo.textContent = country.timezone;
  }

  async function syncNetworkTime() {
    try {
      const startTime = performance.now();
      const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const serverTime = new Date(data.utc_datetime).getTime();
        const latency = (performance.now() - startTime) / 2;
        const now = Date.now();
        networkTimeOffset = (serverTime + latency) - now;
      }
    } catch (e) {}
  }

  function updateClock() {
    const country = getActiveCountry();
    const now = new Date(Date.now() + networkTimeOffset);

    const timeOptions = {
      timeZone: country.timezone,
      hour12: !appState.settings.is24Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const parts = new Intl.DateTimeFormat('en-US', timeOptions).formatToParts(now);
    let hours = '00';
    let minutes = '00';
    let seconds = '00';
    let dayPeriod = '';

    parts.forEach(p => {
      if (p.type === 'hour') hours = p.value;
      if (p.type === 'minute') minutes = p.value;
      if (p.type === 'second') seconds = p.value;
      if (p.type === 'dayPeriod') dayPeriod = p.value.toUpperCase();
    });

    els.clockHoursMinutes.textContent = `${hours}:${minutes}`;

    if (appState.settings.showSeconds) {
      els.clockSeconds.style.display = 'inline';
      els.clockSeconds.textContent = seconds;
    } else {
      els.clockSeconds.style.display = 'none';
    }

    els.clockAmPm.textContent = appState.settings.is24Hour ? '' : dayPeriod;
    els.clockTimezoneBadge.textContent = country.utcOffset;
  }

  async function fetchWeather() {
    if (!appState.settings.showWeather) {
      els.weatherPill.style.display = 'none';
      return;
    }
    els.weatherPill.style.display = 'flex';

    const country = getActiveCountry();
    const city = (appState.settings.cityName || country.defaultCity || 'Bakı').trim();
    els.weatherCity.textContent = city;

    try {
      let lat = country.lat;
      let lon = country.lon;

      if (city.toLowerCase() !== country.defaultCity.toLowerCase()) {
        try {
          const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results.length > 0) {
              lat = geoData.results[0].latitude;
              lon = geoData.results[0].longitude;
            }
          }
        } catch (e) {}
      }

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`);
      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        const current = weatherData.current_weather;
        if (current) {
          const temp = Math.round(current.temperature);
          els.weatherTemp.textContent = `${temp > 0 ? '+' : ''}${temp}°C`;
          els.weatherIcon.textContent = getWeatherIcon(current.weathercode, current.is_day);
          els.weatherPill.title = `${city}: ${temp}°C, Külək: ${current.windspeed} km/s`;
        }
      }
    } catch (e) {
      els.weatherTemp.textContent = '--°C';
    }
  }

  function getWeatherIcon(code, isDay = 1) {
    if (code === 0) return isDay ? '☀️' : '🌙';
    if ([1, 2].includes(code)) return isDay ? '🌤️' : '⛅';
    if (code === 3) return '☁️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⚡';
    return '⛅';
  }

  function renderShortcuts() {
    if (!appState.settings.showShortcuts) {
      els.shortcutsContainer.style.display = 'none';
      return;
    }
    els.shortcutsContainer.style.display = 'block';
    els.shortcutsGrid.innerHTML = '';

    appState.shortcuts.forEach((sc, idx) => {
      const card = document.createElement('div');
      card.className = 'shortcut-card';

      const delBtn = document.createElement('button');
      delBtn.className = 'shortcut-del-btn';
      delBtn.innerHTML = '✕';
      delBtn.title = 'Sil';
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteShortcut(idx);
      };

      const iconBox = document.createElement('div');
      iconBox.className = 'shortcut-icon-box';

      let domain = '';
      try {
        const fullUrl = (sc.url.startsWith('http://') || sc.url.startsWith('https://')) ? sc.url : 'https://' + sc.url;
        domain = new URL(fullUrl).hostname;
      } catch (e) {
        domain = sc.url.replace(/^https?:\/\//, '').split('/')[0];
      }

      const img = document.createElement('img');
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      img.alt = sc.title || domain;
      img.onerror = () => {
        img.onerror = () => {
          iconBox.innerHTML = '';
          const fallback = document.createElement('span');
          fallback.className = 'shortcut-icon-fallback font-mono';
          fallback.textContent = (sc.title || domain || '★').charAt(0).toUpperCase();
          iconBox.appendChild(fallback);
        };
        img.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
      };
      iconBox.appendChild(img);

      const label = document.createElement('span');
      label.className = 'shortcut-label';
      label.textContent = sc.title || domain;

      card.appendChild(delBtn);
      card.appendChild(iconBox);
      card.appendChild(label);

      card.onclick = () => {
        const target = (sc.url.startsWith('http://') || sc.url.startsWith('https://')) ? sc.url : 'https://' + sc.url;
        window.location.href = target;
      };

      els.shortcutsGrid.appendChild(card);
    });

    const addCard = document.createElement('div');
    addCard.className = 'shortcut-add-card';
    addCard.innerHTML = `
      <div class="shortcut-add-icon">+</div>
      <span class="shortcut-label">${getI18n().addShortcut || 'Əlavə et'}</span>
    `;
    addCard.onclick = openShortcutModal;
    els.shortcutsGrid.appendChild(addCard);
  }

  function deleteShortcut(idx) {
    appState.shortcuts.splice(idx, 1);
    Storage.set('cosmic_shortcuts_v3', appState.shortcuts);
    renderShortcuts();
  }

  function openShortcutModal() {
    els.modalShortcutTitle.value = '';
    els.modalShortcutUrl.value = '';
    els.shortcutModal.classList.remove('hidden');
    els.modalShortcutTitle.focus();
  }

  function closeShortcutModal() {
    els.shortcutModal.classList.add('hidden');
  }

  function saveShortcut() {
    let title = els.modalShortcutTitle.value.trim();
    let url = els.modalShortcutUrl.value.trim();

    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (!title) {
      try {
        title = new URL(url).hostname.replace('www.', '');
      } catch (e) {
        title = url;
      }
    }

    appState.shortcuts.push({
      id: Date.now().toString(),
      title,
      url
    });

    Storage.set('cosmic_shortcuts_v3', appState.shortcuts);
    renderShortcuts();
    closeShortcutModal();
  }

  function updateSearchEngineUI(engineKey) {
    const eng = SEARCH_ENGINES[engineKey] || SEARCH_ENGINES.google;
    els.currentEngineIcon.textContent = eng.icon;
    els.currentEngineName.textContent = eng.name;
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const query = els.searchInput.value.trim();
    if (!query) return;

    const isUrl = /^https?:\/\//i.test(query) || /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i.test(query);
    if (isUrl) {
      const url = query.startsWith('http') ? query : 'https://' + query;
      window.location.href = url;
      return;
    }

    const eng = SEARCH_ENGINES[appState.settings.searchEngine] || SEARCH_ENGINES.google;
    window.location.href = eng.queryUrl + encodeURIComponent(query);
  }

  function toggleZenMode(forceState) {
    appState.isZenMode = forceState !== undefined ? forceState : !appState.isZenMode;

    if (appState.isZenMode) {
      els.topBar.style.display = 'none';
      els.bottomBar.style.display = 'none';
      els.shortcutsContainer.style.display = 'none';
      els.quoteContainer.style.display = 'none';
      els.zenExitBar.style.display = 'block';
    } else {
      els.topBar.style.display = 'flex';
      els.bottomBar.style.display = 'flex';
      if (appState.settings.showShortcuts) els.shortcutsContainer.style.display = 'block';
      if (appState.settings.showQuotes) els.quoteContainer.style.display = 'block';
      els.zenExitBar.style.display = 'none';
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  function renderTodos() {
    els.todoList.innerHTML = '';
    const pendingCount = appState.todos.filter(t => !t.completed).length;

    if (pendingCount > 0) {
      els.todoBadge.style.display = 'flex';
      els.todoBadge.textContent = pendingCount;
    } else {
      els.todoBadge.style.display = 'none';
    }

    if (appState.todos.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'font-mono';
      empty.style.fontSize = '0.75rem';
      empty.style.color = 'var(--text-muted)';
      empty.style.padding = '1.5rem 0';
      empty.style.textAlign = 'center';
      empty.textContent = getI18n().emptyTodos || 'Heç bir hədəf yoxdur.';
      els.todoList.appendChild(empty);
      return;
    }

    appState.todos.forEach((todo, idx) => {
      const item = document.createElement('div');
      item.className = `todo-item ${todo.completed ? 'completed' : ''}`;

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'todo-checkbox';
      cb.checked = !!todo.completed;
      cb.onchange = () => {
        appState.todos[idx].completed = cb.checked;
        Storage.set('cosmic_todos_v3', appState.todos);
        renderTodos();
      };

      const txt = document.createElement('span');
      txt.className = 'todo-text';
      txt.textContent = todo.text;

      const del = document.createElement('button');
      del.className = 'todo-delete-btn';
      del.innerHTML = '✕';
      del.title = 'Sil';
      del.onclick = () => {
        appState.todos.splice(idx, 1);
        Storage.set('cosmic_todos_v3', appState.todos);
        renderTodos();
      };

      item.appendChild(cb);
      item.appendChild(txt);
      item.appendChild(del);
      els.todoList.appendChild(item);
    });
  }

  function addTodo() {
    const text = els.newTodoInput.value.trim();
    if (!text) return;
    appState.todos.push({
      id: Date.now().toString(),
      text,
      completed: false
    });
    els.newTodoInput.value = '';
    Storage.set('cosmic_todos_v3', appState.todos);
    renderTodos();
  }

  let currentQuoteIndex = 0;
  function cycleQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
    const q = QUOTES[currentQuoteIndex];
    els.quoteText.textContent = `"${q.text}"`;
    els.quoteAuthor.textContent = `— ${q.author}`;
  }

  function renderCountryDropdown() {
    els.countryDropdownMenu.innerHTML = '';
    const active = COUNTRIES[selectedCountryTemp] || getActiveCountry();

    els.countryCurrentFlag.textContent = active.flag;
    els.countryCurrentName.textContent = active.name;
    els.countryCurrentUtc.textContent = active.utcOffset;

    Object.values(COUNTRIES).forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'country-option';
      btn.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.1rem;">${c.flag}</span>
          <span style="font-weight: 500;">${c.name}</span>
        </div>
        <span class="font-mono telemetry-badge" style="font-size: 0.65rem;">${c.utcOffset}</span>
      `;
      btn.onclick = () => {
        selectedCountryTemp = c.code;
        renderCountryDropdown();
        els.countryDropdownMenu.style.display = 'none';
        els.countryChevron.style.transform = 'rotate(0deg)';
        els.settingCityName.value = c.defaultCity;
        els.countryTimezoneHint.textContent = `Saat qurşağı: ${c.timezone} (${c.utcOffset})`;
      };
      els.countryDropdownMenu.appendChild(btn);
    });
  }

  function openSettings() {
    selectedCountryTemp = appState.settings.country;
    renderCountryDropdown();
    els.countryDropdownMenu.style.display = 'none';
    els.countryChevron.style.transform = 'rotate(0deg)';

    els.settingCityName.value = appState.settings.cityName;
    const country = getActiveCountry();
    els.countryTimezoneHint.textContent = `Saat qurşağı: ${formatTimezoneLabel(country, appState.settings.cityName)}`;

    els.bgUrlInput.value = (appState.settings.customBgUrl || '') === 'none' ? '' : (appState.settings.customBgUrl || '');
    const dim = appState.settings.customBgDim !== undefined ? appState.settings.customBgDim : 40;
    els.bgDimmerSlider.value = dim;
    els.bgDimmerVal.textContent = `${dim}%`;

    const spd = appState.settings.orbitSpeed !== undefined ? appState.settings.orbitSpeed : 1;
    applyOrbitSpeed(spd);

    els.toggle24Hour.checked = appState.settings.is24Hour;
    els.toggleSeconds.checked = appState.settings.showSeconds;
    els.toggleStarfield.checked = appState.settings.showStarfield;
    els.toggleWeather.checked = appState.settings.showWeather;
    els.toggleShortcuts.checked = appState.settings.showShortcuts;
    els.toggleQuotes.checked = appState.settings.showQuotes;

    applyTheme(appState.settings.theme);

    els.settingsModal.classList.remove('hidden');
  }

  function closeSettings() {
    els.countryDropdownMenu.style.display = 'none';
    els.countryChevron.style.transform = 'rotate(0deg)';
    els.settingsModal.classList.add('hidden');
  }

  function saveSettings() {
    const selectedCountry = selectedCountryTemp;
    const countryChanged = selectedCountry !== appState.settings.country;

    appState.settings.country = selectedCountry;

    if (countryChanged && (!els.settingCityName.value.trim() || els.settingCityName.value === COUNTRIES[appState.settings.country]?.defaultCity)) {
      appState.settings.cityName = COUNTRIES[selectedCountry]?.defaultCity || '';
    } else {
      appState.settings.cityName = els.settingCityName.value.trim() || COUNTRIES[selectedCountry]?.defaultCity || 'Bakı';
    }

    appState.settings.customBgUrl = els.bgUrlInput.value.trim();
    appState.settings.customBgDim = parseInt(els.bgDimmerSlider.value, 10);
    appState.settings.orbitSpeed = parseFloat(els.orbitSpeedSlider.value) || 1;

    appState.settings.is24Hour = els.toggle24Hour.checked;
    appState.settings.showSeconds = els.toggleSeconds.checked;
    appState.settings.showStarfield = els.toggleStarfield.checked;
    appState.settings.showWeather = els.toggleWeather.checked;
    appState.settings.showShortcuts = els.toggleShortcuts.checked;
    appState.settings.showQuotes = els.toggleQuotes.checked;

    els.quoteContainer.style.display = appState.settings.showQuotes ? 'block' : 'none';

    Storage.set('cosmic_settings_v3', appState.settings);

    applyCustomBackground();
    applyOrbitSpeed(appState.settings.orbitSpeed);
    applyLanguage();
    updateClock();
    fetchWeather();
    renderShortcuts();
    closeSettings();
  }

  function initEvents() {
    els.cosmicCore.addEventListener('click', () => {
      appState.settings.is24Hour = !appState.settings.is24Hour;
      Storage.set('cosmic_settings_v3', appState.settings);
      updateClock();
    });

    els.searchEngineBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      els.engineDropdown.classList.toggle('open');
    });

    document.querySelectorAll('.engine-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const eng = btn.dataset.engine;
        appState.settings.searchEngine = eng;
        Storage.set('cosmic_settings_v3', appState.settings);
        updateSearchEngineUI(eng);
        els.engineDropdown.classList.remove('open');
        els.searchInput.focus();
      });
    });

    els.searchForm.addEventListener('submit', handleSearchSubmit);

    els.weatherPill.addEventListener('click', () => {
      fetchWeather();
    });

    els.zenBtn.addEventListener('click', () => toggleZenMode());
    els.zenExitBtn.addEventListener('click', () => toggleZenMode(false));

    els.fullscreenBtn.addEventListener('click', toggleFullscreen);

    els.randomQuoteBtn.addEventListener('click', () => {
      els.quoteContainer.style.opacity = '0';
      setTimeout(() => {
        cycleQuote();
        els.quoteContainer.style.opacity = '1';
      }, 150);
    });

    els.todoToggleBtn.addEventListener('click', () => {
      els.todoDrawer.classList.toggle('open');
    });
    els.closeTodoDrawer.addEventListener('click', () => {
      els.todoDrawer.classList.remove('open');
    });
    els.addTodoBtn.addEventListener('click', addTodo);
    els.newTodoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addTodo();
    });

    let scratchDebounce;
    els.scratchpadArea.addEventListener('input', () => {
      const t = getI18n();
      els.noteSavedStatus.textContent = t.notesSaving || 'Saxlanılır...';
      clearTimeout(scratchDebounce);
      scratchDebounce = setTimeout(() => {
        appState.scratchpad = els.scratchpadArea.value;
        Storage.set('cosmic_scratchpad_v3', appState.scratchpad);
        els.noteSavedStatus.textContent = t.notesSaved || 'Yadda saxlanıldı ✓';
      }, 400);
    });

    els.settingsBtn.addEventListener('click', openSettings);
    els.closeSettingsModal.addEventListener('click', closeSettings);
    els.saveSettingsBtn.addEventListener('click', saveSettings);

    els.countryDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = els.countryDropdownMenu.style.display === 'none';
      els.countryDropdownMenu.style.display = isHidden ? 'flex' : 'none';
      els.countryChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    els.themeSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-pill-btn');
      if (btn && btn.dataset.theme) {
        appState.settings.theme = btn.dataset.theme;
        Storage.set('cosmic_settings_v3', appState.settings);
        applyTheme(btn.dataset.theme);
      }
    });

    els.bgFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (file.size > 8 * 1024 * 1024) {
        alert('Şəkil faylı çox böyükdür (maksimum 8MB). Zəhmət olmasa daha kiçik fayl və ya birbaşa URL seçin.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        const dataUrl = evt.target.result;
        els.bgUrlInput.value = dataUrl;
      };
      reader.readAsDataURL(file);
    });

    els.clearBgBtn.addEventListener('click', () => {
      els.bgUrlInput.value = '';
      appState.settings.customBgUrl = '';
      applyCustomBackground();
    });

    document.querySelectorAll('.preset-bg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bg = btn.dataset.bg;
        els.bgUrlInput.value = bg === 'none' ? '' : bg;
      });
    });

    els.bgDimmerSlider.addEventListener('input', () => {
      const val = els.bgDimmerSlider.value;
      els.bgDimmerVal.textContent = `${val}%`;
      document.documentElement.style.setProperty('--custom-bg-dim', (val / 100).toFixed(2));
    });

    els.orbitSpeedSlider.addEventListener('input', () => {
      const spd = parseFloat(els.orbitSpeedSlider.value) || 1;
      applyOrbitSpeed(spd);
    });

    els.addShortcutHeaderBtn.addEventListener('click', openShortcutModal);
    els.closeShortcutModal.addEventListener('click', closeShortcutModal);
    els.cancelShortcutModal.addEventListener('click', closeShortcutModal);
    els.saveShortcutModal.addEventListener('click', saveShortcut);

    window.addEventListener('keydown', (e) => {
      const isTyping = document.activeElement && (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.isContentEditable
      );

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        els.searchInput.focus();
        els.searchInput.select();
      }

      if ((e.key === 'f' || e.key === 'F') && !isTyping) {
        toggleZenMode();
      }

      if (e.key === 'Escape') {
        els.engineDropdown.classList.remove('open');
        els.shortcutModal.classList.add('hidden');
        els.settingsModal.classList.add('hidden');
        els.countryDropdownMenu.style.display = 'none';
        els.countryChevron.style.transform = 'rotate(0deg)';
        els.todoDrawer.classList.remove('open');
        if (appState.isZenMode) toggleZenMode(false);
      }
    });

    window.addEventListener('click', (e) => {
      if (!els.searchEngineBtn.contains(e.target) && !els.engineDropdown.contains(e.target)) {
        els.engineDropdown.classList.remove('open');
      }
      if (!els.countryDropdownBtn.contains(e.target) && !els.countryDropdownMenu.contains(e.target)) {
        els.countryDropdownMenu.style.display = 'none';
        els.countryChevron.style.transform = 'rotate(0deg)';
      }
    });

    window.addEventListener('online', updateClock);
    window.addEventListener('offline', updateClock);
  }

  async function init() {
    Starfield.init();
    await syncNetworkTime();

    const savedSettings = await Storage.get('cosmic_settings_v3', DEFAULT_SETTINGS);
    const savedShortcuts = await Storage.get('cosmic_shortcuts_v3', DEFAULT_SHORTCUTS);
    const savedTodos = await Storage.get('cosmic_todos_v3', []);
    const savedScratch = await Storage.get('cosmic_scratchpad_v3', '');

    appState.settings = { ...DEFAULT_SETTINGS, ...savedSettings };
    appState.shortcuts = Array.isArray(savedShortcuts) && savedShortcuts.length > 0 ? savedShortcuts : DEFAULT_SHORTCUTS;
    appState.todos = Array.isArray(savedTodos) ? savedTodos : [];
    appState.scratchpad = savedScratch || '';

    selectedCountryTemp = appState.settings.country;

    applyTheme(appState.settings.theme);
    applyCustomBackground();
    applyOrbitSpeed(appState.settings.orbitSpeed || 1);
    applyLanguage();
    updateSearchEngineUI(appState.settings.searchEngine);
    renderCountryDropdown();

    els.scratchpadArea.value = appState.scratchpad;
    els.quoteContainer.style.display = appState.settings.showQuotes ? 'block' : 'none';

    updateClock();
    setInterval(updateClock, 500);
    setInterval(syncNetworkTime, 600000);

    fetchWeather();

    renderShortcuts();
    renderTodos();

    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
