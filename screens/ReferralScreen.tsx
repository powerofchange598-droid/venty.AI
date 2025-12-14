
import React, { useState } from 'react';
import { User, Referral } from '../types';
import { mockReferrals } from '../data/mockData';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { useLocalization } from '../hooks/useLocalization';
import { ShareIcon, DocumentDuplicateIcon, UserPlusIcon, GiftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { safeFormatDate } from '../utils/dateUtils';

interface ReferralScreenProps {
    user: User;
}

const ReferralScreen: React.FC<ReferralScreenProps> = ({ user }) => {
    const { formatCurrency } = useLocalization();
    const [copied, setCopied] = useState(false);
    
    // Fallback if referral code is missing
    const referralCode = user.referralCode || `VENTY-${user.id.substring(0, 4).toUpperCase()}`;
    const referralLink = `https://venty.app/join/${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join me on Venty!',
                    text: `Use my code ${referralCode} to sign up and get rewards!`,
                    url: referralLink,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            handleCopy();
            alert('Link copied to clipboard!');
        }
    };

    const totalEarned = mockReferrals
        .filter(r => r.status === 'Completed')
        .reduce((sum, r) => sum + r.rewardAmount, 0);

    return (
        <PageLayout title="Referral Program">
            <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
                
                {/* Header Card */}
                <Card className="text-center !p-8 bg-brand-primary/5 border border-brand-primary/20">
                    <GiftIcon className="h-16 w-16 mx-auto text-brand-primary mb-4" />
                    <h2 className="text-2xl font-bold font-serif text-text-primary">Invite Friends, Earn Rewards</h2>
                    <p className="text-text-secondary mt-2">
                        Share your unique code. When your friends sign up and verify their account, you both get <span className="font-bold text-brand-primary">$10</span> credit!
                    </p>
                    
                    <div className="mt-6 bg-bg-primary rounded-xl border-2 border-dashed border-border-primary p-4 flex items-center justify-between">
                        <span className="font-mono text-xl font-bold tracking-wider text-text-primary">{referralCode}</span>
                        <button 
                            onClick={handleCopy} 
                            className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors text-brand-primary"
                            title="Copy Code"
                        >
                            {copied ? <CheckCircleIcon className="h-6 w-6"/> : <DocumentDuplicateIcon className="h-6 w-6"/>}
                        </button>
                    </div>

                    <div className="mt-6">
                        <VentyButton onClick={handleShare} className="w-full flex items-center justify-center gap-2">
                            <ShareIcon className="h-5 w-5" />
                            <span>Share Referral Link</span>
                        </VentyButton>
                    </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="text-center !p-4">
                        <UserPlusIcon className="h-8 w-8 mx-auto text-blue-500 mb-1" />
                        <p className="text-2xl font-bold">{mockReferrals.length}</p>
                        <p className="text-xs text-text-secondary uppercase tracking-wide">Friends Invited</p>
                    </Card>
                    <Card className="text-center !p-4">
                        <GiftIcon className="h-8 w-8 mx-auto text-green-500 mb-1" />
                        <p className="text-2xl font-bold text-feedback-success">{formatCurrency(totalEarned)}</p>
                        <p className="text-xs text-text-secondary uppercase tracking-wide">Total Earned</p>
                    </Card>
                </div>

                {/* History List */}
                <div>
                    <h3 className="text-lg font-bold font-serif mb-3 px-1">Referral History</h3>
                    <div className="space-y-3">
                        {mockReferrals.length > 0 ? (
                            mockReferrals.map(ref => (
                                <Card key={ref.id} className="!p-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm">{ref.refereeName}</p>
                                        <p className="text-xs text-text-secondary">{safeFormatDate(ref.date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${ref.status === 'Completed' ? 'bg-feedback-success/10 text-feedback-success' : 'bg-feedback-warning/10 text-feedback-warning'}`}>
                                            {ref.status}
                                        </span>
                                        {ref.status === 'Completed' && (
                                            <p className="text-xs font-bold text-feedback-success mt-1">+{formatCurrency(ref.rewardAmount)}</p>
                                        )}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center text-text-secondary py-8">No referrals yet. Start inviting!</p>
                        )}
                    </div>
                </div>

            </div>
        </PageLayout>
    );
};

export default ReferralScreen;
