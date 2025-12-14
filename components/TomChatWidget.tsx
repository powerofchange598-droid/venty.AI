import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, BudgetCategory, Message } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useLocalization } from '../hooks/useLocalization';
import { mockFamily } from '../data/mockData';
import { PaperAirplaneIcon, XMarkIcon, MinusIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid';
import { runAiChat } from '../lib/aiHandler';
import ChatMessage from './chat/ChatMessage';
import { motion, useMotionValue } from 'framer-motion';

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 w-full justify-start p-4">
        <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center flex-shrink-0">
            {/* Placeholder for icon */}
        </div>
        <div className="max-w-md lg:max-w-lg p-3 rounded-2xl chat-bubble-model rounded-bl-none">
            <div className="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    </div>
);

interface TomChatWidgetProps {
    user: User | null;
    budget: BudgetCategory[];
    isPremiumUser: boolean;
}

const TomChatWidget: React.FC<TomChatWidgetProps> = ({ user, budget, isPremiumUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { language } = useLocalization();

    // Draggable FAB state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const savedPosRaw = localStorage.getItem('venty-fab-pos');
        if (savedPosRaw) {
            try {
                const savedPos = JSON.parse(savedPosRaw);
                x.set(savedPos.x);
                y.set(savedPos.y);
            } catch (e) {
                console.error("Failed to parse FAB position from localStorage");
            }
        }
    }, [x, y]); // Run only once on mount
    
    useEffect(() => {
        if (user && messages.length === 0) {
             setMessages([{ role: 'model', content: `Hi ${user.name}! I'm Tom, your adaptive AI assistant. How can I help you today?` }]);
        }
    }, [user, messages.length]);

    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading, isMinimized]);
    
    const handleFabClick = () => {
        setIsOpen(true);
        setIsMinimized(false);
    };
    
    const handleClose = () => setIsOpen(false);
    const handleMinimize = () => setIsMinimized(true);
    const handleExpand = () => setIsMinimized(false);
    
    const handleDragEnd = (event: any, info: any) => {
        // info.offset contains the delta from the original CSS position
        localStorage.setItem('venty-fab-pos', JSON.stringify(info.offset));
    };

    const handleSendMessage = useCallback(async () => {
        if (!user || !userInput.trim() || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: userInput.trim() }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const historyForAI = newMessages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        }));

        const response = await runAiChat(historyForAI, userInput.trim(), user, language, isPremiumUser);
        
        setMessages(prev => [...prev, { role: 'model', content: response.text }]);
        setIsLoading(false);
    }, [userInput, isLoading, messages, user, language, isPremiumUser]);

    if (!user || user.isGuest) {
        return null;
    }

    if (!isOpen) {
        return (
            <motion.button
                drag
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x, y }}
                onClick={handleFabClick}
                className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 bg-text-primary text-bg-primary p-4 rounded-full shadow-lg z-[110] fab-ripple cursor-grab active:cursor-grabbing focus:outline-none"
                aria-label="Open financial assistant"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            >
                <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
            </motion.button>
        );
    }

    return (
        <div className={`fixed bottom-24 right-4 lg:bottom-8 lg:right-8 w-[calc(100%-2rem)] max-w-sm z-[120] flex flex-col bg-bg-secondary rounded-2xl shadow-2xl border border-border-primary transition-all duration-300 ${isMinimized ? 'h-auto' : 'h-auto max-h-[70vh] sm:max-h-[60vh]'}`}>
            <header className="flex items-center justify-between p-3 border-b border-border-primary flex-shrink-0 cursor-pointer" onClick={isMinimized ? handleExpand : undefined}>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <div className="flex items-center space-x-2">
                    {isMinimized ? (
                        <button onClick={(e) => { e.stopPropagation(); handleExpand(); }} className="p-1 text-text-secondary hover:text-text-primary"><ArrowsPointingOutIcon className="h-5 w-5"/></button>
                    ) : (
                        <button onClick={(e) => { e.stopPropagation(); handleMinimize(); }} className="p-1 text-text-secondary hover:text-text-primary"><MinusIcon className="h-5 w-5"/></button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); handleClose(); }} className="p-1 text-text-secondary hover:text-text-primary"><XMarkIcon className="h-5 w-5"/></button>
                </div>
            </header>

            {!isMinimized && (
                <>
                    <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto chat-scroll-area">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} isLastMessage={index === messages.length - 1 && msg.role === 'model'} />
                        ))}
                        {isLoading && <TypingIndicator />}
                    </div>

                    <div className="p-3 border-t border-border-primary flex-shrink-0">
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full"
                                disabled={isLoading}
                            />
                            <button type="submit" className="p-3 bg-text-primary text-bg-primary rounded-lg disabled:opacity-50" disabled={isLoading || !userInput.trim()}>
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default TomChatWidget;