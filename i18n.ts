import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const savedLng = 'en';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

const rtlLangs = new Set([]);

i18n.on('languageChanged', (lng) => {
  const base = 'en';
  const isRtl = false;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', base);
    try { localStorage.setItem('ventyLang', 'en'); } catch {}
  }
});

export default i18n;
