
import { CurrencyInfo } from '../types';

export const COUNTRY_CURRENCY: Record<string, CurrencyInfo> = {
  // North America
  US: { code: 'USD', symbol: '$', nameEn: 'US Dollar' },
  CA: { code: 'CAD', symbol: 'C$', nameEn: 'Canadian Dollar' },
  MX: { code: 'MXN', symbol: '$', nameEn: 'Mexican Peso' },

  // Europe (Eurozone)
  DE: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  FR: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  IT: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  ES: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  NL: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  BE: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  AT: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  PT: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  IE: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  FI: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  GR: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  EE: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  LV: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  LT: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  SK: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  SI: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  CY: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  LU: { code: 'EUR', symbol: '€', nameEn: 'Euro' },
  MT: { code: 'EUR', symbol: '€', nameEn: 'Euro' },

  // Europe (Non-Eurozone)
  GB: { code: 'GBP', symbol: '£', nameEn: 'British Pound' },
  CH: { code: 'CHF', symbol: 'Fr', nameEn: 'Swiss Franc' },
  RU: { code: 'RUB', symbol: '₽', nameEn: 'Russian Ruble' },
  TR: { code: 'TRY', symbol: '₺', nameEn: 'Turkish Lira' },
  SE: { code: 'SEK', symbol: 'kr', nameEn: 'Swedish Krona' },
  NO: { code: 'NOK', symbol: 'kr', nameEn: 'Norwegian Krone' },
  DK: { code: 'DKK', symbol: 'kr', nameEn: 'Danish Krone' },
  PL: { code: 'PLN', symbol: 'zł', nameEn: 'Polish Złoty' },
  CZ: { code: 'CZK', symbol: 'Kč', nameEn: 'Czech Koruna' },
  HU: { code: 'HUF', symbol: 'Ft', nameEn: 'Hungarian Forint' },

  // Asia
  CN: { code: 'CNY', symbol: '¥', nameEn: 'Chinese Yuan' },
  JP: { code: 'JPY', symbol: '¥', nameEn: 'Japanese Yen' },
  IN: { code: 'INR', symbol: '₹', nameEn: 'Indian Rupee' },
  KR: { code: 'KRW', symbol: '₩', nameEn: 'South Korean Won' },
  ID: { code: 'IDR', symbol: 'Rp', nameEn: 'Indonesian Rupiah' },
  PK: { code: 'PKR', symbol: '₨', nameEn: 'Pakistani Rupee' },
  BD: { code: 'BDT', symbol: '৳', nameEn: 'Bangladeshi Taka' },
  PH: { code: 'PHP', symbol: '₱', nameEn: 'Philippine Peso' },
  VN: { code: 'VND', symbol: '₫', nameEn: 'Vietnamese Đồng' },
  TH: { code: 'THB', symbol: '฿', nameEn: 'Thai Baht' },
  MY: { code: 'MYR', symbol: 'RM', nameEn: 'Malaysian Ringgit' },
  SG: { code: 'SGD', symbol: 'S$', nameEn: 'Singapore Dollar' },

  // Middle East & North Africa
  EG: { code: 'EGP', symbol: 'ج.م', nameEn: 'Egyptian Pound' },
  SA: { code: 'SAR', symbol: 'ر.س', nameEn: 'Saudi Riyal' },
  AE: { code: 'AED', symbol: 'د.إ', nameEn: 'UAE Dirham' },
  QA: { code: 'QAR', symbol: 'ر.ق', nameEn: 'Qatari Riyal' },
  KW: { code: 'KWD', symbol: 'د.ك', nameEn: 'Kuwaiti Dinar' },
  BH: { code: 'BHD', symbol: '.د.ب', nameEn: 'Bahraini Dinar' },
  OM: { code: 'OMR', symbol: 'ر.ع.', nameEn: 'Omani Rial' },
  JO: { code: 'JOD', symbol: 'د.ا', nameEn: 'Jordanian Dinar' },
  MA: { code: 'MAD', symbol: 'د.م.', nameEn: 'Moroccan Dirham' },
  DZ: { code: 'DZD', symbol: 'د.ج', nameEn: 'Algerian Dinar' },

  // South America
  BR: { code: 'BRL', symbol: 'R$', nameEn: 'Brazilian Real' },
  AR: { code: 'ARS', symbol: '$', nameEn: 'Argentine Peso' },
  CO: { code: 'COP', symbol: '$', nameEn: 'Colombian Peso' },
  CL: { code: 'CLP', symbol: '$', nameEn: 'Chilean Peso' },

  // Oceania
  AU: { code: 'AUD', symbol: 'A$', nameEn: 'Australian Dollar' },
  NZ: { code: 'NZD', symbol: 'NZ$', nameEn: 'New Zealand Dollar' },

  // Africa
  NG: { code: 'NGN', symbol: '₦', nameEn: 'Nigerian Naira' },
  ZA: { code: 'ZAR', symbol: 'R', nameEn: 'South African Rand' },
  KE: { code: 'KES', symbol: 'KSh', nameEn: 'Kenyan Shilling' },
  GH: { code: 'GHS', symbol: 'GH₵', nameEn: 'Ghanaian Cedi' },
};

// Create a unique, sorted list of all available currencies.
export const AVAILABLE_CURRENCIES = Object.values(COUNTRY_CURRENCY).reduce((acc: CurrencyInfo[], current) => {
  if (!acc.some(currency => currency.code === current.code)) {
      acc.push(current);
  }
  return acc;
}, []).sort((a, b) => a.nameEn.localeCompare(b.nameEn));
