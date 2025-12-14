import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SavingsTip } from '../types';
import { mockProducts } from '../data/mockData';
import Card from './Card';
import VentyButton from './VentyButton';

interface SavingsTipCardProps {
    tip: SavingsTip;
}

const SavingsTipCard: React.FC<SavingsTipCardProps> = ({ tip }) => {
    const navigate = useNavigate();
    const product = tip.productId ? mockProducts.find(p => p.id === tip.productId) : null;

    const handleViewDeal = () => {
        if (product) {
            navigate(`/product/${product.id}`);
        } else {
            navigate('/market');
        }
    };

    return (
        <Card className="flex flex-col !bg-ui-background/50 dark:!bg-ui-card/60 !rounded-[18px] shadow-lg !p-0 h-full">
            <div className="flex-grow p-4">
                <p className="text-sm text-ui-secondary font-semibold">{tip.behavior}</p>
                <div className="flex items-center space-x-4 my-4">
                    {product && (
                        <img src={product.imageUrl} alt={product.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-grow">
                        <p className="font-bold text-ui-primary">{tip.suggestion}</p>
                        <p className="text-lg font-bold text-feedback-success mt-1">{tip.saving}</p>
                    </div>
                </div>
            </div>
            <div className="p-3 border-t border-ui-border mt-auto">
                <VentyButton onClick={handleViewDeal} className="!w-full !py-2 !text-sm">View Deal</VentyButton>
            </div>
        </Card>
    );
};

export default SavingsTipCard;