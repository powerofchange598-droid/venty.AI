import React, { useState, useRef, useEffect } from 'react';
import { AVAILABLE_LANGUAGES, COUNTRY_TO_LANG } from '../data/LangTop100';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { TOP_100_COUNTRIES } from '../data/TOP_100_COUNTRIES';

interface LanguageSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const getFlagForLang = (langCode: string): string | undefined => {
    const countryCode = Object.keys(COUNTRY_TO_LANG).find(key => COUNTRY_TO_LANG[key].code === langCode);
    if (countryCode) {
        return TOP_100_COUNTRIES.find(c => c.code === countryCode)?.flag;
    }
    return '🌍'; // Default globe
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange }) => {
    const selectedLang = AVAILABLE_LANGUAGES.find(l => l.code === value);

    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="w-full appearance-none mt-1 p-3 bg-bg-secondary rounded-lg border border-bg-tertiary"
                aria-label="Select language"
            >
                {AVAILABLE_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {getFlagForLang(lang.code)} {lang.nameEn}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
             {selectedLang && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-primary">
                    <span className="text-xl mr-2">{getFlagForLang(selectedLang.code)}</span>
                    <span className="font-semibold">{selectedLang.nameEn}</span>
                </div>
            )}
        </div>
    );
};

export default LanguageSelect;