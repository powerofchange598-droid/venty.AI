

import React from 'react';
import VentyButton from '../../../components/VentyButton';
import Card from '../../../components/Card';
import { useToast } from '../../../hooks/useToast';
import { useTranslation } from 'react-i18next';

interface DomainEditorProps {
    onSave: () => void;
}

const DomainEditor: React.FC<DomainEditorProps> = ({ onSave }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const handleSave = () => {
        onSave();
        showToast('Domain settings saved!');
    };
    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
            <Card>
                <h3 className="text-xl font-bold font-serif mb-4">Custom Domain</h3>
                <p className="text-text-secondary text-sm">Connect your own domain to give your store a professional URL.</p>
                <div className="mt-4 p-8 bg-bg-secondary rounded-lg text-center text-text-secondary">
                    <p className="mb-2">UI for connecting and managing a custom domain would be here.</p>
                    <p className="text-xs">e.g., input field for domain name, DNS records instructions</p>
                </div>
            </Card>
            <div className="flex justify-end gap-2 mt-4">
                <VentyButton variant="secondary" onClick={() => showToast('Changes discarded.')} label="Discard"></VentyButton>
                <VentyButton variant="primary" onClick={handleSave} label="Save Settings"></VentyButton>
            </div>
        </div>
    );
};

export default DomainEditor;