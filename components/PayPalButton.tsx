
import React, { useState } from 'react';
import VentyButton from './VentyButton';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';
import { CheckCircleIcon, ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface PayPalButtonProps {
    amount: number;
    description?: string;
    onSuccess: (details: any) => void;
    onError?: (error: any) => void;
}

const PayPalLogo = () => (
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337l.756-4.789h3.292c3.271 0 5.864-1.317 6.643-4.887.278-1.272.179-2.28-.423-3.07-.747-.98-2.126-1.53-4.227-1.53H6.18L4.01 21.337h3.066zM8.867 8.94h3.69c1.78 0 2.76.929 2.49 2.164-.22 1.01-.97 1.63-2.28 1.63H10.15l-.893 5.657H8.36L9.61 9.389a.63.63 0 01-.743-.449z" />
        <path d="M20.067 8.02c-.324-1.48-1.422-2.58-3.11-3.23.82-.47 1.43-1.22 1.65-2.23.47-2.16-.8-3.92-4.14-3.92H6.24a1 1 0 00-.99.84L2.01 19.82a1 1 0 00.99 1.16h4.52l.74-4.67h3.29c3.99 0 6.86-2.07 7.52-5.09.2-1.07.13-2.07-.22-2.92l1.22.72z" opacity="0.2"/>
    </svg>
);

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, description, onSuccess, onError }) => {
    const { theme } = useTheme();
    const { formatCurrency } = useLocalization();
    const [status, setStatus] = useState<'idle' | 'processing' | 'approving' | 'completed' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Theme-based colors as per requirements
    // Light Mode: Royal Blue (#4169E1)
    // Dark Mode: Light Gold (#FFD700)
    // Trader Mode: Red (Existing convention)
    const getButtonStyles = () => {
        if (theme === 'dark') return 'bg-[var(--brand-primary)] text-[var(--brand-on-primary)] hover:brightness-110';
        if (theme === 'trader') return 'bg-[#E53935] text-white hover:bg-[#C62828]';
        return 'bg-[var(--brand-primary)] text-[var(--brand-on-primary)] hover:brightness-110';
    };

    const handlePayment = async () => {
        setStatus('processing');

        try {
            const backendEnv: string = (import.meta as any).env?.VITE_PAYPAL_BACKEND_URL || '';
            const backend: string = window.location.protocol === 'https:' ? '' : backendEnv;
            let health: any = null;
            for (let i = 0; i < 2; i++) {
                try {
                    const resp = await fetch(`${backend}/api/health`);
                    const data = await resp.json().catch(() => ({}));
                    health = { ok: resp.ok, ...data };
                } catch {
                    health = { ok: false };
                }
                if (health?.ok) break;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            if (!health?.ok) throw new Error('gateway_unreachable');
            if (health?.hasCredentials === false) throw new Error('missing_paypal_credentials');
            const resp = await fetch(`${backend}/api/paypal/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, description }),
            });
            const data = await resp.json();
            if (!resp.ok || !data.ok || !data.approveLink) {
                const errText = typeof data.error === 'string' ? data.error : (data.error?.message || data.error?.name || 'create_order_failed');
                throw new Error(errText);
            }
            setStatus('approving');
            window.location.href = data.approveLink;

        } catch (err) {
            console.error(err);
            setStatus('error');
            const msg = (err as any)?.message;
            const friendly = msg === 'missing_paypal_credentials'
                ? 'Payment gateway is not configured. Please contact support.'
                : msg === 'gateway_unreachable'
                ? 'Cannot reach payment server. Check your connection and try again.'
                : msg === 'server_error'
                ? 'Server error occurred. Please try again later.'
                : (msg || 'Payment could not be processed.');
            setErrorMessage(friendly);
            if (onError) onError(err);
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {status === 'processing' || status === 'approving' ? (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-bg-secondary rounded-xl p-6 text-center border border-border-primary"
                    >
                        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-brand-primary mx-auto mb-4"></div>
                        <h3 className="font-bold text-lg mb-1">
                            {status === 'processing' ? 'Connecting to Secure Server...' : 'Redirecting to PayPal...'}
                        </h3>
                        <p className="text-sm text-text-secondary">Please do not close this window.</p>
                        <p className="text-xs text-text-tertiary mt-4 flex items-center justify-center gap-1">
                            <LockClosedIcon className="h-3 w-3" /> Encrypted Connection
                        </p>
                    </motion.div>
                ) : status === 'completed' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-feedback-success/10 rounded-xl p-6 text-center border border-feedback-success/20"
                    >
                        <CheckCircleIcon className="h-16 w-16 text-feedback-success mx-auto mb-3" />
                        <h3 className="font-bold text-xl text-text-primary">Payment Successful!</h3>
                        <p className="text-text-secondary mt-1">Transaction verified.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        <button
                            onClick={handlePayment}
                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${getButtonStyles()}`}
                        >
                            <span className="bg-white/20 p-1.5 rounded-full">
                                <PayPalLogo />
                            </span>
                            <span>Pay {formatCurrency(amount)} with PayPal</span>
                        </button>
                        
                        {status === 'error' && (
                            <div className="flex items-start gap-2 text-feedback-error bg-feedback-error/5 p-3 rounded-lg text-sm">
                                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">Payment Failed</p>
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                        )}
                        
                        <p className="text-center text-xs text-text-tertiary">
                            Securely processed by PayPal. Your financial details are never shared with the merchant.
                        </p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PayPalButton;
