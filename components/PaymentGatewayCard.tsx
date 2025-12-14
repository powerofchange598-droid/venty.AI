import React from 'react';
import { PaymentGateway, UserPaymentMethod } from '../types';
import Card from './Card';

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            onChange(!enabled);
        }}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${enabled ? 'bg-brand-primary' : 'bg-ui-tertiary'}`}
    >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

interface PaymentGatewayCardProps {
    gateway: PaymentGateway;
    method: UserPaymentMethod | undefined;
    onToggle: (gatewayId: string, isEnabled: boolean) => void;
}

const PaymentGatewayCard: React.FC<PaymentGatewayCardProps> = ({ gateway, method, onToggle }) => {
    const isEnabled = method?.isEnabled || false;
    const isComingSoon = !!gateway.comingSoon;

    return (
        <Card className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                    <img src={gateway.logoUrl} alt={gateway.name} className="w-12 h-12 p-1 rounded-full bg-white object-contain border border-ui-border" loading="lazy" />
                    <div>
                        <p className="font-bold">{gateway.name}</p>
                        <p className="text-sm text-ui-secondary">{gateway.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {isComingSoon ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-bg-tertiary text-text-secondary">
                            Coming Soon
                        </span>
                    ) : (
                        <Toggle enabled={isEnabled} onChange={(enabled) => onToggle(gateway.id, enabled)} />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default PaymentGatewayCard;
