import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClockIcon, CalendarDaysIcon, StarIcon, ChartPieIcon } from '@heroicons/react/24/solid';
import Card from './Card';
import VentyButton from './VentyButton';

type PackageTier = 'weekly' | 'monthly' | 'quarterly';
type PackageName = 'weeklyBasic' | 'monthlyBasic' | 'monthlyPremium' | 'quarterlyPremium';

interface AdPackage {
    id: PackageName;
    tier: PackageTier;
    icon: React.ElementType;
    color: 'blue' | 'green' | 'purple' | 'amber';
    isRecommended?: boolean;
    savePercent?: number;
}

const packages: AdPackage[] = [
    { id: 'weeklyBasic', tier: 'weekly', icon: ClockIcon, color: 'blue' },
    { id: 'monthlyBasic', tier: 'monthly', icon: CalendarDaysIcon, color: 'green' },
    { id: 'monthlyPremium', tier: 'monthly', icon: StarIcon, color: 'purple', isRecommended: true },
    { id: 'quarterlyPremium', tier: 'quarterly', icon: ChartPieIcon, color: 'amber', savePercent: 15 },
];

const PackageCard: React.FC<{ pkg: AdPackage }> = ({ pkg }) => {
    const { t } = useTranslation();
    const benefits: string[] = t(`adPackages.packages.${pkg.id}.benefits`, { returnObjects: true }) as string[];
    
    const colorClasses = {
        blue: { border: 'border-blue-500', bg: 'bg-blue-500/5', text: 'text-blue-500' },
        green: { border: 'border-green-500', bg: 'bg-green-500/5', text: 'text-green-500' },
        purple: { border: 'border-purple-500', bg: 'bg-purple-500/5', text: 'text-purple-500' },
        amber: { border: 'border-amber-500', bg: 'bg-amber-500/5', text: 'text-amber-500' },
    };

    const currentColors = colorClasses[pkg.color];

    return (
        <div className={`relative flex-shrink-0 w-3/4 sm:w-[45%] lg:w-full border-2 rounded-xl shadow-md flex flex-col transition-transform hover:scale-[1.02] ${pkg.isRecommended ? currentColors.border : 'border-ui-border'}`}>
            {pkg.isRecommended && (
                <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t('adPackages.recommended')}</div>
            )}
            {pkg.savePercent && (
                 <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">{t('adPackages.save', { percent: pkg.savePercent })}</div>
            )}
            <div className={`p-6 rounded-t-lg flex-grow ${currentColors.bg}`}>
                <pkg.icon className={`h-10 w-10 mb-4 ${currentColors.text}`} />
                <h3 className="text-xl font-bold text-ui-primary">{t(`adPackages.packages.${pkg.id}.name`)}</h3>
                <p className="mt-2">
                    <span className="text-4xl font-bold text-ui-primary">{t(`adPackages.packages.${pkg.id}.price`)}</span>
                    <span className="text-ui-secondary">{t(`adPackages.packages.${pkg.id}.duration`)}</span>
                </p>
                <ul className="mt-6 space-y-3 text-left text-ui-primary">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                            <span className="flex-shrink-0">{benefit.includes('No ') ? '❌' : '✅'}</span>
                            <span>{benefit.replace('No ','')}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`p-4 rounded-b-lg ${currentColors.bg} border-t ${currentColors.border}`}>
                 <VentyButton onClick={() => alert(`Subscribing to ${t(`adPackages.packages.${pkg.id}.name`)}`)}>{t('adPackages.subscribeNow')}</VentyButton>
            </div>
        </div>
    );
};


const AdPackagesSection: React.FC = () => {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState<PackageTier>('monthly');

    const filteredPackages = useMemo(() => {
        return packages.filter(p => p.tier === activeFilter);
    }, [activeFilter]);
    
    const filters: { label: string, value: PackageTier }[] = [
        { label: t('adPackages.weekly'), value: 'weekly'},
        { label: t('adPackages.monthly'), value: 'monthly'},
        { label: t('adPackages.quarterly'), value: 'quarterly'}
    ];

    return (
        <Card>
            <h2 className="text-2xl font-bold font-serif text-center">{t('adPackages.title')}</h2>
            
            <div className="flex justify-center bg-ui-border rounded-lg p-1 my-4 max-w-sm mx-auto">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`w-1/3 py-2 rounded-md font-semibold transition-colors text-sm ${activeFilter === filter.value ? 'bg-ui-card text-brand-primary' : 'text-ui-secondary'}`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            
            <div className="flex space-x-4 lg:space-x-0 overflow-x-auto p-4 -m-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:p-0 lg:m-0">
                {filteredPackages.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
        </Card>
    );
};

export default AdPackagesSection;