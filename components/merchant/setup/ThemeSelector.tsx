import React from 'react';
import { Theme } from '../../../types';
import { themes } from '../../../data/merchantThemes';

interface ThemeSelectorProps {
    selectedThemeId: string;
    onSelectTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedThemeId, onSelectTheme }) => {
    return (
        <div className="theme-grid">
            {themes.map(theme => (
                <div
                    key={theme.id}
                    onClick={() => onSelectTheme(theme)}
                    className={`theme-card ${selectedThemeId === theme.id ? 'selected' : ''}`}
                >
                    <img src={theme.previewUrl} alt={theme.name} className="theme-preview" loading="lazy" />
                    <p className="theme-name">{theme.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ThemeSelector;