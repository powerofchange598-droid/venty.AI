import React, { useState, useEffect } from 'react';
import { mockMerchant } from '../../data/mockData';
import Card from '../../components/Card';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/24/solid';

const NUDGE_DISMISS_KEY = 'nudgeDismissTimestamp';
const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

const SmartNudge: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [nudgeType, setNudgeType] = useState<'lowCount' | 'zeroCount' | null>(null);

    useEffect(() => {
        const lastDismissed = localStorage.getItem(NUDGE_DISMISS_KEY);
        const now = Date.now();

        if (lastDismissed && (now - parseInt(lastDismissed, 10)) < FOURTEEN_DAYS_MS) {
            return; // Don't show if dismissed recently
        }

        const productCount = mockMerchant.products.length;

        if (productCount === 0) {
            setNudgeType('zeroCount');
            setIsVisible(true);
        } else if (productCount < 5) {
            setNudgeType('lowCount');
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem(NUDGE_DISMISS_KEY, Date.now().toString());
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    const nudgeContent = {
        zeroCount: {
            title: "Add a new product today and get +15% visibility in search.",
            isCard: false,
        },
        lowCount: {
            title: "Complete 5 products to unlock the 'Top Store' badge.",
            isCard: true,
        },
    };

    const content = nudgeType ? nudgeContent[nudgeType] : null;

    if (!content) return null;

    if (content.isCard) {
        return (
            <Card className="bg-blue-50 relative">
                <button onClick={handleDismiss} className="absolute top-2 right-2 p-1">
                    <XMarkIcon className="h-4 w-4 text-ui-secondary" />
                </button>
                <div className="flex items-center space-x-3">
                    <LightBulbIcon className="h-6 w-6 text-blue-500" />
                    <p className="font-semibold text-blue-800">{content.title}</p>
                </div>
            </Card>
        );
    }

    // Snackbar-like nudge
    return (
        <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-md p-2 animate-fadeIn">
             <div className="bg-ui-primary text-white p-3 rounded-lg shadow-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm font-medium">{content.title}</p>
                </div>
                <button onClick={handleDismiss} className="p-1">
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default SmartNudge;