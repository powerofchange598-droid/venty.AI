import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useBottomNavIndicator = (navListRef: React.RefObject<HTMLUListElement>, indicatorRef: React.RefObject<HTMLDivElement>) => {
    const location = useLocation();

    const updateIndicatorPosition = useCallback(() => {
        const navList = navListRef.current;
        const indicator = indicatorRef.current;
        if (!navList || !indicator) return;

        const activeLink = navList.querySelector('a.active');
        if (activeLink) {
            const listItem = (activeLink as HTMLElement).closest('li');
            if (listItem) {
                const indicatorWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-indicator-w'));
                const left = listItem.offsetLeft + (listItem.offsetWidth - indicatorWidth) / 2;
                indicator.style.transform = `translateX(${left}px)`;
            }
        }
    }, [navListRef, indicatorRef]);

    useEffect(() => {
        // A brief timeout ensures the DOM is settled after navigation before we measure.
        const timer = setTimeout(updateIndicatorPosition, 50);
        
        const navListElement = navListRef.current;
        const resizeObserver = new ResizeObserver(updateIndicatorPosition);
        if (navListElement) {
            resizeObserver.observe(navListElement);
        }

        return () => {
            clearTimeout(timer);
            if (navListElement) {
                resizeObserver.unobserve(navListElement);
            }
        };
    }, [location.pathname, updateIndicatorPosition, navListRef]);
};