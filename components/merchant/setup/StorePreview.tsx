import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreConfig, Product, User } from '../../../types';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import VentyButton from '../../../components/VentyButton';
import ProductCard from '../../../components/ProductCard'; // Re-using the main product card for consistency

interface StorePreviewProps {
    config: StoreConfig;
    products: Product[];
    viewMode: 'desktop' | 'mobile';
    user: User;
}

const fontClasses: Record<StoreConfig['branding']['fontPair'], string> = {
    Modern: 'font-sans',
    Classic: 'font-serif',
    Playful: 'font-mono',
};

const gridClasses: Record<StoreConfig['layout']['gridStyle'], string> = {
    '2x2': 'grid-cols-2',
    '3x3': 'grid-cols-3',
    'list': 'grid-cols-1',
    'masonry': 'grid-cols-2', // Simplified for preview
};

const cardClasses: Record<StoreConfig['layout']['cardStyle'], string> = {
    'hard-shadow': 'shadow-lg',
    'soft-shadow': 'shadow-md',
    'border': 'border',
};

const cardRadiusClasses: Record<StoreConfig['layout']['cardBorderRadius'], string> = {
    'sharp': 'rounded-none',
    'rounded': 'rounded-lg',
    'very-rounded': 'rounded-2xl',
};

const StorePreview: React.FC<StorePreviewProps> = ({ config, products, viewMode, user }) => {
    
    const dynamicStyles = {
        '--theme-primary': config.branding.palette.primary,
        '--theme-secondary': config.branding.palette.secondary,
        '--theme-accent': config.branding.palette.accent,
        '--theme-background': config.branding.palette.background,
        '--theme-text': config.branding.palette.text,
    } as React.CSSProperties;

    return (
        <div className={`store-preview-frame ${viewMode}`} style={dynamicStyles}>
            <div className={`w-full h-full overflow-y-auto bg-[color:var(--theme-background)] text-[color:var(--theme-text)] ${fontClasses[config.branding.fontPair]}`}>
                {/* Header */}
                <header className="p-4 flex justify-between items-center border-b sticky top-0 bg-[color:var(--theme-background)]/80 backdrop-blur-sm z-10" style={{ borderColor: 'var(--theme-accent)' }}>
                    <div className="flex items-center gap-2">
                        {(config.branding as any).logoUrl && <img src={(config.branding as any).logoUrl} alt="logo" className="w-8 h-8 rounded-full object-cover"/>}
                        <h1 className="font-bold text-lg" style={{ color: 'var(--theme-primary)' }}>{config.branding.storeName}</h1>
                        <CheckBadgeIcon className="h-5 w-5" style={{ color: 'var(--theme-primary)' }}/>
                    </div>
                </header>

                {/* Hero Section */}
                <AnimatePresence>
                {config.hero.isEnabled && (
                    <motion.section 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative aspect-[2/1] bg-cover bg-center" 
                        style={{ backgroundColor: 'var(--theme-secondary)', backgroundImage: `url(${config.hero.imageUrl || 'https://picsum.photos/seed/hero/1200/600'})` }}
                    >
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                            <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }} className="text-2xl font-bold">{config.hero.headline}</motion.h2>
                            {config.hero.subtitle && <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }} className="mt-1 text-sm">{config.hero.subtitle}</motion.p>}
                        </div>
                    </motion.section>
                )}
                </AnimatePresence>
                
                {/* Products Grid */}
                <main className="p-4">
                    <motion.div layout className={`grid gap-4 ${gridClasses[config.layout.gridStyle]}`}>
                        <AnimatePresence>
                        {products.map((product, i) => (
                            <motion.div 
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`bg-[color:var(--theme-secondary)] ${cardRadiusClasses[config.layout.cardBorderRadius]} ${cardClasses[config.layout.cardStyle]}`}
                                style={{ borderColor: 'var(--theme-accent)' }}
                            >
                                {/* We can't reuse ProductCard directly as it has its own styles. 
                                   This is a simplified version for the preview. */}
                                <div>
                                    <div className={`aspect-square w-full overflow-hidden ${cardRadiusClasses[config.layout.cardBorderRadius]} rounded-b-none`}>
                                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover"/>
                                    </div>
                                    <div className="p-2">
                                        <h3 className="font-semibold text-sm truncate">{product.title}</h3>
                                        <p className="font-bold text-sm" style={{color: 'var(--theme-primary)'}}>${product.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default StorePreview;