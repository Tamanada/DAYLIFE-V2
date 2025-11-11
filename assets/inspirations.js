// assets/inspirations.js
// 🌞 365 messages inspirants pour DAYLIFE

const DaylifeInspirations = {
  quotes: {
    en: [
      "Every sunrise is a new beginning.",
      "Your time is limited — use it wisely.",
      "Small steps every day lead to great change.",
      "You are exactly where you need to be.",
      "Dream big, start small, act now.",
      "Happiness is a direction, not a place.",
      "The present moment is all you ever have.",
      "Shine, even if no one is watching.",
      "Consistency beats intensity.",
      "Life is not counted by years, but by moments.",
      // ... (on peut compléter les 365 ensuite)
    ],
    fr: [
      "Chaque lever de soleil est un nouveau départ.",
      "Ton temps est précieux — utilise-le sagement.",
      "Les petits pas mènent aux grands changements.",
      "Tu es exactement là où tu dois être.",
      "Rêve grand, commence petit, agis maintenant.",
      "Le bonheur est une direction, pas un lieu.",
      "Le moment présent est tout ce que tu as.",
      "Brille, même si personne ne regarde.",
      "La constance bat la force.",
      "La vie se mesure en instants, pas en années.",
    ],
  },

  getForToday(lang = "en") {
    const q = this.quotes[lang] || this.quotes["en"];
    const day = new Date().getDay();
    return q[day % q.length];
  },

  getRandom(lang = "en") {
    const q = this.quotes[lang] || this.quotes["en"];
    return q[Math.floor(Math.random() * q.length)];
  },
};
