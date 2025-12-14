

import React from 'react';
import VentyButton from '../../../components/VentyButton';
import Card from '../../../components/Card';
import { useToast } from '../../../hooks/useToast';
import { useTranslation } from 'react-i18next';

interface PaymentEditorProps {
    onSave: () => void;
}

const PaymentEditor: React.FC<PaymentEditorProps> = ({ onSave }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const handleSave = () => {
        onSave();
        showToast('Payment settings saved!');
    };
    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
            <Card>
                <h3 className="text-xl font-bold font-serif mb-4">Payment Providers</h3>
                <p className="text-text-secondary text-sm">Connect payment providers like Stripe and PayPal to start accepting payments securely.</p>
                <div className="mt-4 p-8 bg-bg-secondary rounded-lg text-center text-text-secondary">
                    <p className="mb-2">Payment Gateway Integration UI would be here.</p>
                    <p className="text-xs">e.g., options to connect Stripe, PayPal, local gateways</p>
                </div>
            </Card>
            <div className="flex justify-end gap-2 mt-4">
                <VentyButton variant="secondary" onClick={() => showToast('Changes discarded.')} label="Discard"></VentyButton>
                <VentyButton variant="primary" onClick={handleSave} label="Save Settings"></VentyButton>
            </div>
        </div>
    );
};

export default PaymentEditor;