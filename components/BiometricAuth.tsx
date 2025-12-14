import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FingerPrintIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const BiometricAuth: React.FC = () => {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState<'prompt' | 'success'>('prompt');

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isModalOpen && modalState === 'prompt') {
            // Simulate biometric scan
            timer = setTimeout(() => {
                setModalState('success');
            }, 1500);
        } else if (isModalOpen && modalState === 'success') {
            // Show success then close
            timer = setTimeout(() => {
                setIsModalOpen(false);
                setIsEnabled(true);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [isModalOpen, modalState]);

    const handleToggle = () => {
        if (isEnabled) {
            setIsEnabled(false);
        } else {
            setModalState('prompt');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        if (modalState !== 'prompt') return;
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium">{t('settings.security.biometricLogin')}</p>
                    <p className={`text-sm ${isEnabled ? 'text-feedback-success' : 'text-ui-secondary'}`}>
                        {isEnabled ? t('settings.security.biometricEnabled') : t('settings.security.biometricDisabled')}
                    </p>
                </div>
                <button
                    onClick={handleToggle}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors flex-shrink-0 ${isEnabled ? 'bg-brand-primary' : 'bg-ui-tertiary'}`}
                    aria-label="Toggle Biometric Login"
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 modal-backdrop backdrop-blur-md flex justify-center items-center p-4 z-50 animate-fadeIn" onClick={closeModal}>
                    <div className="bg-ui-background rounded-xl shadow-lg p-6 w-full max-w-xs text-center animate-cinematic-enter" onClick={e => e.stopPropagation()}>
                        {modalState === 'prompt' ? (
                            <>
                                <h3 className="font-bold text-lg">{t('settings.security.biometricPromptTitle')}</h3>
                                <p className="text-sm text-ui-secondary mt-1">{t('settings.security.biometricPromptSubtitle')}</p>
                                <FingerPrintIcon className="h-16 w-16 mx-auto text-brand-primary my-6 animate-pulse" />
                                <button onClick={closeModal} className="text-sm font-semibold text-brand-primary w-full py-2">
                                    {t('common.cancel')}
                                </button>
                            </>
                        ) : (
                            <div>
                                <CheckCircleIcon className="h-16 w-16 mx-auto text-feedback-success my-6" />
                                <p className="font-bold text-lg">{t('settings.security.biometricSuccess')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default BiometricAuth;