'use client'

import { useEffect, useState } from 'react';

export default function BudgetAlert({ transactions, budget }) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    if (totalExpense > budget) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [transactions, budget]);

  return (
    alert && <div style={{ color: 'red' }}>Warning: Budget Exceeded!</div>
  );
}