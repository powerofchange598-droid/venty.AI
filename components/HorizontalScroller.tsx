import React, { useRef, useState, useCallback, useEffect, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import VentyButton from './VentyButton';

interface HorizontalScrollerProps {
    children: ReactNode;
    className?: string;
    activeId?: string;
}

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({ children, className = '', activeId }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 5); // Add a small buffer
            setCanScrollRight(hasOverflow && Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth - 5); // Add a small buffer
        }
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el) {
            checkScrollability();
            el.addEventListener('scroll', checkScrollability, { passive: true });
            const resizeObserver = new ResizeObserver(checkScrollability);
            resizeObserver.observe(el);
            
            return () => {
                el.removeEventListener('scroll', checkScrollability);
                resizeObserver.unobserve(el);
            };
        }
    }, [checkScrollability, children]);
    
     useEffect(() => {
        if (activeId) {
            const activeElement = document.getElementById(activeId);
            const container = scrollContainerRef.current;
            if (activeElement && container) {
                const elementRect = activeElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                let scrollLeft = container.scrollLeft;
                const elementLeft = elementRect.left - containerRect.left;
                const elementRight = elementRect.right - containerRect.left;

                if (elementLeft < 0) {
                     scrollLeft += elementLeft - 16;
                } else if (elementRight > container.clientWidth) {
                     scrollLeft += elementRight - container.clientWidth + 16;
                }
                
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [activeId]);

    const handleNavScroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.8;
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={`relative group ${className}`}>
            <VentyButton
                onClick={() => handleNavScroll('left')}
                variant="secondary"
                className="scroller-nav-btn !absolute !top-1/2 !-translate-y-1/2 !left-2 !z-20 md:!opacity-0 group-hover:md:!opacity-100 disabled:!opacity-0"
                aria-label="Scroll left"
                disabled={!canScrollLeft}
            >
                <ChevronLeftIcon className="h-6 w-6 text-ui-primary" />
            </VentyButton>
            
            <div
                ref={scrollContainerRef}
                className="swipe-scroller snap-x snap-mandatory scroll-smooth"
            >
                {children}
            </div>
            
            <VentyButton
                onClick={() => handleNavScroll('right')}
                variant="secondary"
                className="scroller-nav-btn !absolute !top-1/2 !-translate-y-1/2 !right-2 !z-20 md:!opacity-0 group-hover:md:!opacity-100 disabled:!opacity-0"
                aria-label="Scroll right"
                disabled={!canScrollRight}
            >
                <ChevronRightIcon className="h-6 w-6 text-ui-primary" />
            </VentyButton>
        </div>
    );
};

export default HorizontalScroller;