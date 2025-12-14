
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DailyTip } from '../types';
import Card from './Card';
import HorizontalScroller from './HorizontalScroller';
import { LightBulbIcon } from '@heroicons/react/24/solid';

interface DailyTipCardProps {
    tips: DailyTip[];
}

const DailyTipCard: React.FC<DailyTipCardProps> = memo(({ tips }) => {
    const { t } = useTranslation();
    if (!tips || tips.length === 0) {
        return null;
    }

    return (
        <Card className="!p-0">
            <div className="flex items-center space-x-2 p-4">
                <LightBulbIcon className="h-6 w-6 text-yellow-500" />
                <h2 className="text-xl font-bold font-serif">Daily Tips</h2>
            </div>
            <HorizontalScroller>
                <div className="flex space-x-4 px-4 pb-4">
                    {tips.map(tip => (
                        <div key={tip.id} className="w-72 flex-shrink-0 snap-start">
                            <Card className="h-full flex flex-col !bg-bg-primary/50 dark:!bg-bg-secondary/60">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-3xl">{tip.icon}</span>
                                    <h3 className="font-bold text-lg">{t(tip.titleKey)}</h3>
                                </div>
                                <p className="text-sm text-text-secondary flex-grow">
                                    {t(tip.bodyKey, tip.bodyValues)}
                                </p>
                            </Card>
                        </div>
                    ))}
                </div>
            </HorizontalScroller>
        </Card>
    );
});

export default DailyTipCard;