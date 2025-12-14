import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface ChatMessageProps {
    message: Message;
    isLastMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLastMessage }) => {
    const { theme } = useTheme();
    const isModel = message.role === 'model';
    const animatedText = useTypingEffect(isModel && isLastMessage ? message.content : '');

    const displayText = isModel && isLastMessage ? animatedText : message.content;

    const Icon = isModel ? SparklesIcon : UserIcon;
    const iconColor = isModel ? 'text-amber-500' : 'text-blue-500';

    return (
        <motion.div
            className={`flex items-start gap-3 w-full ${isModel ? 'justify-start' : 'justify-end'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isModel && (
                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center flex-shrink-0">
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
            )}
            <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${isModel ? `chat-bubble-model rounded-bl-none` : 'chat-bubble-user text-white rounded-br-none'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: displayText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
            </div>
            {!isModel && (
                 <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center flex-shrink-0">
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
            )}
        </motion.div>
    );
};

export default memo(ChatMessage);