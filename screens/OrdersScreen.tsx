import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Order, OrderStatus } from '../types';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { useLocalization } from '../hooks/useLocalization';
import { ShoppingBagIcon, ClockIcon, TruckIcon, CheckCircleIcon, XCircleIcon, MapPinIcon, HomeIcon, BuildingStorefrontIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { safeDate, safeFormatDateTime } from '../utils/dateUtils';

// --- PROPS ---
interface OrdersScreenProps {
    user: User;
    orders: Order[];
    onCancelOrder: (orderId: string) => void;
}

// --- HOOKS ---
const useCountdown = (targetDate?: string) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const targetTime = safeDate(targetDate)?.getTime() || Date.now();
            const difference = targetTime - Date.now();
            setTotal(difference);

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                
                let timeString = '';
                if (days > 0) timeString += `${days}d `;
                if (hours > 0) timeString += `${hours}h `;
                timeString += `${minutes}m`;

                setTimeLeft(timeString.trim() + ' remaining');
            } else {
                setTimeLeft('Arriving soon');
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return { timeLeft, total };
};


// --- HELPER COMPONENTS ---

const CancelCountdown: React.FC<{ expiryTimestamp: number }> = ({ expiryTimestamp }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = expiryTimestamp - Date.now();
            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
            } else {
                setTimeLeft('Expired');
            }
        };

        const interval = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call
        return () => clearInterval(interval);
    }, [expiryTimestamp]);

    return <span className="font-mono">{timeLeft}</span>;
};


const statusInfo: Record<OrderStatus, { icon: React.ElementType; color: string; label: string }> = {
    'pending-payment': { icon: ClockIcon, color: 'text-text-secondary', label: 'Pending Payment' },
    'paid-awaiting-fulfillment': { icon: ClockIcon, color: 'text-text-secondary', label: 'Processing' },
    'shipped': { icon: TruckIcon, color: 'text-text-primary', label: 'Shipped' },
    'in-transit': { icon: TruckIcon, color: 'text-text-primary', label: 'In Transit' },
    'completed': { icon: CheckCircleIcon, color: 'text-text-primary', label: 'Delivered' },
    'cancelled': { icon: XCircleIcon, color: 'text-text-secondary', label: 'Canceled' },
    'disputed': { icon: XCircleIcon, color: 'text-text-secondary', label: 'Disputed' },
    'refunded': { icon: XCircleIcon, color: 'text-text-secondary', label: 'Refunded' },
};

