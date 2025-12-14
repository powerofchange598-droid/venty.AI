import React from 'react';
import { User } from '../types';
import { useFavourites } from '../hooks/useFavourites';
import PageLayout from '../components/PageLayout';
import ProductCard from '../components/ProductCard';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const FavouritesScreen: React.FC<{ user: User }> = ({ user }) => {
    const { favourites } = useFavourites();
    const navigate = useNavigate();

    return (
        <PageLayout title="Your Favourites">
            <div className="p-4 lg:p-6">
                {favourites.length === 0 ? (
                    <Card className="text-center py-16 flex flex-col items-center">
                        <HeartIcon className="h-24 w-24 text-bg-tertiary mb-4" />
                        <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
                        <p className="text-text-secondary mt-2 mb-6 max-w-xs">Tap the star on any product to save it to your list for later.</p>
                        <VentyButton onClick={() => navigate('/market')} className="!w-auto px-6">
                            Browse Products
                        </VentyButton>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {favourites.map(favItem => {
                            // In a real app, you might fetch full product details.
                            // Here, we reconstruct a Product-like object for the card.
                            const product = {
                                id: favItem.productId,
                                title: favItem.name,
                                price: favItem.price,
                                imageUrl: favItem.imageUrl,
                                createdAt: favItem.addedAt,
                                merchant: 'Multiple', // Placeholder
                                category: 'Multiple', // Placeholder
                                stock: 1, // Placeholder
                                ownerId: 'N/A',
                                ownerName: 'N/A',
                                condition: 'New' as const,
                            };
                            return <ProductCard key={product.id} product={product} user={user} />;
                        })}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default FavouritesScreen;