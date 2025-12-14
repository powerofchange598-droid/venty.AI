
import React, { useMemo, useState } from 'react';
import { BudgetCategory, User, FixedExpense, Goal } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import { LeftToSpendChart, CashFlowChart, AllocationChart } from '../components/Budget/BudgetCharts';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// --- TYPES ---
interface BudgetScreenProps {
    user: User;
    initialBudget: BudgetCategory[];
    setGlobalBudget: (budget: BudgetCategory[]) => void;
    fixedExpenses: FixedExpense[];
    totalIncomeForBudget: number;
    goals?: Goal[];
}

// --- SUB-COMPONENTS ---

const DateSelectorCard: React.FC = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const currentYear = currentDate.getFullYear();

    return (
        <Card className="flex flex-col justify-center items-center h-full !p-6 bg-bg-secondary border-t-4 border-brand-primary shadow-sm min-h-[280px]">
            <h1 className="text-4xl font-bold text-brand-primary tracking-tight">{currentMonth}</h1>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-8 mt-2">BUDGET DASHBOARD</p>
            
            <div className="w-full space-y-3">
                <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase">START DATE</span>
                    <div className="bg-text-primary text-bg-primary px-4 py-2 rounded-lg text-xs font-medium w-32 text-center">
                        1 {currentDate.toLocaleString('default', { month: 'short' })} {currentYear}
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold text-text-tertiary uppercase">END DATE</span>
                    <div className="bg-text-primary text-bg-primary px-4 py-2 rounded-lg text-xs font-medium w-32 text-center">
                        30 {currentDate.toLocaleString('default', { month: 'short' })} {currentYear}
                    </div>
                </div>
            </div>
        </Card>
    );
};

interface TableRowProps {
    label: string;
    budget: number;
    actual: number;
    isTotal?: boolean;
    hasCheckbox?: boolean;
    formatCurrency: (val: number) => string;
    editable?: boolean;
    onChange?: (payload: { label?: string; budget?: number; actual?: number }) => void;
    onDelete?: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ label, budget, actual, isTotal, hasCheckbox, formatCurrency, editable, onChange, onDelete }) => {
    const [localLabel, setLocalLabel] = useState(label);
    const [localBudget, setLocalBudget] = useState(budget);
    const [localActual, setLocalActual] = useState(actual);
    const commit = () => {
        if (onChange) onChange({ label: localLabel, budget: localBudget, actual: localActual });
    };
    return (
        <div className={`grid grid-cols-12 gap-2 py-3 px-2 border-b border-border-primary items-center transition-colors ${isTotal ? 'bg-brand-primary/10 mt-2 font-bold rounded-md' : 'hover:bg-bg-tertiary'}`}>
            <div className="col-span-6 flex items-center gap-3">
                {hasCheckbox && (
                    <div className="w-4 h-4 rounded border border-border-primary flex items-center justify-center">
                        {Math.random() > 0.5 && <div className="w-2.5 h-2.5 bg-brand-primary rounded-[1px]"></div>}
                    </div>
                )}
                {editable ? (
                    <input
                        value={localLabel}
                        onChange={(e) => setLocalLabel(e.target.value)}
                        onBlur={commit}
                        className="text-sm bg-transparent border-b border-border-primary focus:outline-none flex-1 min-w-0"
                    />
                ) : (
                    <span className={`text-sm ${isTotal ? 'text-brand-primary' : 'text-text-primary'} truncate`}>{label}</span>
                )}
            </div>
            <div className={`col-span-3 text-right text-xs sm:text-sm ${isTotal ? 'text-brand-primary' : 'text-text-secondary'}`}>
                {editable ? (
                    <input
                        type="number"
                        value={localBudget}
                        onChange={(e) => setLocalBudget(Number(e.target.value))}
                        onBlur={commit}
                        className="w-full text-right bg-transparent border-b border-border-primary focus:outline-none"
                    />
                ) : (
                    formatCurrency(budget)
                )}
            </div>
            <div className={`col-span-3 text-right text-xs sm:text-sm ${isTotal ? 'text-brand-primary' : 'text-text-primary'}`}>
                {editable ? (
                    <div className="flex items-center justify-end gap-2">
                        <input
                            type="number"
                            value={localActual}
                            onChange={(e) => setLocalActual(Number(e.target.value))}
                            onBlur={commit}
                            className="w-full text-right bg-transparent border-b border-border-primary focus:outline-none"
                        />
                        {onDelete && <button onClick={onDelete} className="text-feedback-error" title="Delete"><TrashIcon className="h-4 w-4" /></button>}
                    </div>
                ) : (
                    formatCurrency(actual)
                )}
            </div>
        </div>
    );
};

