import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string = "", speed: number = 20) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset when new text is provided
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalId);
                }
            }, speed);
            return () => clearInterval(intervalId);
        }
    }, [text, speed]);

    return displayedText;
};
