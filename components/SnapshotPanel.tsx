
import React, { useMemo } from 'react';
import { User, Transaction, BudgetCategory } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface SnapshotPanelProps {
    user: User;
    transactions: Transaction[];
    budget: BudgetCategory[];
}

const SnapshotPanel: React.FC<SnapshotPanelProps> = ({ user, transactions, budget }) => {
    const { formatCurrency } = useLocalization();

    const { totalIncome, totalSpent, netFlow, categoryBreakdown } = useMemo(() => {
        const income = user.salary + transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type !== 'income').reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        const breakdown = budget.map(cat => ({
            name: cat.name,
            percentage: expenses > 0 ? ((cat.spent / expenses) * 100).toFixed(0) : '0',
        })).sort((a,b) => parseFloat(b.percentage) - parseFloat(a.percentage));
        
        return {
            totalIncome: income,
            totalSpent: expenses,
            netFlow: income - expenses,
            categoryBreakdown: breakdown,
        };
    }, [user, transactions, budget]);

    // Mock data for trends, cash flow, as it's not available in the data model
    const incomeTrend = 12; // Mocked: up 12%
    const expenseTrend = -4; // Mocked: down 4%
    const cashFlowDays = { overspending: 6, onBudget: 18, saved: 6 };
    const smartInsight = "You spent 18% less on subscriptions this week.";

    return (
        <div className="snapshot-section">

            {/* Monthly Overview Card */}
            <div className="snapshot-card">
                <h3>Monthly Overview</h3>
                <div className="snapshot-row">
                    <p>Income</p>
                    <span className="pos">{formatCurrency(totalIncome)} ↑ {incomeTrend}%</span>
                </div>
                <div className="snapshot-row">
                    <p>Expenses</p>
                    <span className="neg">{formatCurrency(totalSpent)} ↓ {Math.abs(expenseTrend)}%</span>
                </div>
                <div className="snapshot-row total">
                    <p>Balance</p>
                    <span>{formatCurrency(netFlow)}</span>
                </div>
            </div>

            {/* Categories Breakdown */}
            <div className="snapshot-card">
                <h3>Spending Breakdown</h3>
                {categoryBreakdown.slice(0, 4).map(cat => (
                     <div className="category" key={cat.name}>
                        <p>{cat.name}</p>
                        <span>{cat.percentage}%</span>
                    </div>
                ))}
            </div>

            {/* Cash Flow */}
            <div className="snapshot-card">
                <h3>Cash Flow</h3>
                <div className="snapshot-row">
                    <p>Overspending Days</p>
                    <span>{cashFlowDays.overspending}</span>
                </div>
                <div className="snapshot-row">
                    <p>On-Budget Days</p>
                    <span>{cashFlowDays.onBudget}</span>
                </div>
                <div className="snapshot-row">
                    <p>Saving Days</p>
                    <span>{cashFlowDays.saved}</span>
                </div>
            </div>

            {/* AI Insights */}
            <div className="snapshot-card">
                <h3>Smart Insights</h3>
                <p className="insight">
                    💡 {smartInsight}
                </p>
            </div>

        </div>
    );
};

export default SnapshotPanel;