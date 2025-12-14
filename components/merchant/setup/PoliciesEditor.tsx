

import React from 'react';
import VentyButton from '../../../components/VentyButton';
import Card from '../../../components/Card';
import { useToast } from '../../../hooks/useToast';
import { useTranslation } from 'react-i18next';

interface PoliciesEditorProps {
    onSave: () => void;
}

const PoliciesEditor: React.FC<PoliciesEditorProps> = ({ onSave }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const handleSave = () => {
        onSave();
        showToast('Store policies saved!');
    };
    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
            <Card>
                <h3 className="text-xl font-bold font-serif mb-4">Store Policies</h3>
                <p className="text-text-secondary text-sm">Add your Refund Policy, Privacy Policy, and Terms of Service. You can use our templates to get started.</p>
                 <div className="mt-4 p-8 bg-bg-secondary rounded-lg text-center text-text-secondary">
                    <p className="mb-2">Text editors for each policy page would be here.</p>
                    <p className="text-xs">e.g., Refund Policy, Privacy Policy, Shipping Policy, Terms of Service</p>
                </div>
            </Card>
            <div className="flex justify-end gap-2 mt-4">
                <VentyButton variant="secondary" onClick={() => showToast('Changes discarded.')} label="Discard"></VentyButton>
                <VentyButton variant="primary" onClick={handleSave} label="Save Policies"></VentyButton>
            </div>
        </div>
    );
};

export default PoliciesEditor;