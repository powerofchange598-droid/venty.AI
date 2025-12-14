import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import VentyButton from './VentyButton';
import { SparklesIcon } from '@heroicons/react/24/solid';

const UpgradeBanner: React.FC = () => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        navigate('/payment', { 
            state: { 
                for: 'premium_subscription', 
                amount: 22, 
                description: 'Venty Premium Subscription' 
            } 
        });
    };

    return (
        <Card className="!p-6 bg-bg-tertiary text-center">
            <SparklesIcon className="h-10 w-10 text-text-secondary mx-auto mb-2" />
            <h2 className="text-xl font-bold font-serif">Upgrade to Premium</h2>
            <p className="text-text-secondary mt-2 mb-4">Unlock your financial goals and AI-driven insights.</p>
            <VentyButton 
                onClick={handleUpgrade} 
                variant="primary" 
                className="!w-auto !py-2 !px-6 !text-lg" 
                label="Upgrade to Premium – $22/month"
            />
        </Card>
    );
};

export default UpgradeBanner;