import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LightBulbIcon } from '@heroicons/react/24/solid';
import { adviceTips } from '../data/adviceTips';

const GlobalAdviceBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState('');
    const thirtyMinutes = 30 * 60 * 1000;

    const showRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * adviceTips.length);
        setCurrentTip(adviceTips[randomIndex]);
        setIsVisible(true);
    };

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        const resetInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(showRandomTip, thirtyMinutes);
        };

        const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'click', 'scroll'];
        
        // Show on first load after a small delay
        const initialTimer = setTimeout(showRandomTip, 2000); 

        // Set interval for reappearance
        intervalId = setInterval(showRandomTip, thirtyMinutes);

        // Reset interval on user activity
        activityEvents.forEach(event => window.addEventListener(event, resetInterval));

        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalId);
            activityEvents.forEach(event => window.removeEventListener(event, resetInterval));
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 5000); // Auto-dismiss after 5 seconds

            return () => clearTimeout(hideTimer);
        }
    }, [isVisible]);

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4 h-0">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-full"
                    >
                        <div className="bg-ui-card rounded-lg shadow-lg p-3 flex items-center space-x-3 w-full border border-ui-border">
                            <LightBulbIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                            <p className="text-sm font-medium text-ui-primary">{currentTip}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GlobalAdviceBanner;