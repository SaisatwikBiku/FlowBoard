export const LANGUAGES = {
  EN: "en",
  DE: "de",
};

const translations = {
  en: {
    pen: "Pen",
    eraser: "Eraser",
    sticky: "Sticky Note",
    addRectangle: "Add Rectangle",
    language: "Language",
    english: "English",
    german: "German",
  },
  de: {
    pen: "Stift",
    eraser: "Radiergummi",
    sticky: "Haftnotiz",
    addRectangle: "Rechteck hinzufügen",
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}