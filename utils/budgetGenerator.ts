import { BudgetCategory } from '../types';

export const generateInitialBudget = (disposableIncome: number): BudgetCategory[] => {
    if (disposableIncome <= 0) return [];

    // Base distribution of disposable income for variable spending
    const baseDistribution: Record<string, number> = {
        'Groceries': 0.30,
        'Transport': 0.15,
        'Entertainment': 0.15,
        'Clothing': 0.10,
        'Savings': 0.20,
        'Miscellaneous': 0.10,
    };

    // Normalize percentages to sum back to 1
    const totalAdjusted = Object.values(baseDistribution).reduce((sum, val) => sum + val, 0);
    
    const finalBudget: BudgetCategory[] = [
        { id: '1', name: 'Groceries', icon: '🛒', spent: 0, allocated: (baseDistribution['Groceries'] / totalAdjusted) * 100 },
        { id: '3', name: 'Transport', icon: '🚗', spent: 0, allocated: (baseDistribution['Transport'] / totalAdjusted) * 100 },
        { id: '8', name: 'Entertainment', icon: '🎬', spent: 0, allocated: (baseDistribution['Entertainment'] / totalAdjusted) * 100 },
        { id: '6', name: 'Clothing', icon: '👕', spent: 0, allocated: (baseDistribution['Clothing'] / totalAdjusted) * 100 },
        { id: 'savings', name: 'Savings', icon: '💰', spent: 0, allocated: (baseDistribution['Savings'] / totalAdjusted) * 100 },
        { id: '10', name: 'Miscellaneous', icon: '📦', spent: 0, allocated: (baseDistribution['Miscellaneous'] / totalAdjusted) * 100 },
    ];
    
    return finalBudget;
};