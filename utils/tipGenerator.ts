import { User, BudgetCategory, Goal, DailyTip } from '../types';

// Helper to format currency consistently within tips
const formatCurrencyForTip = (value: number) => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return `$${value}`;
    }
}

/**
 * A tiny, on-device rule engine to generate personalized financial tips.
 * @param user The current user object.
 * @param budget The user's budget categories with spending.
 * @param familyGoals The family's shared financial goals.
 * @returns An array of up to 3 personalized DailyTip objects with i18n keys.
 */
export const generateDailyTips = (
    user: User,
    budget: BudgetCategory[],
    familyGoals: Goal[]
): DailyTip[] => {
    const tips: DailyTip[] = [];

    // Rule 1: High spending on "Entertainment" (proxy for coffee/dining) + a family trip goal
    const entertainmentSpend = budget.find(c => c.name === 'Entertainment')?.spent || 0;
    const familyTripGoal = familyGoals.find(g => g.name.toLowerCase().includes('trip'));

    if (entertainmentSpend > 400 && familyTripGoal && tips.length < 3) {
        const potentialSaving = Math.round(entertainmentSpend * 0.8);
        const progressIncrease = Math.round((potentialSaving / familyTripGoal.targetAmount) * 100 * 12); // rough annual estimate
        
        tips.push({
            id: 'tip_coffee',
            icon: '☕',
            titleKey: 'tips.coffee.title',
            bodyKey: 'tips.coffee.body',
            bodyValues: {
                savings: formatCurrencyForTip(potentialSaving),
                progress: progressIncrease.toString()
            }
        });
    }
    
    // Rule 2: High spending on "Transport"
    const transportSpend = budget.find(c => c.name === 'Transport')?.spent || 0;
    if (transportSpend > 700 && tips.length < 3) {
        const potentialSaving = Math.round(transportSpend * 0.2);
         tips.push({
            id: 'tip_transport',
            icon: '🚗',
            titleKey: 'tips.transport.title',
            bodyKey: 'tips.transport.body',
            bodyValues: { savings: formatCurrencyForTip(potentialSaving) }
        });
    }

    // Rule 3: High spending on "Groceries"
    const grocerySpend = budget.find(c => c.name === 'Groceries')?.spent || 0;
    if (grocerySpend > 1800 && tips.length < 3) {
        const potentialSaving = Math.round(grocerySpend * 0.15);
        tips.push({
            id: 'tip_groceries',
            icon: '🛒',
            titleKey: 'tips.groceries.title',
            bodyKey: 'tips.groceries.body',
            bodyValues: { savings: formatCurrencyForTip(potentialSaving) }
        });
    }
    
    // Rule 4: High spending on "Clothing"
    const clothingSpend = budget.find(c => c.name === 'Clothing')?.spent || 0;
    if (clothingSpend > 500 && tips.length < 3) {
         tips.push({
            id: 'tip_clothing',
            icon: '👕',
            titleKey: 'tips.clothing.title',
            bodyKey: 'tips.clothing.body',
        });
    }

    // Generic fallback tip if no specific rules match
    if (tips.length === 0) {
        tips.push({
            id: 'tip_generic_review',
            icon: '💡',
            titleKey: 'tips.generic_review.title',
            bodyKey: 'tips.generic_review.body',
        });
    }
    
    return tips;
};