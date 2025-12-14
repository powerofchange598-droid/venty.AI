// A simple interface for items that can be sorted by this utility.
interface SortableBudgetItem {
    priority: 'High' | 'Medium' | 'Low';
    amount: number;
}

// Defines the order of priorities.
const priorityOrder: Record<'High' | 'Medium' | 'Low', number> = {
    High: 1,
    Medium: 2,
    Low: 3,
};

/**
 * Sorts an array of budget items.
 * The primary sorting criterion is priority (High > Medium > Low).
 * The secondary sorting criterion is the amount in descending order for items with the same priority.
 * 
 * @param items - An array of objects conforming to the SortableBudgetItem interface.
 * @returns A new array with the sorted items.
 */
export const sortBudgetItems = <T extends SortableBudgetItem>(items: T[]): T[] => {
    // Create a shallow copy to avoid mutating the original array.
    const sortedItems = [...items];

    sortedItems.sort((a, b) => {
        // Compare by priority first.
        const priorityDifference = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        // If priorities are the same, sort by amount in descending order.
        return b.amount - a.amount;
    });

    return sortedItems;
};
