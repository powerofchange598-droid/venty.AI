import React, { useState } from 'react';
import Card from './Card';
import VentyButton from './VentyButton';
import { XMarkIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid';

// Simple SVG icons for social media
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16.75 13.96c.25.13.43.2.5.25.13.06.16.25.06.5-.1.25-.63.75-1.13 1s-1 .25-1.5-.06c-.5-.31-1.88-1.5-2.88-2.63-.81-.88-1.25-1.75-1.44-2.19-.19-.44-.06-.69.19-.94.25-.25.5-.63.69-.88.19-.25.25-.44.13-.69-.13-.25-.5-.63-.69-.88s-.44-.31-.69-.31c-.25 0-1.13.5-1.13 1.13 0 .63.5 1.88 1.13 2.88.63 1 1.88 2.75 4.38 3.5 1.5.44 2.06.5 2.56.5.5 0 1.13-.25 1.38-.94.25-.69-.19-1.13-.44-1.38-.25-.25-.5-.38-.69-.44-.19-.06-1.06-.5-1.19-.56-.13-.06-.25-.13-.38-.06s-.25.5-.31.63c-.06.13-.13.19-.19.13z M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17,2H7C4.2,2,2,4.2,2,7v10c0,2.8,2.2,5,5,5h5.2v-7H9.9v-2.8h2.3v-2c0-2.3,1.4-3.6,3.5-3.6c1,0,1.8,0.1,2.1,0.1v2.5 h-1.5c-1.1,0-1.3,0.5-1.3,1.3v1.7h2.8l-0.4,2.8h-2.4V22H17c2.8,0,5-2.2,5-5V7C22,4.2,19.8,2,17,2z"></path></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M22.46,6c-.77.35-1.6.58-2.46.67.88-.53,1.56-1.37,1.88-2.38-.83.5-1.75.85-2.72,1.05C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29,0,.34,.04,.67,.11,1-3.56-.18-6.71-1.89-8.82-4.48-.37.63-.58,1.37-.58,2.15,0,1.49,.75,2.81,1.91,3.58-.7,0-1.36-.21-1.94-.54v.05c0,2.08,1.48,3.82,3.44,4.21-.36.1-.74.15-1.14.15-.28,0-.55-.03-.81-.08.55,1.7,2.14,2.94,4.03,2.97-1.47,1.15-3.32,1.83-5.33,1.83-.35,0-.69-.02-1.03-.06,1.9,1.22,4.16,1.93,6.6,1.93,7.92,0,12.25-6.56,12.25-12.25,0-.19,0-.37-.01-.56.84-.6,1.56-1.36,2.14-2.22z"></path></svg>;

interface ShareModalProps {
    title: string;
    subtitle?: string;
    text: string;
    url: string;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ title, subtitle, text, url, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    return (
        <div className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex justify-center items-center p-4 z-50" onClick={onClose}>
            <Card className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose}><XMarkIcon className="h-6 w-6" /></button>
                </div>
                
                {subtitle && <p className="text-text-secondary text-sm mb-4">{subtitle}</p>}
                
                <p className="text-text-secondary text-sm mb-4">Share this link via</p>
                <div className="flex justify-center space-x-4 mb-6">
                     <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"><WhatsAppIcon /></a>
                     <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><FacebookIcon /></a>
                     <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"><TwitterIcon /></a>
                </div>
                
                <p className="text-text-secondary text-sm mb-2">Or copy link</p>
                <div className="flex space-x-2">
                    <input type="text" readOnly value={url} className="w-full p-2 bg-bg-primary rounded-lg border border-border-primary" />
                    <VentyButton onClick={handleCopy} variant="secondary" className="!w-auto !px-4">
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        {copied ? 'Copied!' : 'Copy'}
                    </VentyButton>
                </div>
            </Card>
        </div>
    );
};

export default ShareModal;