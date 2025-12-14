import { SavingsTip } from '../types';

// In a real app, this would be a much larger pool of 100+ tips.
export const ALL_TIPS: SavingsTip[] = [
    {
        id: 'tip-001',
        category: 'coffee',
        behavior: 'Spending a lot on daily coffee runs?',
        suggestion: 'Make cafe-quality coffee at home with this Smart Air Fryer that also brews.',
        saving: 'Save ~$50/month',
        productId: 'a1',
    },
    {
        id: 'tip-002',
        category: 'food',
        behavior: 'Buying lunch at work adds up quickly.',
        suggestion: 'Pack your lunch in a stylish, insulated container.',
        saving: 'Save ~$100/month',
        // No specific product, links to market
    },
    {
        id: 'tip-003',
        category: 'fashion',
        behavior: 'Refreshing your wardrobe for the new season?',
        suggestion: 'Get this versatile Cotton T-Shirt, now on sale.',
        saving: 'Save 15% on this item',
        productId: 'c1',
    },
    {
        id: 'tip-004',
        category: 'subscriptions',
        behavior: 'Paying for multiple streaming services?',
        suggestion: 'Consolidate with a Venty Streaming 1-Year Subscription bundle.',
        saving: 'Save ~$20/month',
        productId: 'sd1',
    },
    {
        id: 'tip-005',
        category: 'transport',
        behavior: 'High fuel costs from your daily commute?',
        suggestion: 'Consider an electric scooter for short trips.',
        saving: 'Save on fuel costs',
    },
    {
        id: 'tip-006',
        category: 'electronics',
        behavior: 'Need a tech upgrade but waiting for a sale?',
        suggestion: 'This Smartwatch has a limited-time discount!',
        saving: 'Save $25 today',
        productId: 'e2',
    },
    {
        id: 'tip-007',
        category: 'lifestyle',
        behavior: 'Want to get fit without a pricey gym membership?',
        suggestion: 'This Eco-Friendly Yoga Mat is perfect for home workouts.',
        saving: 'Save on gym fees',
        productId: 'gf1',
    },
    {
        id: 'tip-008',
        category: 'fashion',
        behavior: 'Looking for quality denim that lasts?',
        suggestion: 'These Denim Jeans are on sale and built to last.',
        saving: 'Save 10% now',
        productId: 'c2',
    },
    {
        id: 'tip-009',
        category: 'food',
        behavior: 'Tired of paying for expensive cooking oils?',
        suggestion: 'Buy in bulk with this 3L Cooking Oil and save.',
        saving: 'Save on pantry staples',
        productId: 'p2',
    },
    {
        id: 'tip-010',
        category: 'electronics',
        behavior: 'Phone battery always dying on the go?',
        suggestion: 'Grab this high-capacity Power Bank.',
        saving: 'Avoid costly cafe charges',
        productId: 'e3',
    }
];