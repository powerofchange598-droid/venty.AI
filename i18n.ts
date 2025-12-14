import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const savedLng = typeof window !== 'undefined' ? (localStorage.getItem('ventyLang') || undefined) : undefined;

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLng || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

const rtlLangs = new Set(['ar', 'he', 'fa', 'ur']);

i18n.on('languageChanged', (lng) => {
  const base = lng.split('-')[0];
  const isRtl = rtlLangs.has(base);
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', base);
    try { localStorage.setItem('ventyLang', lng); } catch {}
  }
});

export default i18n;
