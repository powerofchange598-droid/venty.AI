import React, { ReactNode, memo } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, style }) => {
    // Use the global .card class and append any additional classes.
    const cardClasses = `card ${onClick ? 'cursor-pointer' : ''} ${className}`;
    
    return (
        <div 
            className={cardClasses} 
            onClick={onClick} 
            style={style}
        >
            {children}
        </div>
    );
};

export default memo(Card);
