import React from 'react';
import { User } from '../types';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

interface VerifiedBadgeProps {
    user: User;
    className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ user, className = '' }) => {
    const isVerified = (user.accountType === 'merchant' && user.merchantProfile?.isVerified) || user.isVerified;

    if (!isVerified) {
        return null;
    }

    const title = user.accountType === 'merchant' ? 'Verified Merchant' : 'Verified User';

    return (
        <CheckBadgeIcon className={`h-5 w-5 text-text-secondary ${className}`} title={title} />
    );
};

export default VerifiedBadge;