import { PaymentGateway } from '../types';

export const ALL_GATEWAYS: PaymentGateway[] = [
    // Global
    {
        id: 'visa_mastercard',
        name: 'Visa / Mastercard',
        type: 'Credit Card',
        logoUrl: '/payment-icons/webp/visa-mastercard.webp', // Combined logo
        description: 'Global card payments',
        isLocal: false,
        comingSoon: true,
    },
    {
        id: 'paypal',
        name: 'PayPal',
        type: 'Online Gateway',
        logoUrl: '/payment-icons/webp/paypal.webp',
        description: 'International e-wallet',
        isLocal: false,
    },
    {
        id: 'payoneer',
        name: 'Payoneer',
        type: 'Online Gateway',
        logoUrl: '/payment-icons/webp/payoneer.webp',
        description: 'Global business payments',
        isLocal: false,
    },
    {
        id: 'stripe',
        name: 'Stripe',
        type: 'Online Gateway',
        logoUrl: '/payment-icons/webp/stripe.webp',
        description: 'Online payment processing',
        isLocal: false,
    },
    {
        id: 'google_pay',
        name: 'Google Pay',
        type: 'Mobile Wallet',
        logoUrl: '/payment-icons/webp/google-pay.webp',
        description: 'For Android devices',
        isLocal: false,
    },
    {
        id: 'apple_pay',
        name: 'Apple Pay',
        type: 'Mobile Wallet',
        logoUrl: '/payment-icons/webp/apple-pay.webp',
        description: 'For Apple devices',
        isLocal: false,
    },
    // Local (Egypt)
    {
        id: 'vodafone_cash',
        name: 'Vodafone Cash 🇪🇬',
        type: 'Mobile Wallet',
        logoUrl: '/payment-icons/webp/vodafone-cash.webp',
        description: 'Local mobile wallet',
        isLocal: true,
    },
    {
        id: 'instapay',
        name: 'InstaPay 🇪🇬',
        type: 'Bank Transfer',
        logoUrl: '/payment-icons/webp/instapay.webp',
        description: 'Instant bank transfers',
        isLocal: true,
    },
    {
        id: 'fawry',
        name: 'Fawry 🇪🇬',
        type: 'Bank Transfer',
        logoUrl: '/payment-icons/webp/fawry.webp',
        description: 'Cash payment network',
        isLocal: true,
    },
     // Not requested, but good to have one more global
    {
        id: 'banwire',
        name: 'Banwire',
        type: 'Online Gateway',
        logoUrl: '/payment-icons/webp/banwire.webp', 
        description: 'Mexican payment gateway',
        isLocal: false,
    },
];
