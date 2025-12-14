import { SavingsTip } from '../types';
import { ALL_TIPS } from '../data/tipsData';

const TIPS_STORAGE_KEY = 'venty_shown_tips_v2';
const LAST_ROTATION_KEY = 'venty_tips_last_rotation_v2';
const DAILY_TIPS_KEY = 'venty_daily_tips_v2';
const TIPS_PER_DAY = 3;

// This function will run on the client, so localStorage is available.
export const getDailySavingsTips = (): SavingsTip[] => {
    try {
        const today = new Date().toDateString();
        const lastRotation = localStorage.getItem(LAST_ROTATION_KEY);

        // If it's a new day, generate new tips.
        if (today !== lastRotation) {
            let shownTipIds: string[] = JSON.parse(localStorage.getItem(TIPS_STORAGE_KEY) || '[]');

            let availableTips = ALL_TIPS.filter(tip => !shownTipIds.includes(tip.id));

            if (availableTips.length < TIPS_PER_DAY) {
                // We've cycled through all tips, so reset the shown list.
                shownTipIds = [];
                availableTips = ALL_TIPS;
            }

            // Shuffle and pick new tips for today.
            const shuffled = availableTips.sort(() => 0.5 - Math.random());
            const dailyTips = shuffled.slice(0, TIPS_PER_DAY);

            // Update localStorage for the next day.
            const newShownIds = [...shownTipIds, ...dailyTips.map(t => t.id)];
            localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(newShownIds));
            localStorage.setItem(LAST_ROTATION_KEY, today);
            localStorage.setItem(DAILY_TIPS_KEY, JSON.stringify(dailyTips));
            
            return dailyTips;
        } else {
            // It's the same day, return the tips we already generated.
            const storedDailyTips = localStorage.getItem(DAILY_TIPS_KEY);
            return storedDailyTips ? JSON.parse(storedDailyTips) : [];
        }
    } catch (error) {
        console.error("Error managing daily tips from localStorage:", error);
        // Fallback: return a few random tips without saving state
        return ALL_TIPS.sort(() => 0.5 - Math.random()).slice(0, TIPS_PER_DAY);
    }
};