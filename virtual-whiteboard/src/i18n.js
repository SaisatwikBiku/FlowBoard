import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appTitle: 'Virtual Whiteboard',
      toolbar: {
        pen: 'Pen',
        eraser: 'Eraser',
        clear: 'Clear',
        color: 'Color',
        size: 'Size'
      },
      whiteboard: {
        placeholder: 'Start drawing...'
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
