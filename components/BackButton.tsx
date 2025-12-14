import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/solid';
import VentyButton from './VentyButton';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    
    const canGoBack = window.history.state && window.history.state.idx > 0;

    const handleClick = () => {
        if (canGoBack) {
            navigate(-1);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <VentyButton
            onClick={handleClick}
            variant="secondary"
            className="!w-10 !h-10 !p-0 !rounded-full"
            aria-label={canGoBack ? "Go back" : "Go to Homepage"}
        >
            {canGoBack ? (
                <ArrowLeftIcon className="h-5 w-5 text-text-primary" />
            ) : (
                <HomeIcon className="h-5 w-5 text-text-primary" />
            )}
        </VentyButton>
    );
};

export default memo(BackButton);