const OrderTimeline: React.FC<{ statusHistory: Order['statusHistory'], currentStatus: OrderStatus }> = ({ statusHistory = [], currentStatus }) => {
    const timelineSteps: OrderStatus[] = ['paid-awaiting-fulfillment', 'shipped', 'in-transit', 'completed'];
    const currentStatusIndex = timelineSteps.indexOf(currentStatus);

    return (
        <div className="w-full">
            <div className="flex items-center">
                {timelineSteps.map((step, index) => (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center">
                            <div className={`timeline-step ${index < currentStatusIndex ? 'active' : ''} ${index === currentStatusIndex ? 'current' : ''}`}>
                                {index < currentStatusIndex && <CheckCircleIcon className="h-3 w-3 text-white dark:text-black" />}
                            </div>
                            <p className={`text-xs mt-1 text-center ${index <= currentStatusIndex ? 'text-text-primary font-semibold' : 'text-text-secondary'}`}>{statusInfo[step].label}</p>
                        </div>
                        {index < timelineSteps.length - 1 && <div className={`timeline-connector ${index < currentStatusIndex ? 'active' : ''}`}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const MiniMapTracker: React.FC<{ order: Order }> = ({ order }) => {
    const { total: totalTimeLeft } = useCountdown(order.estimatedDeliveryAt);
    
    const progress = useMemo(() => {
        if (order.status === 'completed' || totalTimeLeft <= 0) return 1;
        if (!order.estimatedDeliveryAt || !order.createdAt || order.status !== 'in-transit') return 0;
        
        const totalDuration = (safeDate(order.estimatedDeliveryAt)?.getTime() || Date.now()) - (safeDate(order.createdAt)?.getTime() || Date.now());
        const elapsedTime = Date.now() - (safeDate(order.createdAt)?.getTime() || Date.now());
        
        return Math.min(1, Math.max(0, elapsedTime / totalDuration));
    }, [order, totalTimeLeft]);

    return (
        <div className="bg-bg-tertiary/50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-xs font-semibold text-text-primary/80 dark:text-text-primary/90">
                <div className="flex items-center space-x-1"><BuildingStorefrontIcon className="h-4 w-4" /><span>Warehouse</span></div>
                <div className="flex items-center space-x-1"><HomeIcon className="h-4 w-4" /><span>Your Location</span></div>
            </div>
            <div className="relative h-2 bg-bg-tertiary/50 rounded-full mt-2">
                <div className="absolute top-0 left-0 h-2 bg-text-primary rounded-full" style={{ width: `${progress * 100}%` }}></div>
                <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    initial={{ left: '0%' }}
                    animate={{ left: `${progress * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                >
                    <TruckIcon className="h-6 w-6 text-text-primary bg-bg-secondary p-1 rounded-full border border-bg-tertiary" />
                </motion.div>
            </div>
        </div>
    );
};

const OrderCard: React.FC<{ order: Order; user: User; onCancel: (id: string) => void; formatCurrency: (val: number) => string; language: string }> = ({ order, user, onCancel, formatCurrency, language }) => {
    const StatusIcon = statusInfo[order.status].icon;
    const expiryTimestamp = (safeDate(order.createdAt)?.getTime() || Date.now()) + 24 * 60 * 60 * 1000;
    const canCancel = Date.now() < expiryTimestamp && order.status === 'paid-awaiting-fulfillment';
    const { timeLeft } = useCountdown(order.estimatedDeliveryAt);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const navigate = useNavigate();

    const address = user.contactInfo.deliveryAddress;
    
    return (
        <Card className="card-border-accent">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold break-words">Order #{order.id.split('-')[1]}</h3>
                    <p className="text-xs text-text-secondary">{safeFormatDateTime(order.createdAt, language)}</p>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold capitalize ${statusInfo[order.status].color}`}>
                    <StatusIcon className="h-5 w-5" />
                    <span>{statusInfo[order.status].label}</span>
                </div>
            </div>
            <div className="my-4 space-y-2 border-t border-b border-bg-tertiary py-2">
                {order.items.map(item => (
                    <div key={item.productId} className="flex justify-between items-center text-sm">
                        <p className="break-words pr-2">{item.title} <span className="text-text-secondary">x{item.quantity}</span></p>
                        <p className="font-medium whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-bg-tertiary space-y-3">
                {address ? (
                     <div className="flex items-center space-x-2 text-sm">
                        <MapPinIcon className="h-5 w-5 text-text-secondary flex-shrink-0"/>
                        <div>
                            <p className="font-semibold">Delivery Location: {address.governorate}</p>
                        </div>
                    </div>
                ) : (
                    <Card className="!p-2 text-center bg-bg-tertiary">
                        <p className="text-sm">Please complete your delivery address to enable order tracking.</p>
                        <VentyButton onClick={() => navigate('/settings')} variant="secondary" className="!w-auto !py-1 !px-3 !text-xs mt-1">Update Address</VentyButton>
                    </Card>
                )}

                {order.estimatedDeliveryAt && statusInfo[order.status].label !== "Delivered" && (
                    <div className="flex items-center space-x-2 text-sm">
                        <ClockIcon className="h-5 w-5 text-text-secondary flex-shrink-0"/>
                        <p className="font-semibold">Estimated Delivery: {timeLeft}</p>
                    </div>
                )}
                 <VentyButton onClick={() => setIsDetailsVisible(!isDetailsVisible)} variant="secondary" className="!w-full !py-2 !text-sm">
                    Track Order <ChevronDownIcon className={`h-4 w-4 inline ml-1 transition-transform ${isDetailsVisible ? 'rotate-180' : ''}`} />
                </VentyButton>
            </div>
            
            <AnimatePresence>
                {isDetailsVisible && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                     >
                        <div className="mt-4 pt-4 border-t border-bg-tertiary space-y-4">
                            <OrderTimeline statusHistory={order.statusHistory} currentStatus={order.status} />
                            <MiniMapTracker order={order} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {canCancel && (
                <div className="mt-4 p-3 bg-bg-tertiary rounded-lg text-center">
                    <p className="text-sm">You can cancel this order within:</p>
                    <p className="text-lg font-bold my-1"><CancelCountdown expiryTimestamp={expiryTimestamp} /></p>
                    <VentyButton onClick={() => onCancel(order.id)} variant="danger" className="!w-full !py-1 !text-sm">Cancel Order</VentyButton>
                </div>
            )}
        </Card>
    );
};


// --- MAIN SCREEN ---
const OrdersScreen: React.FC<OrdersScreenProps> = ({ user, orders, onCancelOrder }) => {
    const [view, setView] = useState<'active' | 'history'>('active');
    const { formatCurrency, language } = useLocalization();

    const { active, history } = useMemo(() => {
        const active: Order[] = [];
        const history: Order[] = [];
        const activeStatuses: OrderStatus[] = ['paid-awaiting-fulfillment', 'shipped', 'in-transit'];
        
        const sortedOrders = [...orders].sort((a,b) => (safeDate(b.createdAt)?.getTime() || 0) - (safeDate(a.createdAt)?.getTime() || 0));

        sortedOrders.forEach(order => {
            if (activeStatuses.includes(order.status)) {
                active.push(order);
            } else {
                history.push(order);
            }
        });
        
        return { active, history };
    }, [orders]);

    const itemsToShow = view === 'active' ? active : history;
    const emptyMessage = view === 'active' ? "You have no active orders." : "You have no past orders.";

    return (
        <PageLayout title="My Orders">
            <div className="p-4 lg:p-6 space-y-4">
                 <div className="flex justify-center bg-bg-tertiary rounded-lg p-1">
                    <button onClick={() => setView('active')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors relative ${view === 'active' ? 'bg-bg-secondary text-text-primary' : 'text-text-secondary'}`}>
                        Active
                        {active.length > 0 && <span className="absolute top-1 right-2 h-5 w-5 text-xs rounded-full bg-text-primary text-bg-primary flex items-center justify-center">{active.length}</span>}
                    </button>
                    <button onClick={() => setView('history')} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${view === 'history' ? 'bg-bg-secondary text-text-primary' : 'text-text-secondary'}`}>
                        History
                    </button>
                </div>
                {itemsToShow.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {itemsToShow.map(order => (
                             <OrderCard key={order.id} order={order} user={user} onCancel={onCancelOrder} formatCurrency={formatCurrency} language={language} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-16">
                        <ShoppingBagIcon className="h-16 w-16 mx-auto text-bg-tertiary" />
                        <h2 className="text-xl font-bold mt-4">No Orders Here</h2>
                        <p className="text-text-secondary mt-1">{emptyMessage}</p>
                    </Card>
                )}
            </div>
        </PageLayout>
    );
};

export default OrdersScreen;