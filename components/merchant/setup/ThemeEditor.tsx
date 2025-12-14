

import React, { useState } from 'react';
import { User, Theme, StoreConfig } from '../../../types';
import { themes } from '../../../data/merchantThemes';
import VentyButton from '../../../components/VentyButton';
import { useToast } from '../../../hooks/useToast';
import { useTranslation } from 'react-i18next';

interface ThemeEditorProps {
    user: User;
    currentConfig: StoreConfig;
    onSave: (newConfig: Partial<StoreConfig>) => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ user, currentConfig, onSave }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
        const currentPalette = JSON.stringify(currentConfig.branding.palette);
        return themes.find(t => JSON.stringify(t.config.branding.palette) === currentPalette)?.id || themes[0].id;
    });

    const handleSave = () => {
        const selectedTheme = themes.find(t => t.id === selectedThemeId);
        if (selectedTheme) {
            onSave(selectedTheme.config);
            showToast('Theme selection saved!');
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-text-secondary text-sm">Select a base theme. You can customize colors and fonts in the 'Branding' section.</p>
            <div className="theme-grid">
                {themes.map(theme => (
                    <div key={theme.id} onClick={() => setSelectedThemeId(theme.id)} className={`theme-card ${selectedThemeId === theme.id ? 'selected' : ''}`}>
                        <img src={theme.previewUrl} alt={theme.name} className="theme-preview" loading="lazy" />
                        <p className="theme-name">{t(`storeSetup.themes.${theme.id}`, { defaultValue: theme.name })}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-end pt-4">
                 <VentyButton variant="primary" onClick={handleSave} label="Apply Theme"></VentyButton>
            </div>
        </div>
    );
};

export default ThemeEditor;