const TrackerCard: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    onAdd?: () => void; 
    totalBudget?: number; 
    totalActual?: number;
    formatCurrency: (val: number) => string;
}> = ({ title, children, onAdd, totalBudget, totalActual, formatCurrency }) => (
    <Card className="!p-0 bg-bg-secondary h-full shadow-sm border border-border-primary flex flex-col">
        <div className="p-4 border-b border-border-primary bg-bg-tertiary/20">
            <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider text-center">{title}</h3>
        </div>
        
        <div className="px-4 py-2 bg-bg-secondary">
            <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2 px-2">
                <div className="col-span-6">CATEGORY</div>
                <div className="col-span-3 text-right">BUDGET</div>
                <div className="col-span-3 text-right">ACTUAL</div>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>

        <div className="mt-auto">
            {onAdd && (
                <button onClick={onAdd} className="w-full py-3 flex items-center justify-center text-xs font-bold text-brand-primary hover:bg-bg-tertiary transition-colors border-t border-border-primary">
                    <PlusIcon className="h-3 w-3 mr-1" /> ADD ITEM
                </button>
            )}
            {(totalBudget !== undefined && totalActual !== undefined) && (
                <div className="bg-brand-primary/5 px-6 py-3 flex justify-between items-center text-sm font-bold text-brand-primary border-t border-border-primary">
                    <span>TOTAL</span>
                    <div className="flex gap-4">
                        <span className="w-16 text-right opacity-80">{formatCurrency(totalBudget)}</span>
                        <span className="w-16 text-right">{formatCurrency(totalActual)}</span>
                    </div>
                </div>
            )}
        </div>
    </Card>
);

// --- MAIN SCREEN ---

