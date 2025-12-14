
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { LockClosedIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface PremiumInvestmentGatewayProps {
    isPremiumUser: boolean;
}

const PremiumInvestmentGateway: React.FC<PremiumInvestmentGatewayProps> = ({ isPremiumUser }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // The GoalsScreen handles the logic for both premium and non-premium users,
        // showing investment options or an upgrade prompt.
        navigate('/goals');
    };

    if (isPremiumUser) {
        return (
            <Card 
                onClick={handleClick}
                className="bg-purple-500/10 border border-purple-500/20 animate-cinematic-enter cursor-pointer"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <SparklesIcon className="h-10 w-10 text-purple-500"/>
                        <div>
                            <h2 className="font-bold text-lg">Explore AI-Powered Investments</h2>
                            <p className="text-sm text-ui-secondary">You have premium access. View your goals and linked investments now.</p>
                        </div>
                    </div>
                    <ArrowRightIcon className="h-6 w-6 text-ui-secondary"/>
                </div>
            </Card>
        );
    }

    return (
        <Card 
            onClick={handleClick}
            className="bg-amber-500/10 border border-amber-500/20 animate-cinematic-enter cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <LockClosedIcon className="h-10 w-10 text-amber-500"/>
                    <div>
                        <h2 className="font-bold text-lg">Unlock AI Investment Advisor</h2>
                        <p className="text-sm text-ui-secondary">Upgrade to Venty Premium to get personalized investment advice.</p>
                    </div>
                </div>
                 <ArrowRightIcon className="h-6 w-6 text-ui-secondary"/>
            </div>
        </Card>
    );
};

export default PremiumInvestmentGateway;