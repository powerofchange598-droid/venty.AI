import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../data/LangTop100';

const FONT_MAP: Record<string, string> = {
    ar: "'Cairo', sans-serif",
    ur: "'Cairo', sans-serif",
    fa: "'Cairo', sans-serif",
    // Add other language-font mappings here if needed
    default: "'Inter', sans-serif",
};

export const useLanguageFlip = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const langCode = i18n.language.split('-')[0];
    const langData = AVAILABLE_LANGUAGES.find(l => l.code === langCode);
    
    // Handle RTL/LTR
    if (langData?.rtl) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    document.documentElement.lang = langCode;

    // Handle Adaptive Typography
    const font = FONT_MAP[langCode] || FONT_MAP.default;
    const styleId = 'adaptive-font-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `body, .font-sans { font-family: ${font} !important; }`;

  }, [i18n.language]);
};