const BudgetScreen: React.FC<BudgetScreenProps> = ({ user, initialBudget, fixedExpenses, totalIncomeForBudget, goals }) => {
    const { formatCurrency, currency } = useLocalization();

    const [incomeRows, setIncomeRows] = useState(() => [
        { id: `inc_1`, label: 'Paycheck 1', budget: user.salary * 0.5, actual: user.salary * 0.5 },
        { id: `inc_2`, label: 'Paycheck 2', budget: user.salary * 0.5, actual: user.salary * 0.5 },
    ]);
    const [billRows, setBillRows] = useState(() => fixedExpenses.map(b => ({ id: b.id, label: b.name, budget: b.amount, actual: b.amount })));
    const [expenseRows, setExpenseRows] = useState(() => initialBudget.map(c => ({
        id: c.id, label: c.name, allocated: c.allocated, spent: c.spent,
    })));
    const [goalRows, setGoalRows] = useState(() => (goals || []).map(g => ({ id: g.id, label: g.name, budget: g.monthlyContribution || 0, actual: g.monthlyContribution || 0 })));
    const [debtRows, setDebtRows] = useState([
        { id: 'debt_cc', label: 'Credit Card', budget: 500, actual: 500 },
        { id: 'debt_student', label: 'Student Loan', budget: 200, actual: 200 },
    ]);

    // --- DATA AGGREGATION ---
    const totalIncome = user.salary;
    const incomeActual = incomeRows.reduce((sum, r) => sum + (r.actual || 0), 0);

    const billsBudget = billRows.reduce((sum, item) => sum + item.budget, 0);
    const billsActual = billRows.reduce((sum, item) => sum + item.actual, 0);

    const expensesBudget = expenseRows.reduce((sum, item) => sum + ((totalIncomeForBudget * item.allocated) / 100), 0);
    const expensesActual = expenseRows.reduce((sum, item) => sum + item.spent, 0);

    const savingsBudget = goalRows.reduce((sum, g) => sum + (g.budget || 0), 0);
    const savingsActual = goalRows.reduce((sum, g) => sum + (g.actual || 0), 0);

    const debtBudget = debtRows.reduce((s, i) => s + i.budget, 0);
    const debtActual = debtRows.reduce((s, i) => s + i.actual, 0);

    const totalBudgetOut = billsBudget + expensesBudget + savingsBudget + debtBudget;
    const totalActualOut = billsActual + expensesActual + savingsActual + debtActual;

    const leftBudget = totalIncome - totalBudgetOut;
    const leftActual = incomeActual - totalActualOut;

    return (
        <PageLayout title="Budget Dashboard" showHeader={false}>
            <div className="bg-bg-primary min-h-screen p-4 lg:p-8 space-y-6">
                
                {/* --- TOP ROW: HEADERS & CHARTS --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <DateSelectorCard />
                    <LeftToSpendChart left={leftActual} spent={totalActualOut} currency={currency === 'USD' ? '$' : currency} />
                    <CashFlowChart income={totalIncome} out={totalActualOut} />
                    <AllocationChart bills={billsActual} expenses={expensesActual} savings={savingsActual} debt={debtActual} />
                </div>

                {/* --- DETAILED DATA GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
                    
                    {/* COLUMN 1: CASH FLOW & INCOME */}
                    <div className="space-y-6">
                        <TrackerCard title="CASH FLOW SUMMARY" formatCurrency={formatCurrency}>
                            <TableRow label="Rollover" budget={0} actual={0} formatCurrency={formatCurrency} />
                            <TableRow label="Income" budget={totalIncome} actual={incomeActual} formatCurrency={formatCurrency} />
                            <TableRow label="Bills" budget={billsBudget} actual={billsActual} formatCurrency={formatCurrency} />
                            <TableRow label="Expenses" budget={expensesBudget} actual={expensesActual} formatCurrency={formatCurrency} />
                            <TableRow label="Savings" budget={savingsBudget} actual={savingsActual} formatCurrency={formatCurrency} />
                            <TableRow label="Debt" budget={debtBudget} actual={debtActual} formatCurrency={formatCurrency} />
                            <TableRow label="LEFT" budget={leftBudget} actual={leftActual} isTotal formatCurrency={formatCurrency} />
                        </TrackerCard>

                        <TrackerCard title="INCOME SUMMARY" onAdd={() => {
                            setIncomeRows(prev => [...prev, { id: `inc_${Date.now()}`, label: `Income ${prev.length + 1}`, budget: 0, actual: 0 }]);
                        }} formatCurrency={formatCurrency} totalBudget={incomeRows.reduce((s,r)=>s+r.budget,0)} totalActual={incomeRows.reduce((s,r)=>s+r.actual,0)}>
                            {incomeRows.map(r => (
                                <TableRow
                                    key={r.id}
                                    label={r.label}
                                    budget={r.budget}
                                    actual={r.actual}
                                    editable
                                    formatCurrency={formatCurrency}
                                    onChange={(p) => setIncomeRows(prev => prev.map(x => x.id === r.id ? { ...x, label: p.label ?? x.label, budget: p.budget ?? x.budget, actual: p.actual ?? x.actual } : x))}
                                    onDelete={() => setIncomeRows(prev => prev.filter(x => x.id !== r.id))}
                                />
                            ))}
                        </TrackerCard>
                    </div>

                    {/* COLUMN 2: BILLS */}
                    <TrackerCard title="BILL TRACKER" onAdd={() => {
                        setBillRows(prev => [...prev, { id: `bill_${Date.now()}`, label: 'New Bill', budget: 0, actual: 0 }]);
                    }} formatCurrency={formatCurrency}>
                        {billRows.map(item => (
                            <TableRow
                                key={item.id}
                                label={item.label}
                                budget={item.budget}
                                actual={item.actual}
                                hasCheckbox
                                editable
                                formatCurrency={formatCurrency}
                                onChange={(p) => setBillRows(prev => prev.map(x => x.id === item.id ? { ...x, label: p.label ?? x.label, budget: p.budget ?? x.budget, actual: p.actual ?? x.actual } : x))}
                                onDelete={() => setBillRows(prev => prev.filter(x => x.id !== item.id))}
                            />
                        ))}
                        {billRows.length === 0 && <p className="text-xs text-text-tertiary text-center py-4">No bills added.</p>}
                    </TrackerCard>

                    {/* COLUMN 3: EXPENSES */}
                    <TrackerCard title="EXPENSE SUMMARY" onAdd={() => {
                        setExpenseRows(prev => [...prev, { id: `cat_${Date.now()}`, label: 'New Category', allocated: 0, spent: 0 }]);
                    }} formatCurrency={formatCurrency} totalBudget={expensesBudget} totalActual={expensesActual}>
                        {expenseRows.map(cat => (
                            <div key={cat.id} className="grid grid-cols-12 gap-2 py-3 px-2 border-b border-border-primary items-center hover:bg-bg-tertiary">
                                <div className="col-span-6 flex items-center gap-3">
                                    <input
                                        value={cat.label}
                                        onChange={(e) => setExpenseRows(prev => prev.map(x => x.id === cat.id ? { ...x, label: e.target.value } : x))}
                                        className="text-sm bg-transparent border-b border-border-primary focus:outline-none flex-1 min-w-0"
                                    />
                                </div>
                                <div className="col-span-3 text-right text-xs sm:text-sm text-text-secondary">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="opacity-70">Alloc %</span>
                                        <input
                                            type="number"
                                            value={cat.allocated}
                                            onChange={(e) => setExpenseRows(prev => prev.map(x => x.id === cat.id ? { ...x, allocated: Number(e.target.value) } : x))}
                                            className="w-16 text-right bg-transparent border-b border-border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3 text-right text-xs sm:text-sm text-text-primary">
                                    <div className="flex items-center justify-end gap-2">
                                        <input
                                            type="number"
                                            value={cat.spent}
                                            onChange={(e) => setExpenseRows(prev => prev.map(x => x.id === cat.id ? { ...x, spent: Number(e.target.value) } : x))}
                                            className="w-full text-right bg-transparent border-b border-border-primary focus:outline-none"
                                        />
                                        <button onClick={() => setExpenseRows(prev => prev.filter(x => x.id !== cat.id))} className="text-feedback-error" title="Delete"><TrashIcon className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TrackerCard>

                    {/* COLUMN 4: SAVINGS & DEBT */}
                    <div className="space-y-6">
                        <TrackerCard title="SAVINGS TRACKER" onAdd={() => {
                            setGoalRows(prev => [...prev, { id: `goal_${Date.now()}`, label: 'New Goal', budget: 0, actual: 0 }]);
                        }} formatCurrency={formatCurrency} totalBudget={savingsBudget} totalActual={savingsActual}>
                            {goalRows.map(g => (
                                <TableRow
                                    key={g.id}
                                    label={g.label}
                                    budget={g.budget}
                                    actual={g.actual}
                                    editable
                                    formatCurrency={formatCurrency}
                                    onChange={(p) => setGoalRows(prev => prev.map(x => x.id === g.id ? { ...x, label: p.label ?? x.label, budget: p.budget ?? x.budget, actual: p.actual ?? x.actual } : x))}
                                    onDelete={() => setGoalRows(prev => prev.filter(x => x.id !== g.id))}
                                />
                            ))}
                            {goalRows.length === 0 && <p className="text-xs text-text-tertiary text-center py-4">No savings goals.</p>}
                        </TrackerCard>

                        <TrackerCard title="DEBT TRACKER" onAdd={() => {
                            setDebtRows(prev => [...prev, { id: `debt_${Date.now()}`, label: 'New Debt', budget: 0, actual: 0 }]);
                        }} formatCurrency={formatCurrency} totalBudget={debtBudget} totalActual={debtActual}>
                            {debtRows.map((d) => (
                                <TableRow
                                    key={d.id}
                                    label={d.label}
                                    budget={d.budget}
                                    actual={d.actual}
                                    editable
                                    formatCurrency={formatCurrency}
                                    onChange={(p) => setDebtRows(prev => prev.map(x => x.id === d.id ? { ...x, label: p.label ?? x.label, budget: p.budget ?? x.budget, actual: p.actual ?? x.actual } : x))}
                                    onDelete={() => setDebtRows(prev => prev.filter(x => x.id !== d.id))}
                                />
                            ))}
                        </TrackerCard>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
};

export default BudgetScreen;
