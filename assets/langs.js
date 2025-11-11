// assets/lang.js
// 🌍 Système multilingue central DAYLIFE (12 langues)

// Langues supportées
const DAYLIFE_LANGS = [
  "en", "fr", "es", "de", "it", "pt", "th", "my", "zh", "ru", "hi", "ar"
];

// Dictionnaire de traductions
const translations = {
  en: {
    langName: "English",
    dir: "ltr",
    nav: { home: "Home", dreams: "Dreams", team: "Team", profile: "Profile" },
    home: {
      title: "How many days did you arrive on Earth?",
      lived: "Days lived",
      remaining: "Days remaining",
      stars: "Total Stars",
      estimatedEnd: "Estimated end of your 30,000 days:",
      newInspiration: "New inspiration",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Every day counts. What will you do with yours?",
      dobLabel: "Date of birth *",
      sexLabel: "Sex *",
      sexPlaceholder: "Select your sex",
      sexMale: "Male",
      sexFemale: "Female",
      countryLabel: "Country of birth *",
      countryPlaceholder: "Select your country",
      calcLabel: "Life calculation method",
      calc30000: "30,000 days (default)",
      calcReal: "Real (based on my profile)",
      startButton: "Start my journey",
      errorIncomplete: "Please fill in all required fields.",
      successSaved: "Profile saved. Welcome 🌕",
    },
  },

  fr: {
    langName: "Français",
    dir: "ltr",
    nav: { home: "Accueil", dreams: "Rêves", team: "Équipe", profile: "Profil" },
    home: {
      title: "Combien de jours êtes-vous sur Terre ?",
      lived: "Jours vécus",
      remaining: "Jours restants",
      stars: "Total d’étoiles",
      estimatedEnd: "Fin estimée de vos 30 000 jours :",
      newInspiration: "Nouvelle inspiration",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Chaque jour compte. Que ferez-vous du vôtre ?",
      dobLabel: "Date de naissance *",
      sexLabel: "Sexe *",
      sexPlaceholder: "Sélectionnez votre sexe",
      sexMale: "Homme",
      sexFemale: "Femme",
      countryLabel: "Pays de naissance *",
      countryPlaceholder: "Sélectionnez votre pays",
      calcLabel: "Méthode de calcul de vie",
      calc30000: "30 000 jours (par défaut)",
      calcReal: "Réel (selon mon profil)",
      startButton: "Commencer mon voyage",
      errorIncomplete: "Veuillez remplir tous les champs obligatoires.",
      successSaved: "Profil enregistré. Bienvenue 🌕",
    },
  },

  es: {
    langName: "Español",
    dir: "ltr",
    nav: { home: "Inicio", dreams: "Sueños", team: "Equipo", profile: "Perfil" },
    home: {
      title: "¿Cuántos días llevas en la Tierra?",
      lived: "Días vividos",
      remaining: "Días restantes",
      stars: "Estrellas totales",
      estimatedEnd: "Fin estimado de tus 30.000 días:",
      newInspiration: "Nueva inspiración",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Cada día cuenta. ¿Qué harás con el tuyo?",
      dobLabel: "Fecha de nacimiento *",
      sexLabel: "Sexo *",
      sexPlaceholder: "Selecciona tu sexo",
      sexMale: "Hombre",
      sexFemale: "Mujer",
      countryLabel: "País de nacimiento *",
      countryPlaceholder: "Selecciona tu país",
      calcLabel: "Método de cálculo de vida",
      calc30000: "30 000 días (por defecto)",
      calcReal: "Real (según mi perfil)",
      startButton: "Empezar mi viaje",
      errorIncomplete: "Por favor, completa todos los campos obligatorios.",
      successSaved: "Perfil guardado. Bienvenido 🌕",
    },
  },

  de: {
    langName: "Deutsch",
    dir: "ltr",
    nav: { home: "Startseite", dreams: "Träume", team: "Team", profile: "Profil" },
    home: {
      title: "Wie viele Tage bist du schon auf der Erde?",
      lived: "Ge lebte Tage",
      remaining: "Verbleibende Tage",
      stars: "Gesamtsterne",
      estimatedEnd: "Geschätztes Ende deiner 30.000 Tage:",
      newInspiration: "Neue Inspiration",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Jeder Tag zählt. Was machst du aus deinem?",
      dobLabel: "Geburtsdatum *",
      sexLabel: "Geschlecht *",
      sexPlaceholder: "Geschlecht wählen",
      sexMale: "Mann",
      sexFemale: "Frau",
      countryLabel: "Geburtsland *",
      countryPlaceholder: "Land wählen",
      calcLabel: "Lebensberechnung",
      calc30000: "30.000 Tage (Standard)",
      calcReal: "Real (basierend auf meinem Profil)",
      startButton: "Meine Reise starten",
      errorIncomplete: "Bitte fülle alle Pflichtfelder aus.",
      successSaved: "Profil gespeichert. Willkommen 🌕",
    },
  },

  it: {
    langName: "Italiano",
    dir: "ltr",
    nav: { home: "Home", dreams: "Sogni", team: "Squadra", profile: "Profilo" },
    home: {
      title: "Quanti giorni sei sulla Terra?",
      lived: "Giorni vissuti",
      remaining: "Giorni rimanenti",
      stars: "Stelle totali",
      estimatedEnd: "Fine stimata dei tuoi 30.000 giorni:",
      newInspiration: "Nuova ispirazione",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Ogni giorno conta. Cosa farai del tuo?",
      dobLabel: "Data di nascita *",
      sexLabel: "Sesso *",
      sexPlaceholder: "Seleziona il tuo sesso",
      sexMale: "Uomo",
      sexFemale: "Donna",
      countryLabel: "Paese di nascita *",
      countryPlaceholder: "Seleziona il tuo paese",
      calcLabel: "Metodo di calcolo di vita",
      calc30000: "30.000 giorni (predefinito)",
      calcReal: "Reale (in base al mio profilo)",
      startButton: "Inizia il mio viaggio",
      errorIncomplete: "Compila tutti i campi obbligatori.",
      successSaved: "Profilo salvato. Benvenuto 🌕",
    },
  },

  pt: {
    langName: "Português",
    dir: "ltr",
    nav: { home: "Início", dreams: "Sonhos", team: "Equipe", profile: "Perfil" },
    home: {
      title: "Quantos dias você está na Terra?",
      lived: "Dias vividos",
      remaining: "Dias restantes",
      stars: "Total de estrelas",
      estimatedEnd: "Fim estimado dos seus 30.000 dias:",
      newInspiration: "Nova inspiração",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Cada dia conta. O que você fará com o seu?",
      dobLabel: "Data de nascimento *",
      sexLabel: "Sexo *",
      sexPlaceholder: "Selecione seu sexo",
      sexMale: "Homem",
      sexFemale: "Mulher",
      countryLabel: "País de nascimento *",
      countryPlaceholder: "Selecione seu país",
      calcLabel: "Método de cálculo de vida",
      calc30000: "30.000 dias (padrão)",
      calcReal: "Real (com base no meu perfil)",
      startButton: "Começar minha jornada",
      errorIncomplete: "Preencha todos os campos obrigatórios.",
      successSaved: "Perfil salvo. Bem-vindo 🌕",
    },
  },

  th: {
    langName: "ไทย",
    dir: "ltr",
    nav: { home: "หน้าแรก", dreams: "ความฝัน", team: "ทีม", profile: "โปรไฟล์" },
    home: {
      title: "คุณมาอยู่บนโลกนี้แล้วกี่วัน?",
      lived: "วันที่ใช้ชีวิตมาแล้ว",
      remaining: "วันที่เหลืออยู่",
      stars: "ดาวทั้งหมด",
      estimatedEnd: "จุดสิ้นสุดโดยประมาณของ 30,000 วัน:",
      newInspiration: "แรงบันดาลใจใหม่",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "ทุกวันมีความหมาย คุณจะทำอะไรกับวันของคุณ?",
      dobLabel: "วันเกิด *",
      sexLabel: "เพศ *",
      sexPlaceholder: "เลือกเพศของคุณ",
      sexMale: "ชาย",
      sexFemale: "หญิง",
      countryLabel: "ประเทศเกิด *",
      countryPlaceholder: "เลือกประเทศของคุณ",
      calcLabel: "วิธีคำนวณชีวิต",
      calc30000: "30,000 วัน (ค่าเริ่มต้น)",
      calcReal: "จริง (ตามโปรไฟล์ของฉัน)",
      startButton: "เริ่มการเดินทางของฉัน",
      errorIncomplete: "กรุณากรอกทุกช่องที่จำเป็น",
      successSaved: "บันทึกโปรไฟล์แล้ว ยินดีต้อนรับ 🌕",
    },
  },

  my: {
    langName: "မြန်မာ",
    dir: "ltr",
    nav: { home: "ပင်မ", dreams: "အိပ်မက်များ", team: "အသင်း", profile: "ပရိုဖိုင်း" },
    home: {
      title: "သင်မြေကမ္ဘာပေါ်ရောက်ထားတာ ဘယ်လောက်ရက်ရှိပြီလဲ?",
      lived: "နေထိုင်ပြီးရက်များ",
      remaining: "ကျန်ရှိသေးသောရက်များ",
      stars: "ကြယ်စုစုပေါင်း",
      estimatedEnd: "သင့် ၃၀,၀၀၀ ရက်၏ အဆုံးသတ် ခန့်မှန်းချက်:",
      newInspiration: "အွန်ုရင်းအသစ်",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "နေ့တိုင်းအရေးကြီးပါတယ်။ သင်ရဲ့နေ့တွေကို ဘယ်လိုအသုံးချမလဲ?",
      dobLabel: "မွေးနေ့ *",
      sexLabel: "လိင် *",
      sexPlaceholder: "သင့်လိင်ကို ရွေးပါ",
      sexMale: "အမျိုးသား",
      sexFemale: "အမျိုးသမီး",
      countryLabel: "မွေးရာနိုင်ငံ *",
      countryPlaceholder: "သင့်နိုင်ငံကို ရွေးပါ",
      calcLabel: "ဘဝတွက်ချက်ပုံ",
      calc30000: "၃၀,၀၀၀ ရက် (မူလ)",
      calcReal: "အမှန်တကယ် (ကိုယ်ရေးအချက်အလက်အလိုက်)",
      startButton: "နေလည်ခြင်းကို စတင်မည်",
      errorIncomplete: "လိုအပ်သော အကွက်အားလုံးကို ဖြည့်ပါ။",
      successSaved: "ကိုယ်ရေးအချက်အလက် သိမ်းဆည်းပြီး။ ကြိုဆိုပါတယ် 🌕",
    },
  },

  zh: {
    langName: "中文",
    dir: "ltr",
    nav: { home: "首页", dreams: "梦想", team: "团队", profile: "档案" },
    home: {
      title: "你已经在地球上生活了多少天？",
      lived: "已经度过的天数",
      remaining: "剩余天数",
      stars: "总星数",
      estimatedEnd: "你 30,000 天生命的预计终点：",
      newInspiration: "新的灵感",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "每一天都很重要。你会如何度过？",
      dobLabel: "出生日期 *",
      sexLabel: "性别 *",
      sexPlaceholder: "选择你的性别",
      sexMale: "男",
      sexFemale: "女",
      countryLabel: "出生国家 *",
      countryPlaceholder: "选择你的国家",
      calcLabel: "生命计算方式",
      calc30000: "30,000 天（默认）",
      calcReal: "真实（根据我的资料）",
      startButton: "开始旅程",
      errorIncomplete: "请填写所有必填字段。",
      successSaved: "资料已保存。欢迎 🌕",
    },
  },

  ru: {
    langName: "Русский",
    dir: "ltr",
    nav: { home: "Домой", dreams: "Мечты", team: "Команда", profile: "Профиль" },
    home: {
      title: "Сколько дней вы уже на Земле?",
      lived: "Прожитые дни",
      remaining: "Оставшиеся дни",
      stars: "Всего звёзд",
      estimatedEnd: "Предполагаемый конец ваших 30 000 дней:",
      newInspiration: "Новые вдохновение",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "Каждый день имеет значение. Что вы сделаете со своим?",
      dobLabel: "Дата рождения *",
      sexLabel: "Пол *",
      sexPlaceholder: "Выберите ваш пол",
      sexMale: "Мужчина",
      sexFemale: "Женщина",
      countryLabel: "Страна рождения *",
      countryPlaceholder: "Выберите вашу страну",
      calcLabel: "Метод расчёта жизни",
      calc30000: "30 000 дней (по умолчанию)",
      calcReal: "Реальный (по моему профилю)",
      startButton: "Начать путь",
      errorIncomplete: "Пожалуйста, заполните все обязательные поля.",
      successSaved: "Профиль сохранён. Добро пожаловать 🌕",
    },
  },

  hi: {
    langName: "हिन्दी",
    dir: "ltr",
    nav: { home: "होम", dreams: "सपने", team: "टीम", profile: "प्रोफ़ाइल" },
    home: {
      title: "आप पृथ्वी पर कितने दिन से हैं?",
      lived: "जीए हुए दिन",
      remaining: "शेष दिन",
      stars: "कुल सितारे",
      estimatedEnd: "आपके 30,000 दिनों का अनुमानित अंत:",
      newInspiration: "नई प्रेरणा",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "हर दिन मायने रखता है। आप अपने दिन का क्या करेंगे?",
      dobLabel: "जन्म तिथि *",
      sexLabel: "लिंग *",
      sexPlaceholder: "अपना लिंग चुनें",
      sexMale: "पुरुष",
      sexFemale: "महिला",
      countryLabel: "जन्म देश *",
      countryPlaceholder: "अपना देश चुनें",
      calcLabel: "जीवन गणना विधि",
      calc30000: "30,000 दिन (डिफ़ॉल्ट)",
      calcReal: "वास्तविक (मेरी प्रोफ़ाइल के अनुसार)",
      startButton: "मेरी यात्रा शुरू करें",
      errorIncomplete: "कृपया सभी आवश्यक फ़ील्ड भरें।",
      successSaved: "प्रोफ़ाइल सहेजी गई। स्वागत है 🌕",
    },
  },

  ar: {
    langName: "العربية",
    dir: "rtl",
    nav: { home: "الرئيسية", dreams: "الأحلام", team: "الفريق", profile: "الملف الشخصي" },
    home: {
      title: "كم عدد الأيام التي عشتها على الأرض؟",
      lived: "الأيام التي عشتها",
      remaining: "الأيام المتبقية",
      stars: "إجمالي النجوم",
      estimatedEnd: "النهاية المتوقعة لـ 30,000 يوم:",
      newInspiration: "إلهام جديد",
    },
    welcome: {
      title: "DAYLIFE",
      tagline: "كل يوم مهم. ماذا ستفعل بيومك؟",
      dobLabel: "تاريخ الميلاد *",
      sexLabel: "الجنس *",
      sexPlaceholder: "اختر جنسك",
      sexMale: "ذكر",
      sexFemale: "أنثى",
      countryLabel: "بلد الميلاد *",
      countryPlaceholder: "اختر بلدك",
      calcLabel: "طريقة حساب الحياة",
      calc30000: "30,000 يوم (افتراضي)",
      calcReal: "حقيقي (حسب ملفي الشخصي)",
      startButton: "ابدأ رحلتي",
      errorIncomplete: "يرجى ملء جميع الحقول المطلوبة.",
      successSaved: "تم حفظ الملف الشخصي. أهلاً بك 🌕",
    },
  },
};

