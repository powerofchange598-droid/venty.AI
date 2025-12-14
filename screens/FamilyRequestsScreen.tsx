import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, PurchaseRequest } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import PageLayout from '../components/PageLayout';
import VentyButton from '../components/VentyButton';
import { CheckIcon, XMarkIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { safeFormatDate } from '../utils/dateUtils';

// --- PROPS & TYPES ---
interface FamilyRequestsScreenProps {
    user: User;
    requests: PurchaseRequest[];
    onReview: (requestId: string, decision: 'approved' | 'rejected') => void;
}
type FilterStatus = 'pending' | 'history';

// --- HELPER COMPONENTS ---
const RequestCardSkeleton: React.FC = () => (
    <div className="bg-bg-secondary p-4 rounded-xl border border-border-primary shadow-md space-y-4">
        <div className="flex items-center space-x-3">
            <div className="skeleton-loader w-10 h-10 rounded-full flex-shrink-0"></div>
            <div className="flex-grow space-y-2">
                <div className="skeleton-loader h-4 w-3/4"></div>
                <div className="skeleton-loader h-3 w-1/2"></div>
            </div>
        </div>
        <div className="skeleton-loader h-4 w-full"></div>
        <div className="flex space-x-2">
            <div className="skeleton-loader h-10 w-1/2 rounded-lg"></div>
            <div className="skeleton-loader h-10 w-1/2 rounded-lg"></div>
        </div>
    </div>
);

const RejectReasonModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex justify-center items-center p-4 z-50" onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm bg-bg-secondary rounded-xl p-6 shadow-deep border border-border-primary"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold font-serif mb-4">Reason for Rejection (Optional)</h2>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder="e.g., Not in the budget this month." className="w-full"/>
                <div className="flex gap-2 mt-4">
                    <VentyButton onClick={onClose} variant="secondary">Cancel</VentyButton>
                    <VentyButton onClick={() => onConfirm(reason)} variant="danger">Confirm Rejection</VentyButton>
                </div>
            </motion.div>
        </div>
    );
};

