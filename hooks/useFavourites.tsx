import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo } from 'react';
import { FavouriteItem, Product } from '../types';

interface FavouritesContextType {
    favourites: FavouriteItem[];
    toggleFavourite: (product: Product) => void;
    isFavourite: (productId: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

    const isFavourite = useCallback((productId: string) => {
        return favourites.some(item => item.productId === productId);
    }, [favourites]);

    const toggleFavourite = useCallback((product: Product) => {
        setFavourites(prevFavourites => {
            const existingIndex = prevFavourites.findIndex(item => item.productId === product.id);
            if (existingIndex > -1) {
                // Remove from favourites
                return prevFavourites.filter(item => item.productId !== product.id);
            } else {
                // Add to favourites
                const newFavourite: FavouriteItem = {
                    productId: product.id,
                    name: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    addedAt: new Date().toISOString(),
                };
                return [...prevFavourites, newFavourite];
            }
        });
    }, []);

    const value = useMemo(() => ({
        favourites,
        toggleFavourite,
        isFavourite,
    }), [favourites, toggleFavourite, isFavourite]);

    return (
        <FavouritesContext.Provider value={value}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};