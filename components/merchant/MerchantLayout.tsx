import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../../types';

interface MerchantLayoutProps {
    user: User;
}

export const MerchantLayout: React.FC<MerchantLayoutProps> = ({ user }) => {
    // If the user's account type is merchant but they haven't created a profile yet,
    // redirect them to the onboarding screen.
    if (user.accountType === 'merchant' && !user.merchantProfile) {
        return <Navigate to="/merchant/onboard" replace />;
    }

    // Otherwise, render the requested nested merchant page (e.g., Dashboard, Products).
    return <Outlet />;
};