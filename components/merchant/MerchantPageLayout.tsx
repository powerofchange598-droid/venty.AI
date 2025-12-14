import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import PageLayout from '../../components/PageLayout';
import { EllipsisVerticalIcon, PlusIcon, PaintBrushIcon, ChartPieIcon } from '@heroicons/react/24/solid';

const overflowNavItems = [
    { path: '#add-product', icon: PlusIcon, label: 'Add Product' },
    { path: '/merchant/store-setup', icon: PaintBrushIcon, label: 'Store Setup' },
    { path: '#analytics', icon: ChartPieIcon, label: 'Analytics' },
];

const breakPointSmall = 640;

const OverflowMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLinkClick = (path: string) => {
        if (path === '#add-product') {
            // In a real app, you might use a context or event emitter to open the modal.
            // For now, we'll use an alert as a placeholder.
            alert("This would open the 'Add Product' modal.");
        }
         if (path === '#analytics') {
            alert("This would navigate to the Analytics screen.");
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-bg-tertiary"
            >
                <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-secondary rounded-md shadow-lg z-20 ring-1 ring-black ring-opacity-5 animate-fadeIn">
                    <div className="py-1">
                        {overflowNavItems.map((item) => (
                             <Link
                                key={item.label}
                                to={item.path && item.path.startsWith('/') ? item.path : '#'}
                                onClick={() => handleLinkClick(item.path)}
                                className="flex items-center space-x-3 px-4 py-2 text-sm text-text-primary hover:bg-bg-primary"
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface MerchantPageLayoutProps {
    title: string;
    children: ReactNode;
    rightAccessory?: ReactNode;
}

const MerchantPageLayout: React.FC<MerchantPageLayoutProps> = ({ title, children, rightAccessory }) => {
    const { width } = useWindowSize();
    const isSmall = width < breakPointSmall;

    return (
        <PageLayout title={title} rightAccessory={rightAccessory ?? (isSmall ? <OverflowMenu /> : undefined)}>
            {children}
        </PageLayout>
    );
};

export default MerchantPageLayout;