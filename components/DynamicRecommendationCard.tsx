import React from 'react';
import { Recommendation, User } from '../types';
import Card from './Card';
import ProductCard from './ProductCard';
import { LightBulbIcon } from '@heroicons/react/24/solid';

interface DynamicRecommendationCardProps {
    recommendation: Recommendation;
    user: User;
}

const DynamicRecommendationCard: React.FC<DynamicRecommendationCardProps> = ({ recommendation, user }) => {
    return (
        <div className="animate-cinematic-enter">
            <div className="flex items-center space-x-2 mb-2">
                <LightBulbIcon className="h-6 w-6 text-yellow-500" />
                <h2 className="text-xl font-bold font-serif">A Tip Just For You</h2>
            </div>
            <Card className="!p-4 bg-brand-primary/10">
                <p className="font-semibold mb-3">{recommendation.reason}</p>
                <div className="max-w-xs mx-auto">
                    <ProductCard product={recommendation.product} user={user} />
                </div>
            </Card>
        </div>
    );
};

export default DynamicRecommendationCard;
