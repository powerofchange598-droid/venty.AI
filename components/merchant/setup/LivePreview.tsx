

import React from 'react';
import { StoreConfig } from '../../../types';
import { useTranslation } from 'react-i18next';

interface LivePreviewProps {
    config: StoreConfig;
}

const fontClasses: Record<StoreConfig['branding']['fontPair'], string> = {
    Modern: 'font-sans',
    Classic: 'font-serif',
    Playful: 'font-mono',
};

const LivePreview: React.FC<LivePreviewProps> = ({ config }) => {
    const { t } = useTranslation();

    const dynamicStyles = {
        '--theme-primary': config.branding.palette.primary,
        '--theme-secondary': config.branding.palette.secondary,
        '--theme-accent': config.branding.palette.accent,
        '--theme-background': config.branding.palette.background,
        '--theme-text': config.branding.palette.text,
    } as React.CSSProperties;

    return (
        <div style={dynamicStyles} className={`w-full h-full border border-bg-tertiary rounded-lg shadow-md ${fontClasses[config.branding.fontPair]}`}>
            <div className="h-full overflow-y-auto w-full bg-[color:var(--theme-background)] text-[color:var(--theme-text)]">
                <header className="p-4 flex justify-between items-center border-b" style={{ borderColor: 'var(--theme-accent)' }}>
                    <h1 className="font-bold text-lg" style={{ color: 'var(--theme-primary)' }}>{config.branding.storeName || t('storeSetup.branding.defaultStoreName')}</h1>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--theme-secondary)' }}></div>
                </header>
                {config.hero.isEnabled && (
                    <section className="relative h-32" style={{ backgroundColor: 'var(--theme-secondary)' }}>
                        <img src={config.hero.imageUrl || 'https://picsum.photos/seed/placeholder/1200/400'} alt="Hero" className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-2">
                            <h2 className="text-sm font-bold">{config.hero.headline || t('storeSetup.branding.defaultHeroHeadline')}</h2>
                        </div>
                    </section>
                )}
                <div className="p-4">
                    <h3 className="font-bold text-base mb-2" style={{ color: 'var(--theme-primary)' }}>{t('storeSetup.sections.featuredProducts')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                         {[1, 2, 3, 4].map(i => (
                             <div key={i} className="bg-bg-primary rounded-md p-2">
                                <div className="aspect-square bg-bg-tertiary rounded-sm"></div>
                                <p className="text-sm font-semibold mt-1">Product {i}</p>
                                <p className="text-xs" style={{ color: config.branding.palette.primary }}>$10.00</p>
                            </div>
                         ))}
                    </div>
                </div>
                <footer className="p-2 border-t mt-4 text-center text-xs" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-text)' }}>
                    <p>&copy; {new Date().getFullYear()} {config.branding.storeName || 'Venty Store'}</p>
                </footer>
            </div>
        </div>
    );
};

export default LivePreview;