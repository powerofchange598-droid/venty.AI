import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './useToast';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    subtotal: number;
    deliveryFee: number;
    promoDiscount: number;
    grandTotal: number;
    applyPromoCode: (code: string) => boolean;
    promoCode: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODE = "SAVE20";
const PROMO_DISCOUNT_PERCENT = 0.20;
const MAX_PROMO_DISCOUNT = 100;
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 25;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const { showToast } = useToast();

    const removeFromCart = useCallback((productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    const addToCart = useCallback((product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl, quantity: 1 }];
        });
        showToast(`${product.title} added to cart!`);
    }, [showToast]);

    const updateQuantity = useCallback((productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setItems(prevItems => prevItems.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        }
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setItems([]);
        setPromoCode(null);
    }, []);
    
    const applyPromoCode = useCallback((code: string) => {
        if (code.toUpperCase() === PROMO_CODE) {
            setPromoCode(PROMO_CODE);
            return true;
        }
        setPromoCode(null);
        return false;
    }, []);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    
    const deliveryFee = useMemo(() => subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0, [subtotal]);

    const promoDiscount = useMemo(() => {
        if (promoCode === PROMO_CODE) {
            const discount = subtotal * PROMO_DISCOUNT_PERCENT;
            return Math.min(discount, MAX_PROMO_DISCOUNT);
        }
        return 0;
    }, [subtotal, promoCode]);

    const grandTotal = useMemo(() => subtotal + deliveryFee - promoDiscount, [subtotal, deliveryFee, promoDiscount]);
    
    const value = useMemo(() => ({
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        promoDiscount,
        grandTotal,
        applyPromoCode,
        promoCode,
    }), [
        items, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart, 
        subtotal, 
        deliveryFee, 
        promoDiscount, 
        grandTotal, 
        applyPromoCode, 
        promoCode
    ]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
