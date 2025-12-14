import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface ToastContextType {
    showToast: (message: string) => void;
}

const ToastStateContext = createContext<{ message: string }>({ message: '' });
const ToastDispatchContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState('');

    const showToast = useCallback((msg: string) => {
        setTimeout(() => {
            setMessage(msg);
        }, 0);
    }, []);

    return (
        <ToastStateContext.Provider value={{ message }}>
            <ToastDispatchContext.Provider value={{ showToast }}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    );
};

export const useToastState = () => useContext(ToastStateContext);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastDispatchContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
