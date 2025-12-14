
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircleIcon, StarIcon, ChartPieIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import VentyButton from '../VentyButton';
import { AdPlanId } from '../../types';

interface AdPackageInfo {
    id: AdPlanId;
    icon: React.ElementType;
    isRecommended?: boolean;
    savePercent?: number;
    price: number;
    durationDays: number;
    nameKey: string;
    priceKey: string;
    durationKey: string;
    benefitsKey: string;
}

const packages: AdPackageInfo[] = [
    { id: 'basic', nameKey: 'monthlyBasic.name', priceKey: 'monthlyBasic.price', durationKey: 'monthlyBasic.duration', benefitsKey: 'monthlyBasic.benefits', icon: CalendarDaysIcon, price: 25, durationDays: 30 },
    { id: 'pro', nameKey: 'monthlyPremium.name', priceKey: 'monthlyPremium.price', durationKey: 'monthlyPremium.duration', benefitsKey: 'monthlyPremium.benefits', icon: StarIcon, isRecommended: true, price: 40, durationDays: 30 },
    { id: 'premium', nameKey: 'quarterlyPremium.name', priceKey: 'quarterlyPremium.price', durationKey: 'quarterlyPremium.duration', benefitsKey: 'quarterlyPremium.benefits', icon: ChartPieIcon, savePercent: 17, price: 100, durationDays: 90 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 260, damping: 20 },
  }),
};

const PackageCard: React.FC<{ pkg: AdPackageInfo; onSubscribe: () => void; }> = ({ pkg, onSubscribe }) => {
    const { t } = useTranslation();
    const benefits: string[] = t(`adPackages.packages.${pkg.benefitsKey}`, { returnObjects: true }) as string[];
    
    return (
        <div className={`relative border-2 rounded-[20px] shadow-lg flex flex-col transition-transform hover:scale-[1.03] overflow-hidden h-full ${pkg.isRecommended ? 'border-brand-primary' : 'border-border-primary'} bg-bg-secondary`}>
            {pkg.isRecommended && (
                <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">RECOMMENDED</div>
            )}
             <div className="p-8 flex-grow">
                <pkg.icon className={`h-10 w-10 mb-4 ${pkg.isRecommended ? 'text-brand-primary' : 'text-text-secondary'}`} />
                <h3 className="text-xl font-bold text-text-primary">{t(`adPackages.packages.${pkg.nameKey}`)}</h3>
                <p className="mt-2">
                    <span className="text-4xl font-bold text-text-primary">{t(`adPackages.packages.${pkg.priceKey}`)}</span>
                    <span className="text-text-secondary">{t(`adPackages.packages.${pkg.durationKey}`)}</span>
                </p>
                <ul className="mt-8 space-y-3 text-left text-text-primary">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <CheckCircleIcon className={`h-6 w-6 flex-shrink-0 mt-0.5 ${benefit.toLowerCase().startsWith('no ') ? 'text-text-tertiary' : 'text-feedback-success'}`} />
                            <span className={benefit.toLowerCase().startsWith('no ') ? 'text-text-tertiary' : 'text-text-secondary'}>{benefit.replace(/^(no|yes)\s/i, '')}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-6 mt-auto">
                 <VentyButton 
                    onClick={onSubscribe} 
                    variant={pkg.isRecommended ? 'primary' : 'secondary'}
                    className="w-full !rounded-lg !py-3"
                >
                    {t('adPackages.subscribe')}
                </VentyButton>
            </div>
        </div>
    );
};

const AdPackagesSection: React.FC<{ onSubscribe: (plan: any) => void }> = ({ onSubscribe }) => {
    const { t } = useTranslation();
    
    const handleSubscribeClick = (pkg: AdPackageInfo) => {
        onSubscribe({
            id: pkg.id,
            name: t(`adPackages.packages.${pkg.nameKey}`),
            price: pkg.price,
            duration: pkg.durationDays,
        });
    };

    return (
        <div className="bg-bg-primary p-4 sm:p-6 rounded-xl">
            <h2 className="text-3xl font-bold text-center text-text-primary">{t('adPackages.title')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {packages.map((pkg, i) => (
                    <motion.div key={pkg.id} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
                        <PackageCard pkg={pkg} onSubscribe={() => handleSubscribeClick(pkg)} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AdPackagesSection;