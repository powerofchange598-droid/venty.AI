import React, { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useToast } from './useToast';

export type PerformanceMode = 'normal' | 'performance';

interface PerformanceContextType {
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
  isPerformanceModeEnabled: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const getInitialPerformanceMode = (): PerformanceMode => {
    try {
        const storedMode = localStorage.getItem('performanceMode');
        if (storedMode === 'performance') {
            return 'performance';
        }
    } catch (e) {
        console.warn("Could not access localStorage for performanceMode.");
    }
    return 'normal';
};

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [performanceMode, setPerformanceModeState] = useState<PerformanceMode>(getInitialPerformanceMode);
  const { showToast } = useToast();

  const setPerformanceMode = useCallback((newMode: PerformanceMode) => {
    try {
        localStorage.setItem('performanceMode', newMode);
        if (newMode === 'performance') {
            showToast("⚡ High Performance Mode Enabled — visual effects reduced for speed.");
        } else {
            showToast("✨ Full Experience Mode Restored.");
        }
    } catch (e) {
        console.warn("Could not save performanceMode to localStorage.");
    }
    setPerformanceModeState(newMode);
  }, [showToast]);
  
  // Set data attribute on html element
  useEffect(() => {
    document.documentElement.setAttribute('data-performance-mode', String(performanceMode === 'performance'));
  }, [performanceMode]);
  
  const isPerformanceModeEnabled = performanceMode === 'performance';

  const value = {
    performanceMode,
    setPerformanceMode,
    isPerformanceModeEnabled,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = (): PerformanceContextType => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
