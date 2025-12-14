import React from 'react';
import { Link } from 'react-router-dom';
import { MerchantAd } from '../types';

interface BannerAdProps {
    ad: MerchantAd;
}

const BannerAd: React.FC<BannerAdProps> = ({ ad }) => {
    if (!ad.content.imageUrl) return null;

    return (
        <div className="relative group animate-fadeIn">
            <Link to={ad.content.link}>
                <img 
                    src={ad.content.imageUrl} 
                    alt="Advertisement" 
                    className="w-full h-auto rounded-lg object-cover"
                />
            </Link>
            <div className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Ad
            </div>
        </div>
    );
};

export default BannerAd;