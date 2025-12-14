import React, { useState } from 'react';
import { User } from '../types';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { ALL_GATEWAYS } from '../data/paymentGateways';

const PaymentMethodsScreen: React.FC<{ user: User }> = ({ user }) => {
    const [connectedMethods, setConnectedMethods] = useState(new Set<string>());

    const handleConnect = (gatewayId: string) => {
        // In a real app, this would open an authentication flow. Here, we just toggle the state.
        setConnectedMethods(prev => new Set(prev).add(gatewayId));
    };

    return (
        <PageLayout title="Payment Methods">
            <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-8">
                <header className="text-center animate-cinematic-enter">
                    <h1 className="text-3xl font-bold font-serif">Manage Payment Methods</h1>
                    <p className="text-lg text-ui-secondary mt-1">Your information is secure</p>
                </header>

                <Card className="!p-4 bg-ui-background animate-cinematic-enter" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-start space-x-3">
                        <ShieldCheckIcon className="h-8 w-8 text-feedback-success flex-shrink-0" />
                        <div>
                            <p className="text-sm text-ui-secondary">
                                We use industry-standard encryption and tokenization to protect your payment details. All connections are handled securely.
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    {ALL_GATEWAYS.map((gateway, index) => {
                        const isConnected = connectedMethods.has(gateway.id);
                        const isComingSoon = !!gateway.comingSoon;
                        return (
                            <Card
                                key={gateway.id}
                                className="!p-4 shadow-sm hover:shadow-md transition-shadow animate-cinematic-enter"
                                style={{ animationDelay: `${200 + index * 50}ms` }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div className="mb-3 sm:mb-0">
                                        <p className="font-bold text-lg">{gateway.name}</p>
                                    </div>
                                    <div className="flex-shrink-0 sm:ml-4">
                                        {isComingSoon ? (
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-bg-tertiary text-text-secondary">
                                                Coming Soon
                                            </span>
                                        ) : isConnected ? (
                                            <div className="flex items-center space-x-1 text-sm font-semibold text-feedback-success">
                                                <CheckCircleIcon className="h-5 w-5" />
                                                <span>Connected</span>
                                            </div>
                                        ) : (
                                            <VentyButton
                                                onClick={() => handleConnect(gateway.id)}
                                                variant="secondary"
                                                className="!w-auto !py-2 !px-4 !text-sm transform hover:-translate-y-px active:scale-[0.98] shadow hover:shadow-md"
                                            >
                                                Connect Now
                                            </VentyButton>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </PageLayout>
    );
};

export default PaymentMethodsScreen;
