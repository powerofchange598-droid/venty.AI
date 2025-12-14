import { User } from '../types';

export interface TomReply {
    text: string;
    action?: 'SETUP_STORE' | 'SHOW_INVESTMENTS';
}

const replies = {
    initialGreeting: "Hey there! I'm Tom, your personal finance coach. What's on your mind? Feel free to ask me anything about budgeting, saving, or investing.",
    cluelessReply: "No worries! Everyone starts somewhere. ☕️ Let's make it simple. Step 1: For just one week, write down every single dollar you spend. Don't judge, just track. Step 2: Look for easy wins, like cutting back on cafe coffee. Making it at home can save you a surprising amount! Ready for Step 3?",
    tightBudgetReply: "A tight budget is an opportunity, not a problem! 💡 First, look around for things you don't use anymore—an old phone, clothes, etc.—and sell them. Second, how about starting a small side-hustle right here in Venty? You could sell accessories to women; the margins are great!",
    investingReply: "Investing is the best way to grow your wealth. A simple strategy is to invest 10% of every bit of income you get into a low-cost index fund. It's a proven way to build wealth over time. Want me to show you some options?",
    defaultReply: "That's a great question. Let's break it down. First, we need to understand your current spending habits. Have you tried tracking your expenses for a week?"
};

export const getTomReply = (userInput: string, user: User): TomReply => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput === 'initial') {
        return { text: replies.initialGreeting };
    }

    if (lowerInput.includes('clueless') || lowerInput.includes('budget')) {
        return { text: replies.cluelessReply };
    }

    if (lowerInput.includes('tight') || lowerInput.includes('income')) {
        return { text: replies.tightBudgetReply, action: 'SETUP_STORE' };
    }
    
    if (lowerInput.includes('invest')) {
        return { text: replies.investingReply, action: 'SHOW_INVESTMENTS' };
    }

    // Default reply if no keywords match
    return { text: replies.defaultReply };
};