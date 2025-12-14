import { useState, useEffect } from 'react';
import { TOP_100_COUNTRIES } from '../data/TOP_100_COUNTRIES';
import { OFFICIAL_COUNTRY } from '../data/officialData';

export const useDetectCountry = () => {
    const [detectedCode, setDetectedCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedCountry = localStorage.getItem('ventyCountry');
        if (savedCountry && TOP_100_COUNTRIES.some(c => c.code === savedCountry)) {
            setDetectedCode(savedCountry);
            setIsLoading(false);
            return;
        }

        const browserLang = navigator.language; // e.g., 'en-US', 'fr-FR', 'ar-EG'
        const langCode = browserLang.split('-')[1]?.toUpperCase();

        if (langCode && TOP_100_COUNTRIES.some(c => c.code === langCode)) {
            localStorage.setItem('ventyCountry', langCode);
            setDetectedCode(langCode);
        } else {
            localStorage.setItem('ventyCountry', OFFICIAL_COUNTRY.code);
            setDetectedCode(OFFICIAL_COUNTRY.code);
        }
        setIsLoading(false);
    }, []);

    return { detectedCode, isLoading };
};