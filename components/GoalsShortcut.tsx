import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const GoalsShortcut: React.FC = () => {
    return (
        <Link to="/goals">
            <Card className="!p-6 bg-feedback-success/10 border-feedback-success/20 text-center hover:border-feedback-success/50 transition-all">
                <span className="text-4xl">🎯</span>
                <h2 className="text-xl font-bold font-serif mt-2">Goals Unlocked</h2>
                <p className="text-text-secondary mt-1">You have full access to the AI Financial Center. Let's build your future.</p>
            </Card>
        </Link>
    );
};

export default GoalsShortcut;