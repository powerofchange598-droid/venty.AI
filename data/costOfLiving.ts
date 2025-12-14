// Maps budget categories to multipliers for different countries.
// Baseline is 'US'. >1 means more expensive, <1 means less expensive.
const COST_OF_LIVING_DATA: Record<string, Record<string, number>> = {
    'US': { // Baseline
        'Groceries': 1.0,
        'Transport': 1.0,
        'Housing': 1.0, // Rent/Mortgage
        'Utilities': 1.0,
        'Entertainment': 1.0,
    },
    'EG': { // Egypt
        'Groceries': 0.6,
        'Transport': 0.3,
        'Housing': 0.4,
        'Utilities': 0.3,
        'Entertainment': 0.5,
    },
    'SA': { // Saudi Arabia
        'Groceries': 0.8,
        'Transport': 0.5,
        'Housing': 0.9,
        'Utilities': 0.4,
        'Entertainment': 1.2,
    },
};

export const getCostOfLivingMultipliers = (countryCode: string): Record<string, number> => {
    return COST_OF_LIVING_DATA[countryCode] || COST_OF_LIVING_DATA['US'];
};
