import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../types';
import Card from './Card';
import VentyButton from './VentyButton';
import { ShieldCheckIcon, DevicePhoneMobileIcon, XMarkIcon } from '@heroicons/react/24/solid';

// --- Mock OTP Service ---
// In a real app, these would be API calls.
const MOCK_OTP_STORAGE_KEY = 'mock_otp';
const sendSMSOTP = async (phoneNumber: string): Promise<string> => {
    return new Promise(resolve => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`--- Venty Mock SMS ---`);
        console.log(`To: ${phoneNumber}`);
        console.log(`Your verification code is: ${otp}`);
        console.log(`----------------------`);
        // Store it locally to be checked later
        localStorage.setItem(MOCK_OTP_STORAGE_KEY, otp);
        setTimeout(() => resolve(otp), 500); // Simulate network delay
    });
};

const verifyOTPCode = async (userInput: string): Promise<boolean> => {
    return new Promise(resolve => {
        const storedOtp = localStorage.getItem(MOCK_OTP_STORAGE_KEY);
        setTimeout(() => {
            if (storedOtp && storedOtp === userInput) {
                localStorage.removeItem(MOCK_OTP_STORAGE_KEY);
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500);
    });
};

interface TwoFactorAuthProps {
    user: User;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ user }) => {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleToggle = async () => {
        if (isEnabled) {
            // Instantly disable for this simulation
            setIsEnabled(false);
        } else {
            // Start the enabling process
            setIsLoading(true);
            await sendSMSOTP(user.contactInfo.phone);
            setIsLoading(false);
            setIsModalOpen(true);
        }
    };

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError(t('settings.twoFactorAuth.otpInvalid'));
            return;
        }
        setIsLoading(true);
        setError('');
        const isValid = await verifyOTPCode(otp);
        if (isValid) {
            setIsEnabled(true);
            setIsModalOpen(false);
            setOtp('');
            alert(t('settings.twoFactorAuth.enabledSuccess'));
        } else {
            setError(t('settings.twoFactorAuth.otpIncorrect'));
        }
        setIsLoading(false);
    };

    const closeModal = () => {
        if (isLoading) return;
        setIsModalOpen(false);
        setError('');
        setOtp('');
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">{t('settings.twoFactorAuth.title')}</p>
                    <div className={`text-sm flex items-center gap-1 ${isEnabled ? 'text-feedback-success' : 'text-text-secondary'}`}>
                        <span>{isEnabled ? t('settings.twoFactorAuth.enabled') : t('settings.twoFactorAuth.disabled')}</span>
                        {isEnabled && <ShieldCheckIcon className="h-4 w-4" />}
                    </div>
                </div>
                <button
                    onClick={handleToggle}
                    disabled={isLoading}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${isEnabled ? 'bg-feedback-success' : 'bg-bg-tertiary'}`}
                    aria-label="Toggle Two-Factor Authentication"
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex justify-center items-center p-4 z-50" onClick={closeModal}>
                    <Card className="w-full max-w-sm !bg-bg-primary shadow-lg !p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{t('settings.twoFactorAuth.modalTitle')}</h2>
                            <button onClick={closeModal}><XMarkIcon className="h-6 w-6" /></button>
                        </div>
                        <div className="text-center">
                            <DevicePhoneMobileIcon className="h-16 w-16 mx-auto text-brand-primary mb-4" />
                            <p className="text-sm text-text-secondary">{t('settings.twoFactorAuth.modalSubtitle', { phoneNumber: user.contactInfo.phone })}</p>
                            <input 
                                type="tel"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                maxLength={6}
                                placeholder="_ _ _ _ _ _"
                                className="w-full mt-4 p-3 text-center text-2xl tracking-[.5em] bg-bg-primary rounded-lg border border-border-primary"
                            />
                            {error && <p className="text-feedback-error text-sm text-center mt-2">{error}</p>}
                        </div>
                        <div className="mt-6">
                            <VentyButton onClick={handleVerify} disabled={isLoading || otp.length !== 6}>
                                {isLoading ? t('common.loading') : t('settings.twoFactorAuth.verifyCta')}
                            </VentyButton>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

export default TwoFactorAuth;