const RequestCard: React.FC<{
    request: PurchaseRequest;
    onApprove: () => void;
    onReject: () => void;
    formatCurrency: (val: number) => string;
}> = ({ request, onApprove, onReject, formatCurrency }) => {
    const statusInfo = {
        pending: { text: 'Pending', icon: ClockIcon, color: 'text-feedback-warning bg-feedback-warning/10' },
        approved: { text: 'Approved', icon: CheckCircleIcon, color: 'text-feedback-success bg-feedback-success/10' },
        rejected: { text: 'Rejected', icon: XCircleIcon, color: 'text-feedback-error bg-feedback-error/10' },
    };
    const { text, icon: Icon, color } = statusInfo[request.status];
    const memberInitial = request.guestName.charAt(0);

    return (
        <motion.div
            className="card overflow-hidden cursor-pointer"
            whileTap={{ scale: 0.98 }}
        >
            <div className="p-4">
                <div className="flex items-start space-x-4">
                     <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center font-bold text-text-primary flex-shrink-0">{memberInitial}</div>
                    <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary leading-tight">{request.productTitle}</h3>
                                <p className="text-sm text-text-secondary">from <span className="font-medium">{request.guestName}</span></p>
                            </div>
                            <p className="font-bold text-xl text-brand-primary whitespace-nowrap ml-2">{formatCurrency(request.productPrice)}</p>
                        </div>
                         <p className="text-xs text-text-secondary mt-1">{safeFormatDate(request.createdAt, undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
                {request.note && (
                    <div className="mt-3 p-3 bg-bg-primary rounded-md border border-bg-tertiary">
                        <p className="text-sm italic text-text-secondary">"{request.note}"</p>
                    </div>
                )}
            </div>
            {request.status === 'pending' && (
                <div className="bg-bg-primary px-4 py-3 border-t border-border-primary flex gap-3">
                    <VentyButton onClick={onApprove} variant="primary" className="!text-sm !py-2">Approve</VentyButton>
                    <VentyButton onClick={onReject} variant="danger" className="!text-sm !py-2">Reject</VentyButton>
                </div>
            )}
            {(request.status === 'approved' || request.status === 'rejected') && (
                 <div className="bg-bg-primary px-4 py-2 border-t border-border-primary">
                     <div className={`flex items-center space-x-2 text-sm font-semibold ${color}`}>
                        <Icon className="h-5 w-5"/>
                        <span>{text} by {request.reviewedBy} on {safeFormatDate(request.reviewedAt)}</span>
                     </div>
                </div>
            )}
        </motion.div>
    );
};

// --- MAIN SCREEN ---
const FamilyRequestsScreen: React.FC<FamilyRequestsScreenProps> = ({ user, requests: initialRequests, onReview }) => {
    const { formatCurrency } = useLocalization();
    const [requests, setRequests] = useState<PurchaseRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('pending');
    const [rejectingRequest, setRejectingRequest] = useState<PurchaseRequest | null>(null);
    const [processedRequest, setProcessedRequest] = useState<{ id: string, decision: 'approved' | 'rejected' } | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setRequests(initialRequests);
            setIsLoading(false);
        }, 1200);
    }, [initialRequests]);

    const { pending, history } = useMemo(() => {
        const sortedHistory = initialRequests
            .filter(r => r.status !== 'pending')
            .sort((a, b) => new Date(b.reviewedAt!).getTime() - new Date(a.reviewedAt!).getTime());
        return {
            pending: requests.filter(r => r.status === 'pending'),
            history: sortedHistory
        };
    }, [requests, initialRequests]);

    const displayRequests = activeFilter === 'pending' ? pending : history;

    const handleAction = (id: string, decision: 'approved' | 'rejected') => {
        setProcessedRequest({ id, decision });
        setTimeout(() => {
            onReview(id, decision);
            setRequests(prev => prev.filter(r => r.id !== id));
            setProcessedRequest(null);
        }, 600);
    };

    const handleOpenRejectModal = (id: string) => {
        const requestToReject = requests.find(r => r.id === id);
        if (requestToReject) setRejectingRequest(requestToReject);
    };

    const handleConfirmReject = (reason: string) => {
        if (!rejectingRequest) return;
        handleAction(rejectingRequest.id, 'rejected');
        setRejectingRequest(null);
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
    };

    return (
        <PageLayout title="Purchase Requests">
            <AnimatePresence>
                <RejectReasonModal isOpen={!!rejectingRequest} onClose={() => setRejectingRequest(null)} onConfirm={handleConfirmReject} />
            </AnimatePresence>
            <div className="p-4 lg:p-6 max-w-2xl mx-auto">
                <div className="flex justify-center bg-bg-tertiary rounded-lg p-1 mb-6">
                    <button onClick={() => setActiveFilter('pending')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors relative ${activeFilter === 'pending' ? 'bg-bg-secondary text-text-primary shadow-sm' : 'text-text-secondary'}`}>
                        Pending
                        {pending.length > 0 && <span className="absolute top-1.5 right-2 h-5 w-5 text-xs rounded-full bg-text-primary text-bg-primary flex items-center justify-center">{pending.length}</span>}
                    </button>
                    <button onClick={() => setActiveFilter('history')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-md transition-colors ${activeFilter === 'history' ? 'bg-bg-secondary text-text-primary shadow-sm' : 'text-text-secondary'}`}>
                        History
                    </button>
                </div>

                <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => <RequestCardSkeleton key={i} />)
                    ) : displayRequests.length === 0 ? (
                        <motion.div variants={cardVariants}>
                            <div className="text-center py-16 bg-bg-secondary rounded-xl border border-border-primary">
                                <ShoppingCartIcon className="h-16 w-16 text-bg-tertiary mx-auto" />
                                <p className="text-text-secondary mt-4 font-semibold">No {activeFilter} requests.</p>
                            </div>
                        </motion.div>
                    ) : (
                        <AnimatePresence>
                            {displayRequests.map(req => (
                                <motion.div key={req.id} variants={cardVariants} layout exit="exit">
                                    <div className="relative">
                                         <RequestCard request={req} onApprove={() => handleAction(req.id, 'approved')} onReject={() => handleOpenRejectModal(req.id)} formatCurrency={formatCurrency} />
                                         <AnimatePresence>
                                            {processedRequest?.id === req.id && (
                                                 <motion.div
                                                    className="absolute inset-0 bg-bg-secondary rounded-xl flex items-center justify-center"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {processedRequest.decision === 'approved' ? (
                                                        <CheckIcon className="h-24 w-24 text-feedback-success" />
                                                    ) : (
                                                        <XMarkIcon className="h-24 w-24 text-feedback-error" />
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </motion.div>
            </div>
        </PageLayout>
    );
};

export default FamilyRequestsScreen;