
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface SetupDetailPanelProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%' },
    exit: { x: '100%' },
};

const SetupDetailPanel: React.FC<SetupDetailPanelProps> = ({ title, onClose, children }) => {
    return (
        <motion.div
            className="setup-detail-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        >
            <header className="flex items-center justify-between p-4 lg:p-6 sticky top-0 bg-bg-secondary/80 backdrop-blur-sm z-10 border-b border-border-primary">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-bg-tertiary">
                    <ArrowLeftIcon className="h-6 w-6 text-text-primary" />
                </button>
                <h1 className="text-lg font-semibold text-center truncate">{title}</h1>
                <div className="w-10"></div>
            </header>
            <div className="flex-grow overflow-y-auto">
                {children}
            </div>
        </motion.div>
    );
};

export default SetupDetailPanel;