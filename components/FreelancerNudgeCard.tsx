import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import VentyButton from './VentyButton';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface FreelancerNudgeCardProps {
    text: string;
}

const FreelancerNudgeCard: React.FC<FreelancerNudgeCardProps> = ({ text }) => {
    const navigate = useNavigate();

    return (
        <Card className="bg-brand-primary/10 animate-cinematic-enter" style={{ animationDelay: '500ms' }}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <SparklesIcon className="h-10 w-10 text-brand-primary flex-shrink-0" />
                <div className="flex-grow">
                    <h3 className="text-xl font-bold font-serif">AI Smart Suggestion</h3>
                    <p className="text-text-secondary mt-1">{text}</p>
                </div>
                <VentyButton onClick={() => navigate('/settings')} className="!w-auto !py-2 !px-4 !text-sm mt-2 sm:mt-0 flex-shrink-0">
                    Unlock Freelancer Mode
                </VentyButton>
            </div>
        </Card>
    );
};

export default FreelancerNudgeCard;
