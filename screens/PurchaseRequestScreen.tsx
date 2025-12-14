import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Product } from '../types';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { useLocalization } from '../hooks/useLocalization';

interface PurchaseRequestScreenProps {
    user: User;
    onSendRequest: (product: Product, note: string) => void;
}

const PurchaseRequestScreen: React.FC<PurchaseRequestScreenProps> = ({ user, onSendRequest }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { formatCurrency } = useLocalization();
    const [note, setNote] = useState('');

    const product = location.state?.product as Product;

    if (!product) {
        navigate('/market');
        return null;
    }

    const handleSend = () => {
        onSendRequest(product, note);
    };

    return (
        <PageLayout title={t('purchaseRequests.title')}>
            <div className="p-4 lg:p-6 space-y-4">
                <Card>
                    <h2 className="text-xl font-bold mb-4">{t('purchaseRequests.requestedBy', { name: user.name })}</h2>
                    <div className="flex items-center space-x-4 p-2 rounded-lg bg-bg-primary">
                        <img src={product.imageUrl} alt={product.title} className="w-24 h-24 rounded-md object-cover"/>
                        <div>
                            <p className="font-bold text-lg">{product.title}</p>
                            <p className="text-xl font-semibold text-brand-primary">{formatCurrency(product.price)}</p>
                            <p className="text-sm text-text-secondary">{product.merchantInfo?.name}</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <label htmlFor="note" className="font-medium block mb-1">{t('purchaseRequests.noteLabel')}</label>
                    <textarea
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        placeholder={t('purchaseRequests.notePlaceholder')}
                        className="w-full p-2 bg-bg-primary rounded-lg border border-bg-tertiary"
                    />
                </Card>
                <VentyButton onClick={handleSend}>{t('purchaseRequests.sendRequest')}</VentyButton>
            </div>
        </PageLayout>
    );
};

export default PurchaseRequestScreen;