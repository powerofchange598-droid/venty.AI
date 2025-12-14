import React from 'react';
import { motion } from 'framer-motion';
import VentyButton from './VentyButton';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const FeaturedBanner: React.FC = () => {
    return (
        <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(110deg, rgb(var(--brand-primary)), rgb(var(--brand-accent)))' }}>
             <div className="relative z-10 text-white">
                <h3 className="text-xl font-bold">Unlock Freelancer Mode</h3>
                <p className="text-sm mt-1 opacity-90">Turn your skills into income. Get early access now.</p>
                <VentyButton onClick={() => alert('Freelancer mode coming soon!')} className="!bg-white !text-brand-primary !w-auto !py-2 !px-4 !text-sm mt-4" label="Learn More"></VentyButton>
            </div>
        </div>
    );
};

export default FeaturedBanner;