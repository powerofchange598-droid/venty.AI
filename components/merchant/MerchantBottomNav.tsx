import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChartBarIcon, CubeIcon, ShoppingBagIcon, ChatBubbleLeftRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { User } from '../../types';
import { mockMerchantInboxMessages } from '../../data/mockData';

interface MerchantBottomNavProps {
    user: User;
}

const MerchantBottomNav: React.FC<MerchantBottomNavProps> = ({ user }) => {
    const { t } = useTranslation();
    const location = useLocation();
    
    const unreadCount = mockMerchantInboxMessages.filter(m => !m.isRead).length;

    const primaryNavItems = [
        { path: '/merchant/dashboard', icon: ChartBarIcon, label: t('nav.merchant.dashboard') },
        { path: '/merchant/products', icon: CubeIcon, label: t('nav.merchant.products') },
        { path: '/merchant/orders', icon: ShoppingBagIcon, label: t('nav.merchant.orders') },
        { path: '/messages', icon: ChatBubbleLeftRightIcon, label: t('nav.messages'), badge: unreadCount },
        { path: '/more', icon: EllipsisHorizontalIcon, label: 'More' },
    ];

    const morePaths = ['/settings', '/marketing', '/merchant/store-setup'];

    return (
        <nav className="bottom-nav-glass lg:hidden">
            <ul>
                {primaryNavItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                             className={({ isActive }) => {
                                if (isActive && item.path !== '/more') return 'active';
                                if (item.path === '/more' && (isActive || morePaths.some(p => location.pathname.startsWith(p)))) {
                                    return 'active';
                                }
                                return '';
                            }}
                        >
                            <div className="relative">
                                <item.icon />
                                {item.badge && item.badge > 0 && (
                                     <span className="absolute -top-1 -right-2 block h-4 w-4 rounded-full bg-feedback-error text-white text-[10px] flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MerchantBottomNav;