import React from 'react';

export const checkPasswordStrength = (password: string): { score: number } => {
    let score = 0;
    if (!password) return { score: 0 };

    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 8) score++;

    return { score };
};

const PasswordStrengthMeter: React.FC<{ score: number }> = ({ score }) => {
    const strength = {
        0: { width: '0%', color: 'bg-transparent', label: '' },
        1: { width: '25%', color: 'bg-feedback-error', label: 'Weak' },
        2: { width: '50%', color: 'bg-feedback-error', label: 'Weak' },
        3: { width: '75%', color: 'bg-feedback-warning', label: 'Medium' },
        4: { width: '100%', color: 'bg-feedback-success', label: 'Strong' },
    };
    const config = strength[score as keyof typeof strength] || strength[0];

    return (
        <div>
            <div className="w-full bg-border-primary rounded-full h-1.5 mt-2">
                <div className={`h-1.5 rounded-full transition-all ${config.color}`} style={{ width: config.width }}></div>
            </div>
            {config.label && <p className={`text-xs mt-1 font-semibold ${config.label === 'Strong' ? 'text-feedback-success' : 'text-text-secondary'}`}>{config.label}</p>}
        </div>
    );
};

export default PasswordStrengthMeter;