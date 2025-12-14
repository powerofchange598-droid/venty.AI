import React from 'react';
import { TOP_100_COUNTRIES, CountryData } from '../data/TOP_100_COUNTRIES';

interface CountrySelectProps {
  value: CountryData | null;
  onChange: (newValue: CountryData | null) => void;
  className?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, className }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        const country = TOP_100_COUNTRIES.find(c => c.code === selectedCode) || null;
        onChange(country);
    };

  return (
    <select
        value={value?.code || ''}
        onChange={handleChange}
        className={className || "w-full mt-1 p-3 bg-ui-card rounded-lg border border-ui-border"}
    >
        <option value="" disabled>Select a country</option>
        {TOP_100_COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
                {c.flag} {c.en}
            </option>
        ))}
    </select>
  );
};

export default CountrySelect;