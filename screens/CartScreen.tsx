import React, { useState } from 'react';
import { User, CartItem } from '../types';
import { useCart } from '../hooks/useCart';
import { useLocalization } from '../hooks/useLocalization';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const CartItemRow: React.FC<{ item: CartItem; onUpdate: (id: string, qty: number) => void; onRemove: (id: string) => void; formatCurrency: (val: number) => string }> = ({ item, onUpdate, onRemove, formatCurrency }) => {
    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg bg-bg-primary">
            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-md object-cover" loading="lazy" />
            <div className="flex-grow">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-text-secondary">{formatCurrency(item.price)}</p>
                <div className="flex items-center space-x-3 mt-2">
                    <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="p-1 rounded-full bg-bg-tertiary"><MinusIcon className="h-4 w-4" /></button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="p-1 rounded-full bg-bg-tertiary"><PlusIcon className="h-4 w-4" /></button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg">{formatCurrency(item.price * item.quantity)}</p>
                <button onClick={() => onRemove(item.id)} className="text-feedback-error mt-2"><TrashIcon className="h-5 w-5"/></button>
            </div>
        </div>
    );
};

interface CartScreenProps {
    user: User;
    onCheckout: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ user, onCheckout }) => {
    const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, grandTotal } = useCart();
    const { formatCurrency } = useLocalization();
    
    return (
        <PageLayout title="Shopping Cart">
            <div className="p-4 lg:p-6 space-y-4 pb-24 lg:pb-4">
                {items.length === 0 ? (
                    <Card className="text-center py-16">
                        <h2 className="text-2xl font-bold">Your cart is empty</h2>
                        <p className="text-text-secondary mt-2">Looks like you haven't added anything yet.</p>
                    </Card>
                ) : (
                    <>
                        <div className="space-y-3">
                            {items.map(item => (
                                <CartItemRow 
                                    key={item.id} 
                                    item={item} 
                                    onUpdate={updateQuantity}
                                    onRemove={removeFromCart}
                                    formatCurrency={formatCurrency}
                                />
                            ))}
                        </div>

                        <Card>
                            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between"><p>Subtotal</p><p className="font-semibold">{formatCurrency(subtotal)}</p></div>
                                <div className="flex justify-between"><p>Delivery Fee</p><p className="font-semibold">{deliveryFee > 0 ? formatCurrency(deliveryFee) : 'FREE'}</p></div>
                                
                                <div className="border-t border-bg-tertiary my-2"></div>
                                <div className="flex justify-between text-xl font-bold"><p>Grand Total</p><p>{formatCurrency(grandTotal)}</p></div>
                            </div>
                        </Card>

                        
                        
                        <div className="lg:static fixed bottom-20 left-4 right-4 z-10">
                             <VentyButton onClick={onCheckout}>Proceed to Checkout</VentyButton>
                        </div>
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export default CartScreen;
