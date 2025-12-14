
import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    HomeIcon, 
    BuildingStorefrontIcon,
    ArrowsRightLeftIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { User } from '../types';

interface BottomNavProps {
    user: User;
}

interface NavItem {
    path: string;
    icon: React.ElementType;
    label: string;
}

const BottomNav: React.FC<BottomNavProps> = memo(({ user }) => {
    const location = useLocation();

    const navItems: NavItem[] = [
        { path: '/dashboard', icon: HomeIcon, label: 'Home' },
        { path: '/market', icon: BuildingStorefrontIcon, label: 'Store' },
    ];

    if (!user.isGuest) {
        navItems.push({ path: '/exchange', icon: ArrowsRightLeftIcon, label: 'Exchange' });
    }

    navItems.push({ path: '/more', icon: EllipsisHorizontalIcon, label: 'More' });

    const morePaths = ['/settings', '/family', '/my-orders', '/messages', '/financial-snapshot', '/goals', '/payment-methods'];
    
    return (
        <nav className="lg:hidden bg-bg-secondary border-t border-border-primary pb-[env(safe-area-inset-bottom)] fixed bottom-0 left-0 right-0 z-50">
            <ul className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = (item.path === '/more')
                        ? location.pathname === item.path || morePaths.some(p => location.pathname.startsWith(p))
                        : location.pathname === item.path;
                    
                    return (
                        <li key={item.path} className="flex-1">
                            <NavLink
                                to={item.path}
                                className={`flex flex-col items-center gap-1 p-2 w-full min-w-[64px] transition-colors rounded-lg ${isActive ? 'text-brand-primary' : 'text-text-secondary hover:bg-bg-tertiary'}`}
                            >
                                <item.icon className="h-6 w-6" />
                                <span className="text-[10px] font-medium leading-none">{item.label}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
});

export default BottomNav;
