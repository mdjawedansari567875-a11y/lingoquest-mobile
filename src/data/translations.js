export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export const UI_TEXT = {
  en: {
    login: "Log In", signup: "Sign Up", email: "Email", password: "Password",
    name: "Name", points: "Points", leaderboard: "Leaderboard",
    playGame: "Play Translation Game", profile: "Profile", badges: "Badges",
    correct: "Correct! +10 points", wrong: "Wrong, try again!",
    selectLanguage: "Select App Language", continue: "Continue",
  },
  hi: {
    login: "लॉग इन करें", signup: "साइन अप करें", email: "ईमेल", password: "पासवर्ड",
    name: "नाम", points: "पॉइंट्स", leaderboard: "लीडरबोर्ड",
    playGame: "अनुवाद गेम खेलें", profile: "प्रोफाइल", badges: "बैज",
    correct: "सही! +10 पॉइंट्स", wrong: "गलत, फिर से कोशिश करें!",
    selectLanguage: "ऐप की भाषा चुनें", continue: "आगे बढ़ें",
  },
  es: {
    login: "Iniciar sesión", signup: "Registrarse", email: "Correo", password: "Contraseña",
    name: "Nombre", points: "Puntos", leaderboard: "Clasificación",
    playGame: "Jugar juego de traducción", profile: "Perfil", badges: "Insignias",
    correct: "¡Correcto! +10 puntos", wrong: "Incorrecto, ¡inténtalo de nuevo!",
    selectLanguage: "Selecciona el idioma", continue: "Continuar",
  },
  fr: {
    login: "Connexion", signup: "S'inscrire", email: "E-mail", password: "Mot de passe",
    name: "Nom", points: "Points", leaderboard: "Classement",
    playGame: "Jouer au jeu de traduction", profile: "Profil", badges: "Badges",
    correct: "Correct ! +10 points", wrong: "Faux, réessayez !",
    selectLanguage: "Choisir la langue", continue: "Continuer",
  },
};

export const GAME_DATA = [
  { from: "hi", to: "en", word: "पानी", answer: "Water", options: ["Water", "Fire", "Air", "Earth"] },
  { from: "hi", to: "en", word: "किताब", answer: "Book", options: ["Book", "Pen", "Table", "Chair"] },
  { from: "hi", to: "en", word: "दोस्त", answer: "Friend", options: ["Enemy", "Friend", "Teacher", "Stranger"] },
  { from: "en", to: "hi", word: "Sun", answer: "सूरज", options: ["चाँद", "सूरज", "तारा", "बादल"] },
  { from: "en", to: "es", word: "House", answer: "Casa", options: ["Casa", "Perro", "Gato", "Agua"] },
  { from: "en", to: "fr", word: "Bread", answer: "Pain", options: ["Pain", "Eau", "Lait", "Fromage"] },
  { from: "es", to: "en", word: "Gato", answer: "Cat", options: ["Dog", "Cat", "Bird", "Fish"] },
];

export function getGameSession(count = 10) {
  const shuffled = [...GAME_DATA].sort(() => 0.5 - Math.random());
  const picked = [];
  for (let i = 0; i < count; i++) {
    picked.push(shuffled[i % shuffled.length]);
  }
  return picked;
}
