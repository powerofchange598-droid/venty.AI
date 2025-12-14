import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
    percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 120 120"
            style={{ transform: 'rotate(-90deg)' }}
        >
            <circle
                className="text-bg-tertiary"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
            />
            <motion.circle
                className="text-brand-primary"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="60"
                cy="60"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                strokeLinecap="round"
            />
             <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className="text-2xl font-bold fill-current text-text-primary"
                style={{ transform: 'rotate(90deg) scale(0.9, 1)', transformOrigin: 'center' }}
            >
                {`${Math.round(percentage)}%`}
            </text>
        </svg>
    );
};

export default CircularProgress;