'use client'

import { useEffect, useState } from 'react';
import { getTransactionsByDateRange } from '../services/transactions';
import { doc, getDoc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from '../services/firestore';
import { Input } from "@material-tailwind/react";

const BUDGET_DOC_PATH = 'users/userId/budgets/default';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [budgetExceeded, setBudgetExceeded] = useState(false);

  const calculateTotals = (data) => {
    const income = data.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = data.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
    checkBudget(expense, income);
  };

  console.log(transactions, budgetExceeded)

  const checkBudget = (expense, income) => {
    const remainingBudget = budget - (expense - income);

    if (remainingBudget < 0) {
      setBudgetExceeded(true);
    } else {
      setBudgetExceeded(false);
    }
  };

  const fetchBudget = async () => {
    const budgetDoc = await getDoc(doc(db, BUDGET_DOC_PATH));
    if (budgetDoc.exists()) {
      setBudget(budgetDoc.data().amount);
    }
  };

  const saveBudget = async (newBudget) => {
    await setDoc(doc(db, BUDGET_DOC_PATH), { amount: newBudget, createdAt: new Date() });
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactionsByDateRange(new Date('2023-01-01'), new Date());
      setTransactions(data);
      calculateTotals(data);
    };

    fetchTransactions();
    fetchBudget();

    const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
      calculateTotals(data);
    });

    return () => unsubscribe();
  }, []);

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
    saveBudget(newBudget);
  };

  const remainingBudget = budget - totalExpense + totalIncome;

  return (
    <div className='lg:sticky top-10'>
      <h1 className='text-4xl mb-10'>My Wallet</h1>
      <div className='bg-[#111349] rounded-xl shadow-xl p-6 mb-10'>
        <h2 className='font-extrabold mb-4'>Transactions</h2>
        <div className='mb-4 text-[#fff]'>
      
            <p className=' mb-4'>Set Budget:</p>
            <div className="w-72">
              <Input
                color="blue"
                label="Enter budget amount"
                className='placeholder:text-[#fff]'
                type="number"
                value={budget}
                onChange={(e) => handleBudgetChange(parseFloat(e.target.value))}
                placeholder="Enter budget amount"
              />
            </div>
        </div>
        <div className='text-[#18e118]'>
          <strong>Total Income:</strong> RWF {totalIncome}
        </div>
        <div className='text-red-600'>
          <strong>Total Expense:</strong> RWF {totalExpense}
        </div>
        <div className='border-t border-[#ffffff2b] py-4 mt-4'>
          <strong>Remaining Budget:</strong> RWF {remainingBudget}
        </div>
      </div>

      {remainingBudget <= 0 && <div className='bg-red-600 p-6 text-white shadow-xl rounded-xl'>Budget Exceeded!</div>}

    </div>
  );
}
