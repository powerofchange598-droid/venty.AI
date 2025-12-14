

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Card from '../../../components/Card';
import VentyButton from '../../../components/VentyButton';

interface SetupProgressProps {
  progress: number;
  tasks: { id: string; label: string; completed: boolean }[];
}

const SetupProgress: React.FC<SetupProgressProps> = ({ progress, tasks }) => {
    const navigate = useNavigate();
    const progressText = progress < 20 ? "Let's get started!"
        : progress < 80 ? "You're making great progress!"
        : "Almost there!";
    
    if (progress === 100) {
        return (
            <Card className="!p-6 bg-feedback-success/10 border-feedback-success/20">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4">
                    <CheckCircleIcon className="h-12 w-12 text-feedback-success flex-shrink-0"/>
                    <div>
                        <h2 className="text-xl font-bold font-serif">Congratulations! Your store is ready to launch.</h2>
                        <p className="text-text-secondary mt-1">All setup tasks are complete. You can now publish your store to the world.</p>
                    </div>
                     <VentyButton onClick={() => navigate('/merchant/dashboard')} variant="primary" className="!w-full md:!w-auto md:ml-auto mt-4 md:mt-0">Go to Dashboard</VentyButton>
                </div>
            </Card>
        );
    }

    return (
        <Card className="!p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Progress Bar Section */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-lg">Setup Progress</h2>
                        <span className="font-bold text-brand-primary">{Math.round(progress)}%</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{progressText}</p>
                    <div className="setup-progress-bar-bg">
                        <motion.div
                            className="setup-progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                    </div>
                </div>
                {/* Checklist Section */}
                <div className="flex-1 md:border-l md:pl-6 border-bg-tertiary">
                    <h3 className="font-bold text-lg mb-2">Your Checklist</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {tasks.map(task => (
                            <div key={task.id} className={`setup-checklist-item ${task.completed ? 'completed' : ''}`}>
                                <div className="icon">
                                    {task.completed ? (
                                        <CheckCircleIcon className="h-5 w-5"/>
                                    ) : (
                                        <div className="h-5 w-5 flex items-center justify-center">
                                            <div className="h-3 w-3 rounded-full border-2 border-text-secondary"></div>
                                        </div>
                                    )}
                                </div>
                                <span>{task.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SetupProgress;