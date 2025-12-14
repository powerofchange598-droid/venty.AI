import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { ALL_GATEWAYS } from '../data/paymentGateways';
import Card from './Card';
import VentyButton from './VentyButton';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const PaymentForm: React.FC<{
    methodName: string;
    onClose: () => void;
    onSuccess: () => void;
}> = ({ methodName, onClose, onSuccess }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        console.log(`Processing payment for ${methodName} with card number ending in ${cardNumber.slice(-4)}`);
        onSuccess();
        alert('Payment successful!');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-3 bg-bg-primary rounded-lg border border-border-primary focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            <div className="flex space-x-4">
                <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-1/2 p-3 bg-bg-primary rounded-lg border border-border-primary" />
                <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-1/2 p-3 bg-bg-primary rounded-lg border border-border-primary" />
            </div>
            <VentyButton htmlType="submit" onClick={() => {}} label="Pay Now"></VentyButton>
        </form>
    );
};


const PremiumPaymentWallet: React.FC<{ user: User }> = ({ user }) => {
    const [selectedId, setSelectedId] = useState('stripe');
    const [showForm, setShowForm] = useState(false);

    const methods = useMemo(() => {
        return [...ALL_GATEWAYS].sort((a, b) => {
            if (user.countryCode === 'EG') {
                if (a.isLocal && !b.isLocal) return -1;
                if (!a.isLocal && b.isLocal) return 1;
            } else {
                if (a.isLocal && !b.isLocal) return 1;
                if (!a.isLocal && b.isLocal) return -1;
            }
            return 0;
        });
    }, [user.countryCode]);

    const selectedMethod = methods.find(m => m.id === selectedId);

    return (
        <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-serif text-text-primary">Payment Wallet</h2>

            <div className="space-y-3">
                {methods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => setSelectedId(method.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedId === method.id ? 'border-brand-primary bg-brand-primary/10' : 'border-border-primary hover:border-text-tertiary'}`}
                    >
                        <div className="flex items-center space-x-3">
                            <img src={method.logoUrl} alt={method.name} className="w-10 h-10 p-1 rounded-full bg-white object-contain" />
                            <div>
                                <p className="font-semibold text-text-primary">{method.name}</p>
                                <p className="text-sm text-text-secondary">{method.description}</p>
                            </div>
                        </div>
                        {selectedId === method.id && <CheckCircleIcon className="h-6 w-6 text-brand-primary" />}
                    </div>
                ))}
            </div>

            <VentyButton onClick={() => setShowForm(true)} disabled={!selectedMethod} label={`Continue with ${selectedMethod?.name || '...'}`}>
            </VentyButton>

            {/* Payment Form Modal */}
            {showForm && selectedMethod && (
                 <div className="fixed inset-0 bg-bg-primary/75 backdrop-blur-md flex justify-center items-center p-4 z-50" onClick={() => setShowForm(false)}>
                    <Card className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Enter Card Details</h2>
                            <button onClick={() => setShowForm(false)}><XMarkIcon className="h-6 w-6" /></button>
                        </div>
                        <PaymentForm 
                            methodName={selectedMethod.name} 
                            onClose={() => setShowForm(false)} 
                            onSuccess={() => { /* Handle success if needed */ }} 
                        />
                    </Card>
                </div>
            )}
        </Card>
    );
};

export default PremiumPaymentWallet;