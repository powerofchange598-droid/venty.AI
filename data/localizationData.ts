export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  flag: string;
  currencyCode: string;
  defaultLanguage: string;
}

export const currencies: Currency[] = [
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£' },
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AED', name: 'United Arab Emirates Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
];

export const countries: Country[] = [
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', currencyCode: 'EGP', defaultLanguage: 'ar' },
  { name: 'United States', code: 'US', flag: '🇺🇸', currencyCode: 'USD', defaultLanguage: 'en' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', currencyCode: 'GBP', defaultLanguage: 'en' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', currencyCode: 'AED', defaultLanguage: 'ar' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', currencyCode: 'SAR', defaultLanguage: 'ar' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', currencyCode: 'EUR', defaultLanguage: 'de' },
  { name: 'France', code: 'FR', flag: '🇫🇷', currencyCode: 'EUR', defaultLanguage: 'fr' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', currencyCode: 'EUR', defaultLanguage: 'es' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', currencyCode: 'JPY', defaultLanguage: 'ja' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', currencyCode: 'CAD', defaultLanguage: 'en' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', currencyCode: 'AUD', defaultLanguage: 'en' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', currencyCode: 'BRL', defaultLanguage: 'pt' },
];