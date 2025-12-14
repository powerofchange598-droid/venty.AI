
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, User, MerchantAd, Stock } from '../types';
import { mockProducts, mockStocks } from '../data/mockData';
import { ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import { useFavourites } from '../hooks/useFavourites';
import VentyButton from '../components/VentyButton';
import HorizontalScroller from '../components/HorizontalScroller';
import AdCarousel from '../components/ads/AdCarousel';
import { useTheme } from '../hooks/useTheme';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useLocalization } from '../hooks/useLocalization';
import Card from '../components/Card';

const PRODUCTS_PER_PAGE = 8; // Adjusted for 2-col grid on mobile

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';
type FilterOption = 'forYou' | 'new' | 'trending' | 'offers' | 'electronics' | 'under-500';

const filters: { id: FilterOption, name: string }[] = [
    { id: 'forYou', name: 'For You' },
    { id: 'new', name: 'New' },
    { id: 'trending', name: 'Trending' },
    { id: 'offers', name: 'Offers' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'under-500', name: 'Under 500' },
];

const HeaderIcons: React.FC = () => {
    const { items } = useCart();
    const { favourites } = useFavourites();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const favouritesCount = favourites.length;

    return (
        <div className="flex items-center space-x-2">
            <Link to="/favourites" className="relative p-2 rounded-full hover:bg-bg-tertiary transition-colors">
                <HeartIcon className="h-6 w-6 text-text-secondary" />
                {favouritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-feedback-error text-white text-[10px] flex items-center justify-center border-2 border-bg-primary">
                        {favouritesCount}
                    </span>
                )}
            </Link>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-bg-tertiary transition-colors">
                <ShoppingCartIcon className="h-6 w-6 text-text-secondary" />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-feedback-error text-white text-[10px] flex items-center justify-center border-2 border-bg-primary">
                        {cartCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

// --- TRADER MODE COMPONENTS ---
// ... (StockAdCard and TraderAdsSection remain unchanged, but their grid usage is updated below)

const StockAdCard: React.FC<{ stock: Stock; animation: 'left' | 'right' }> = ({ stock, animation }) => {
    const { formatCurrency } = useLocalization();
    const isUp = stock.change >= 0;

    const animationVariants = {
        hidden: { opacity: 0, x: animation === 'left' ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, delay: 0.2 } }
    };
    
    const sparklineColor = isUp ? '#28C76F' : '#E53935';

    return (
        <motion.div variants={animationVariants} className="h-full">
            <Card className="cursor-pointer !p-4 flex flex-col h-full">
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-base text-text-primary">{stock.symbol}</p>
                            <p className="text-xs text-text-secondary truncate max-w-[100px]">{stock.name}</p>
                        </div>
                    </div>
                    <div className="my-3 text-center">
                        <p className="text-2xl font-bold text-text-primary">{formatCurrency(stock.price)}</p>
                        <p className={`font-semibold text-xs flex items-center justify-center space-x-1 ${isUp ? 'text-feedback-success' : 'text-feedback-error'}`}>
                            {isUp ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                            <span>{formatCurrency(Math.abs(stock.change))} ({stock.changePercent.toFixed(2)}%)</span>
                        </p>
                    </div>
                    <div className="h-12 -mx-4 -mb-2" style={{ minHeight: 48 }}>
                        <ResponsiveContainer width="100%" height="100%" minHeight={48} minWidth={0}>
                            <AreaChart data={stock.sparkline}>
                                <defs>
                                    <linearGradient id={`sparkline-gradient-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor={sparklineColor} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke={sparklineColor} strokeWidth={2} fill={`url(#sparkline-gradient-${stock.id})`} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <VentyButton onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert(`Trading ${stock.symbol}...`); }} variant="primary" className="mt-3 !py-1.5 !text-xs">
                    Trade
                </VentyButton>
            </Card>
        </motion.div>
    );
};

const TraderAdsSection: React.FC = () => {
    const stock1 = mockStocks[0];
    const stock2 = mockStocks[3];

    return (
        <motion.div 
            className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
            <StockAdCard stock={stock1} animation="left" />
            <StockAdCard stock={stock2} animation="right" />
        </motion.div>
    );
};


interface MarketplaceScreenProps {
    user: User;
    ads: MerchantAd[];
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ user, ads }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [products] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterOption>('forYou');
    const [sortOption, setSortOption] = useState<SortOption>('popular');
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
    
    const displayAds = useMemo(() => ads.filter(ad => ad.status === 'active'), [ads]);
    
    const filteredProducts = useMemo(() => {
        let processedProducts = [...products].filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.merchant.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch(activeFilter) {
            case 'new': processedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
            case 'trending': processedProducts = processedProducts.filter(p => p.isTrending); break;
            case 'offers': processedProducts = processedProducts.filter(p => p.isHotDeal || p.originalPrice); break;
            case 'electronics': processedProducts = processedProducts.filter(p => p.category === 'Electronics & Gadgets'); break;
            case 'under-500': processedProducts = processedProducts.filter(p => p.price < 500); break;
            default: processedProducts.sort((a, b) => (b.merchantInfo?.rating || 0) - (a.merchantInfo?.rating || 0)); break;
        }

        switch(sortOption) {
            case 'price-asc': processedProducts.sort((a, b) => a.price - b.price); break;
            case 'price-desc': processedProducts.sort((a, b) => b.price - a.price); break;
            case 'newest': processedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
            default: break;
        }
        return processedProducts;

    }, [products, activeFilter, sortOption, searchTerm]);

    const visibleProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    const hasMoreProducts = useMemo(() => {
        return visibleCount < filteredProducts.length;
    }, [filteredProducts, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PRODUCTS_PER_PAGE);
    };
    
    const handleFilterClick = (filterId: FilterOption) => {
        setActiveFilter(filterId);
        setVisibleCount(PRODUCTS_PER_PAGE);
    };

    return (
        <PageLayout title="Venty Store" rightAccessory={<HeaderIcons />}>
            <div className="space-y-4 md:space-y-6">
                {/* Controls */}
                <div className="px-4 pt-2 space-y-4">
                    <div className="relative flex items-center">
                        <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-text-tertiary" />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full p-3 pl-12 pr-4 bg-bg-secondary rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-sm"
                        />
                    </div>

                    <div className="flex items-center">
                         <HorizontalScroller activeId={`filter-${activeFilter}`} className="flex-grow">
                             <div className="flex gap-2 py-1">
                                {filters.map(filter => (
                                    <button
                                        id={`filter-${filter.id}`}
                                        key={filter.id}
                                        onClick={() => handleFilterClick(filter.id)}
                                        className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors snap-start whitespace-nowrap ${activeFilter === filter.id ? 'bg-brand-primary text-white' : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary border border-border-primary'}`}
                                    >
                                        {filter.name}
                                    </button>
                                ))}
                            </div>
                        </HorizontalScroller>
                         <div className="relative ml-2 flex-shrink-0">
                             <select 
                                 value={sortOption} 
                                 onChange={(e) => setSortOption(e.target.value as SortOption)}
                                 className="appearance-none bg-bg-secondary rounded-full pl-3 pr-8 py-2 font-semibold text-xs md:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary border border-border-primary"
                            >
                                 <option value="popular">Popular</option>
                                 <option value="newest">Newest</option>
                                 <option value="price-asc">Low $</option>
                                 <option value="price-desc">High $</option>
                             </select>
                             <AdjustmentsHorizontalIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary pointer-events-none"/>
                         </div>
                    </div>
                </div>
                
                {theme === 'trader' && <TraderAdsSection />}

                {/* Ad Carousel */}
                {displayAds.length > 0 && (
                    <div className="px-4">
                         <AdCarousel ads={displayAds} />
                    </div>
                )}
                
                {/* Product Grid */}
                <div className="px-4 pb-4">
                     <motion.div 
                        layout 
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
                    >
                         <AnimatePresence>
                            {visibleProducts.map((product, index) => {
                                const isPromoted = displayAds.some(ad => ad.adType === 'product' && ad.content.productId === product.id);
                                return (
                                   <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: (index % PRODUCTS_PER_PAGE) * 0.03 }}
                                    >
                                        <ProductCard product={product} user={user} isAd={isPromoted} />
                                   </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>

                    {hasMoreProducts && (
                        <div className="text-center mt-8">
                            <VentyButton onClick={handleLoadMore} variant="secondary" className="!w-auto px-6">
                                Load More Products
                            </VentyButton>
                        </div>
                    )}

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-xl font-semibold">No Products Found</h3>
                            <p className="text-text-secondary mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default MarketplaceScreen;
