
import { Lang } from '../types';

// Maps a country code (ISO 3166-1 alpha-2) to its primary language details.
export const COUNTRY_TO_LANG: Record<string, Lang> = {
  IN: { code: 'hi', nameAr: 'हिन्दी', nameEn: 'Hindi', rtl: false },
  CN: { code: 'zh', nameAr: '中文', nameEn: 'Chinese', rtl: false },
  US: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  ID: { code: 'id', nameAr: 'Bahasa Indonesia', nameEn: 'Indonesian', rtl: false },
  PK: { code: 'ur', nameAr: 'اردو', nameEn: 'Urdu', rtl: true },
  BR: { code: 'pt', nameAr: 'Português', nameEn: 'Portuguese', rtl: false },
  NG: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  BD: { code: 'bn', nameAr: 'বাংলা', nameEn: 'Bengali', rtl: false },
  RU: { code: 'ru', nameAr: 'Русский', nameEn: 'Russian', rtl: false },
  MX: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  JP: { code: 'ja', nameAr: '日本語', nameEn: 'Japanese', rtl: false },
  ET: { code: 'am', nameAr: 'አማርኛ', nameEn: 'Amharic', rtl: false },
  PH: { code: 'fil', nameAr: 'Filipino', nameEn: 'Filipino', rtl: false },
  EG: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  VN: { code: 'vi', nameAr: 'Tiếng Việt', nameEn: 'Vietnamese', rtl: false },
  DE: { code: 'de', nameAr: 'Deutsch', nameEn: 'German', rtl: false },
  TR: { code: 'tr', nameAr: 'Türkçe', nameEn: 'Turkish', rtl: false },
  IR: { code: 'fa', nameAr: 'فارسی', nameEn: 'Persian', rtl: true },
  TH: { code: 'th', nameAr: 'ไทย', nameEn: 'Thai', rtl: false },
  GB: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  FR: { code: 'fr', nameAr: 'Français', nameEn: 'French', rtl: false },
  IT: { code: 'it', nameAr: 'Italiano', nameEn: 'Italian', rtl: false },
  ZA: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  TZ: { code: 'sw', nameAr: 'Kiswahili', nameEn: 'Swahili', rtl: false },
  MM: { code: 'my', nameAr: 'မြန်မာဘာသာ', nameEn: 'Burmese', rtl: false },
  KE: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  KR: { code: 'ko', nameAr: '한국어', nameEn: 'Korean', rtl: false },
  CO: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  ES: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  UG: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  AR: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  DZ: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  SD: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  UA: { code: 'uk', nameAr: 'Українська', nameEn: 'Ukrainian', rtl: false },
  IQ: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  AF: { code: 'fa', nameAr: 'فارسی', nameEn: 'Persian', rtl: true },
  PL: { code: 'pl', nameAr: 'Polski', nameEn: 'Polish', rtl: false },
  CA: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  MA: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  SA: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
  PE: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  MY: { code: 'ms', nameAr: 'Bahasa Melayu', nameEn: 'Malay', rtl: false },
  NL: { code: 'nl', nameAr: 'Nederlands', nameEn: 'Dutch', rtl: false },
  AU: { code: 'en', nameAr: 'English', nameEn: 'English', rtl: false },
  CL: { code: 'es', nameAr: 'Español', nameEn: 'Spanish', rtl: false },
  BE: { code: 'fr', nameAr: 'Français', nameEn: 'French', rtl: false },
  GR: { code: 'el', nameAr: 'Ελληνικά', nameEn: 'Greek', rtl: false },
  PT: { code: 'pt', nameAr: 'Português', nameEn: 'Portuguese', rtl: false },
  SE: { code: 'sv', nameAr: 'Svenska', nameEn: 'Swedish', rtl: false },
  CH: { code: 'de', nameAr: 'Deutsch', nameEn: 'German', rtl: false },
  AT: { code: 'de', nameAr: 'Deutsch', nameEn: 'German', rtl: false },
  IL: { code: 'he', nameAr: 'עברית', nameEn: 'Hebrew', rtl: true },
  AE: { code: 'ar', nameAr: 'العربية', nameEn: 'Arabic', rtl: true },
};

// A unique list of all available languages derived from the map above.
export const AVAILABLE_LANGUAGES = Object.values(COUNTRY_TO_LANG).reduce((acc: Lang[], current) => {
  if (!acc.some(lang => lang.code === current.code)) {
    acc.push(current);
  }
  return acc;
}, []).sort((a, b) => a.nameEn.localeCompare(b.nameEn));
