import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import Card from '../../components/Card';
import VentyButton from '../../components/VentyButton';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { AdSubscription, AdPlanId } from '../../types';

interface PlanDetails {
    id: AdPlanId;
    name: string;
    price: number;
    duration: number;
}

const SubscribeScreen: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { planDetails } = (location.state as { planDetails: PlanDetails }) || {};

    if (!planDetails) {
        // Redirect if no plan details are found
        React.useEffect(() => {
            navigate('/marketing', { replace: true });
        }, [navigate]);
        
        return (
            <PageLayout title="Subscribe">
                <div className="p-8 text-center">
                    <p>No subscription plan selected. Redirecting...</p>
                </div>
            </PageLayout>
        );
    }
    
    const handleConfirm = () => {
        // The original logic navigated to /payment. We will do the same here.
        // This makes the user's requested route exist, while preserving the payment flow.
        const now = new Date();
        const endDate = new Date(now.getTime() + planDetails.duration * 24 * 60 * 60 * 1000);
        
        const adSubscriptionDetails: AdSubscription = {
            planId: planDetails.id,
            name: planDetails.name,
            price: planDetails.price,
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            autoRenews: true,
        };
        
        navigate('/payment', { state: { 
            for: 'ad_subscription', 
            amount: planDetails.price, 
            description: `Venty Ad Subscription: ${planDetails.name}`,
            planDetails: adSubscriptionDetails 
        }});
    };

    return (
        <PageLayout title="Confirm Subscription">
            <div className="max-w-md mx-auto p-4 lg:p-6">
                <Card className="text-center">
                    <CheckCircleIcon className="h-16 w-16 text-feedback-success mx-auto mb-4" />
                    <h1 className="text-2xl font-bold font-serif">Confirm Your Plan</h1>
                    <p className="text-text-secondary mt-2">You are about to subscribe to the following plan:</p>
                    
                    <Card className="!p-4 my-6 text-left bg-bg-primary">
                        <h2 className="font-bold text-xl">{planDetails.name}</h2>
                        <p className="text-3xl font-bold text-brand-primary mt-2">${planDetails.price}
                            <span className="text-base font-normal text-text-secondary"> / {planDetails.duration} days</span>
                        </p>
                    </Card>

                    <VentyButton onClick={handleConfirm} variant="primary" className="w-full">
                        Proceed to Payment
                    </VentyButton>
                </Card>
            </div>
        </PageLayout>
    );
};

export default SubscribeScreen;