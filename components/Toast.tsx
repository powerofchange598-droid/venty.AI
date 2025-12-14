import React, { useState, useEffect } from 'react';
import { useToastState } from '../hooks/useToast';

const Toast = () => {
    const { message } = useToastState();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2700); // Hide after 2.7 seconds ( allowing 300ms for exit animation)

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div
            className={`fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-bg-secondary/80 text-text-primary backdrop-blur-sm rounded-lg shadow-lg border border-border-primary transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            {message}
        </div>
    );
};

export default Toast;