// 🧠 Moteur i18n
window.DaylifeI18n = {
  getLang() {
    return localStorage.getItem("daylifeLang");
  },

  detectLang() {
    const navLang = (navigator.language || "en").slice(0, 2);
    return DAYLIFE_LANGS.includes(navLang) ? navLang : "en";
  },

  setLang(lang) {
    if (!DAYLIFE_LANGS.includes(lang)) lang = "en";
    localStorage.setItem("daylifeLang", lang);
    this.applyTranslations();
  },

  t(key) {
    const lang = this.getLang() || this.detectLang();
    const langData = translations[lang] || translations["en"];
    const parts = key.split(".");
    let value = langData;
    for (const p of parts) value = value?.[p];
    return value || key;
  },

  applyTranslations() {
    const lang = this.getLang() || this.detectLang();
    const langData = translations[lang] || translations["en"];

    // Lang + sens de lecture
    document.documentElement.lang = lang;
    document.documentElement.dir = langData.dir || "ltr";

    // Applique data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = this.t(key);
      if (text) el.textContent = text;
    });

    // Remplit le select de langue s'il existe
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
      langSelect.innerHTML = DAYLIFE_LANGS.map(
        (lng) =>
          `<option value="${lng}" ${
            lng === lang ? "selected" : ""
          }>${translations[lng]?.langName || lng.toUpperCase()}</option>`
      ).join("");

      langSelect.onchange = (e) => this.setLang(e.target.value);
    }
  },
};

// Lance à chaque chargement de page
document.addEventListener("DOMContentLoaded", () => {
  DaylifeI18n.applyTranslations();
});
