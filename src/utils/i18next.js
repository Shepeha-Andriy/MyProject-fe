import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  supportedLngs: ['en', 'ua'],
  fallbackLng: 'en',
  debug: true,
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n

// toggler for lang change
// import { useTranslation } from 'react-i18next';
// const { t, i18n } = useTranslation();
// const changeLanguage = (language) => {
//   i18n.changeLanguage(language);
// };
// {
//   <div>
//     <span onClick={() => changeLanguage('ua')}>ua</span>
//     <span>/</span>
//     <span onClick={() => changeLanguage('en')}>en</span>
//   </div>
// }