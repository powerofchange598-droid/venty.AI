

import React, { useState } from 'react';
import { StoreConfig, User } from '../../../types';
import EditorAccordion from './EditorAccordion';
import ThemeEditor from './ThemeEditor';
import BrandingEditor from './BrandingEditor';
import LayoutEditor from './LayoutEditor';
import SectionsEditor from './SectionsEditor';

interface StoreSetupFormProps {
    config: StoreConfig;
    onConfigChange: (newConfig: Partial<StoreConfig>) => void;
    user: User;
}

type OpenAccordion = 'theme' | 'branding' | 'layout' | 'sections' | null;

const StoreSetupForm: React.FC<StoreSetupFormProps> = ({ config, onConfigChange, user }) => {
    const [openAccordion, setOpenAccordion] = useState<OpenAccordion>('theme');

    const handleToggle = (accordion: OpenAccordion) => {
        setOpenAccordion(prev => (prev === accordion ? null : accordion));
    };

    return (
        <div className="space-y-4">
            <EditorAccordion title="Theme" isOpen={openAccordion === 'theme'} onToggle={() => handleToggle('theme')}>
                <ThemeEditor user={user} currentConfig={config} onSave={(newConfig) => onConfigChange(newConfig)} />
            </EditorAccordion>

            <EditorAccordion title="Branding" isOpen={openAccordion === 'branding'} onToggle={() => handleToggle('branding')}>
                <BrandingEditor currentConfig={config} onSave={(newConfig) => onConfigChange(newConfig)} />
            </EditorAccordion>

            <EditorAccordion title="Layout" isOpen={openAccordion === 'layout'} onToggle={() => handleToggle('layout')}>
                <LayoutEditor layout={config.layout} onLayoutChange={(key, value) => onConfigChange({ layout: { ...config.layout, [key]: value } })} />
            </EditorAccordion>

            <EditorAccordion title="Sections" isOpen={openAccordion === 'sections'} onToggle={() => handleToggle('sections')}>
                <SectionsEditor />
            </EditorAccordion>
        </div>
    );
};

export default StoreSetupForm;