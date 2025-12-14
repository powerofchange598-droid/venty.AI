
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useLocalization } from '../hooks/useLocalization';

interface AnimatedCounterProps {
    to: number;
    isCurrency?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, isCurrency = false }) => {
    const count = useMotionValue(0);
    const { formatCurrency } = useLocalization();

    useEffect(() => {
        const animation = animate(count, to, {
            duration: 1.2,
            ease: "easeOut",
        });
        return animation.stop;
    }, [to, count]);
    
    const displayValue = useTransform(count, latest => {
        if (isCurrency) {
            return formatCurrency(latest);
        }
        return Math.round(latest).toLocaleString();
    });

    return <motion.span>{displayValue}</motion.span>;
};

export default AnimatedCounter;
