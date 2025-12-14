import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Goal } from '../types';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import VentyButton from '../components/VentyButton';
import { useLocalization } from '../hooks/useLocalization';

interface AddGoalsScreenProps {
  user: User;
  onSaveGoal?: (goal: Omit<Goal, 'id' | 'currentAmount'> & { notes?: string }) => void;
}

const AddGoalsScreen: React.FC<AddGoalsScreenProps> = ({ user, onSaveGoal }) => {
  const navigate = useNavigate();
  const { formatCurrency } = useLocalization();

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');

  const amountNum = useMemo(() => parseFloat(targetAmount || '0'), [targetAmount]);
  const isValid = title.trim().length > 0 && amountNum > 0;

  const handleSave = () => {
    if (!isValid) return;
    const payload = { name: title.trim(), targetAmount: amountNum, deadline: deadline || undefined, notes: notes.trim() || undefined };
    if (onSaveGoal) onSaveGoal(payload);
    navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  return (
    <PageLayout title="Add Goal">
      <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-6">
        <Card className="!p-6 space-y-4">
          <div>
            <label className="font-medium text-text-primary">Goal Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., New Car" className="w-full mt-1 p-3 bg-bg-primary border border-border-primary rounded-lg" />
          </div>
          <div>
            <label className="font-medium text-text-primary">Target Amount</label>
            <div className="relative">
              <input type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} placeholder="e.g., 25000" className="w-full mt-1 p-3 bg-bg-primary border border-border-primary rounded-lg pr-24" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">{formatCurrency(amountNum || 0)}</span>
            </div>
          </div>
          <div>
            <label className="font-medium text-text-primary">Deadline</label>
            <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full mt-1 p-3 bg-bg-primary border border-border-primary rounded-lg" />
          </div>
          <div>
            <label className="font-medium text-text-primary">Notes (Optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add context or milestones" rows={4} className="w-full mt-1 p-3 bg-bg-primary border border-border-primary rounded-lg" />
          </div>
        </Card>

        <Card className="!p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Progress</p>
              <div className="w-64 bg-bg-tertiary h-3 rounded-full mt-2">
                <div className="bg-brand-primary h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <p className="text-sm text-text-secondary">0%</p>
          </div>
        </Card>

        <div className="flex gap-3">
          <VentyButton onClick={handleSave} disabled={!isValid} className="flex-1">Save Goal</VentyButton>
          <VentyButton onClick={handleCancel} variant="secondary" className="flex-1">Cancel</VentyButton>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddGoalsScreen;

