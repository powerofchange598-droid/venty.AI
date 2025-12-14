import React from 'react';
import { AVAILABLE_CURRENCIES } from '../data/currencyData';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface CurrencyPickerProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencyPicker: React.FC<CurrencyPickerProps> = ({ value, onChange }) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className="w-full appearance-none mt-1 p-3 bg-bg-secondary rounded-lg border border-bg-tertiary"
                aria-label="Select currency"
            >
                {AVAILABLE_CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                        {`${currency.symbol} - ${currency.nameEn} (${currency.code})`}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </div>
    );
};

export default CurrencyPicker;
