import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VentyButton from './VentyButton';

const COOKIE_CONSENT_KEY = 'venty_cookie_consent';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (!consent) {
                setIsVisible(true);
            }
        } catch (e) {
            console.warn("Could not access localStorage for cookie consent.");
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        } catch (e) {
            console.warn("Could not save cookie consent to localStorage.");
        }
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 p-4 z-[150]"
                >
                    <div className="max-w-4xl mx-auto bg-bg-secondary/80 backdrop-blur-md p-4 rounded-lg shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-border-primary">
                        <p className="text-sm text-text-primary text-center sm:text-left">
                           We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                        </p>
                        <VentyButton 
                            onClick={handleAccept} 
                            variant="primary"
                            className="!w-full sm:!w-auto !py-2 !px-6 flex-shrink-0"
                        >
                            Got it
                        </VentyButton>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;