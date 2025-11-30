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
    colorPicker: "Color picker",
    note: "Note",
  },
  de: {
    pen: "Stift",
    eraser: "Radiergummi",
    sticky: "Haftnotiz",
    addRectangle: "Rechteck hinzufügen",
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
    colorPicker: "Farbauswahl",
    note: "Notiz",
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}