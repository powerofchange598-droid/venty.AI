
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface EditorAccordionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const EditorAccordion: React.FC<EditorAccordionProps> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border border-border-primary rounded-lg overflow-hidden bg-bg-primary">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 hover:bg-bg-tertiary transition-colors"
                aria-expanded={isOpen}
                aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
                <h3 className="font-semibold text-lg">{title}</h3>
                <ChevronDownIcon
                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                        <div className="p-4 border-t border-border-primary">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditorAccordion;
