
import React, { useState, useMemo } from 'react';
import { User } from '../../types';
import Card from '../../components/Card';
import VentyButton from '../../components/VentyButton';
import ShareModal from '../../components/ShareModal';
import MerchantPageLayout from '../../components/merchant/MerchantPageLayout';
import SmartNudge from '../../components/merchant/SmartNudge'; 
import MerchantVerificationCard from '../../components/merchant/MerchantVerificationCard'; 
import { CubeIcon, ShoppingBagIcon, BanknotesIcon, UsersIcon, CheckBadgeIcon, ShareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockMerchant } from '../../data/mockData';
import { useLocalization } from '../../hooks/useLocalization';
import { useTheme } from '../../hooks/useTheme';

interface MerchantDashboardScreenProps {
    user: User;
}

// Re-purposed StatCard to be used as a KPI inside the main analytics card.
const KPIStatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: 'primary' | 'accent' | 'purple' | 'orange' }> = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        primary: 'bg-brand-primary/10 text-brand-primary',
        accent: 'bg-brand-accent/10 text-brand-accent',
        purple: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
        orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    };
    return (
        <div className="bg-bg-primary/50 dark:bg-bg-secondary/50 p-4 rounded-xl border border-bg-tertiary hover:shadow-sm transition-shadow">
            <div className="flex items-center">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-text-secondary">{title}</p>
                    <p className="text-2xl font-bold text-text-primary">{value}</p>
                </div>
            </div>
        </div>
    );
};


const salesData = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 13 },
  { name: 'Wed', revenue: 2000, orders: 48 },
  { name: 'Thu', revenue: 2780, orders: 39 },
  { name: 'Fri', revenue: 1890, orders: 48 },
  { name: 'Sat', revenue: 2390, orders: 38 },
  { name: 'Sun', revenue: 3490, orders: 43 },
];

const MerchantDashboardScreen: React.FC<MerchantDashboardScreenProps> = ({ user }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const { formatCurrency } = useLocalization();
    const { theme } = useTheme();
    const totalRevenue = mockMerchant.orders.filter(o => o.status === 'completed').reduce((sum, order) => sum + order.total, 0);

    // Chart Configuration based on Theme
    const chartConfig = useMemo(() => {
        const isDark = theme === 'dark';
        const isTrader = theme === 'trader';
        
        // Royal Blue #4169E1 for Light, Light Gold #FFD700 for Dark
        const primaryColor = isDark ? '#FFD700' : isTrader ? '#E53935' : '#4169E1';
        const secondaryColor = isDark ? '#FFF' : '#1E293B';
        const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
        const tooltipBg = isDark ? '#1E1E1E' : '#FFFFFF';
        const tooltipBorder = isDark ? '#333' : '#E2E8F0';
        
        return { primary: primaryColor, text: secondaryColor, grid: gridColor, tooltipBg, tooltipBorder };
    }, [theme]);

    const handleExport = () => {
        alert("Exporting your sales and performance report... (Simulation)\nThis would typically download a PDF or CSV file.");
    };

    return (
        <MerchantPageLayout title="Merchant Dashboard">
            {isShareModalOpen && (
                <ShareModal
                    title="Share Your Store"
                    text={`Check out my store on Venty: ${user.merchantProfile?.brandName}`}
                    url={`${window.location.origin}${window.location.pathname}#/shop/${user.merchantProfile?.slug}?source=share&medium=merchant`}
                    onClose={() => setIsShareModalOpen(false)}
                />
            )}
            <div className="p-4 lg:p-6 space-y-8">
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                        <h1 className="text-3xl font-serif font-bold tracking-wide flex items-center">
                            Welcome, {user.merchantProfile?.brandName || user.name}
                            {user.merchantProfile?.isVerified && <CheckBadgeIcon className="h-7 w-7 text-brand-primary ml-2" />}
                        </h1>
                        <p className="text-lg text-text-secondary">Here's your store's performance summary.</p>
                    </div>
                    <VentyButton onClick={() => setIsShareModalOpen(true)} className="!w-auto mt-2 sm:mt-0 !py-2 !px-4 !text-sm flex items-center space-x-2">
                        <ShareIcon className="h-5 w-5"/>
                        <span>Share Store</span>
                    </VentyButton>
                </header>

                <SmartNudge />

                {/* Main Hero Section: Sales Analytics */}
                <Card className="!p-6 !bg-bg-secondary shadow-md border border-border-primary">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-bold text-text-primary">Sales Analytics</h2>
                        <div className="flex gap-2">
                             <VentyButton onClick={handleExport} variant="secondary" className="!w-auto !py-1.5 !px-3 !text-xs flex items-center space-x-1">
                                <DocumentArrowDownIcon className="h-4 w-4"/>
                                <span>Export Report</span>
                            </VentyButton>
                        </div>
                    </div>
                    
                    {/* KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <KPIStatCard title="Total Products" value={mockMerchant.products.length.toString()} icon={CubeIcon} color="primary"/>
                        <KPIStatCard title="Total Orders" value={mockMerchant.orders.length.toString()} icon={ShoppingBagIcon} color="accent"/>
                        <KPIStatCard title="Monthly Revenue" value={formatCurrency(totalRevenue)} icon={BanknotesIcon} color="purple"/>
                        <KPIStatCard title="Active Customers" value="67" icon={UsersIcon} color="orange"/>
                    </div>
                    
                    {/* Professional Chart */}
                    <div className="w-full h-80 relative" style={{ minHeight: 320 }}>
                         <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <ComposedChart
                              data={salesData}
                              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={chartConfig.primary} stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor={chartConfig.primary} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={chartConfig.grid} />
                              <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: chartConfig.text, fontSize: 12, fontWeight: 500 }} 
                                dy={10}
                              />
                              <YAxis 
                                yAxisId="left"
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: chartConfig.text, fontSize: 12, fontWeight: 500 }} 
                                tickFormatter={(value) => formatCurrency(value as number).replace(/(\.00|,00)/, '')} 
                              />
                              <YAxis yAxisId="right" orientation="right" hide />
                              <Tooltip 
                                 contentStyle={{
                                     backgroundColor: chartConfig.tooltipBg,
                                     borderColor: chartConfig.tooltipBorder,
                                     borderRadius: '12px',
                                     boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                 }}
                                 itemStyle={{ color: chartConfig.text, fontWeight: 600 }}
                                 formatter={(value: number, name: string) => [
                                     name === 'revenue' ? formatCurrency(value) : value,
                                     name === 'revenue' ? 'Revenue' : 'Orders'
                                 ]}
                                 cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                              />
                              <Area 
                                yAxisId="left"
                                type="monotone" 
                                dataKey="revenue" 
                                stroke={chartConfig.primary} 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorRevenue)" 
                                activeDot={{ r: 6, strokeWidth: 0, fill: chartConfig.primary }}
                              />
                              <Bar 
                                yAxisId="right"
                                dataKey="orders" 
                                barSize={12} 
                                fill={chartConfig.text} 
                                opacity={0.1} 
                                radius={[4, 4, 0, 0]} 
                              />
                            </ComposedChart>
                          </ResponsiveContainer>
                    </div>
                </Card>

                {/* Secondary Section: Suggested Services */}
                <div>
                     <h2 className="text-2xl font-serif font-bold mb-4">Grow Your Business</h2>
                     <div className="space-y-6">
                        {!user.merchantProfile?.isVerified && (
                            <MerchantVerificationCard user={user} />
                        )}
                     </div>
                </div>

            </div>
        </MerchantPageLayout>
    );
};

export default MerchantDashboardScreen;
