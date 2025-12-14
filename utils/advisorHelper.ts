import { User, BudgetCategory } from '../types';
import { mockInvestmentOptions } from '../data/mockData';

export interface InvestmentNudge {
    categoryName: string;
    categoryEmoji: string;
    cutPercentage: number;
    potentialSaving: number;
    suggestedInvestment: {
        name: string;
        category: string;
    };
}

// Find a simple, common investment suggestion
const getSimpleInvestmentSuggestion = (): { name: string; category: string } => {
    const etf = mockInvestmentOptions.find(o => o.ticker === 'VOO'); // S&P 500 ETF
    const gold = mockInvestmentOptions.find(o => o.ticker === 'XAU'); // Gold
    
    // Return a default if not found, though they are hardcoded
    if (!etf || !gold) return { name: 'an Index Fund', category: 'ETF'};
    
    // Randomly pick one for variety
    return Math.random() > 0.5 ? 
        { name: etf.name, category: etf.type } : 
        { name: gold.name, category: gold.type };
};

export const generateInvestmentNudge = (user: User, budget: BudgetCategory[]): InvestmentNudge | null => {
    // Find the highest spending category that is not 'Savings'
    const highSpendingCategory = [...budget]
        .filter(cat => cat.name !== 'Savings' && cat.spent > 0)
        .sort((a, b) => b.spent - a.spent)[0];

    if (!highSpendingCategory || highSpendingCategory.spent < 200) { // Don't generate if spending is too low
        return null;
    }

    const cutPercentage = 5; // A small, achievable percentage
    const potentialSaving = Math.round(highSpendingCategory.spent * (cutPercentage / 100));

    if (potentialSaving < 10) { // Don't generate if savings are negligible
        return null;
    }

    const suggestedInvestment = getSimpleInvestmentSuggestion();

    return {
        categoryName: highSpendingCategory.name,
        categoryEmoji: highSpendingCategory.icon,
        cutPercentage,
        potentialSaving,
        suggestedInvestment,
    };
};