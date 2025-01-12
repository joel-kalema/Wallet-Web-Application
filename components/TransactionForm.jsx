'use client';

import { useState, useEffect } from 'react';
import { db } from '../services/firestore';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Input, Button, Select, Option } from '@material-tailwind/react';

export default function TransactionForm() {
    const [formData, setFormData] = useState({ amount: '', type: 'income', category: '', account: '' });
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState(['Bank Account', 'Mobile Money', 'Cash']); // Example static list of accounts

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            const transactionsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTransactions(transactionsList);
        });

        return unsubscribe;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'transactions'), {
                amount: parseFloat(formData.amount),
                type: formData.type,
                category: formData.category,
                account: formData.account,  // Adding account info to transaction
                date: new Date(),
            });

            setFormData({ amount: '', type: 'income', category: '', account: '' });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit} className="space-y-4 sticky top-0 bg-[#111349] p-4 shadow-xl rounded-xl">
                <div className='flex justify-between gap-4'>
                    <div className='w-1/2'>
                        <Input
                            type="number"
                            required
                            label="Amount in RWF"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Select
                            label="Transaction Type"
                            required
                            value={formData.type}
                            onChange={(value) => setFormData({ ...formData, type: value })}
                        >
                            <Option value="income">Income</Option>
                            <Option value="expense">Expense</Option>
                        </Select>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='w-1/2'>
                        <Input
                            type="text"
                            required
                            label="Category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Select
                            label="Account"
                            required
                            value={formData.account}
                            onChange={(value) => setFormData({ ...formData, account: value })}
                        >
                            {accounts.map((account, index) => (
                                <Option key={index} value={account}>{account}</Option>
                            ))}
                        </Select>
                    </div>
                </div>

                <Button type="submit" color="blue">Add Transaction</Button>
            </form>

            <h3 className="mt-6 text-xl">Transaction List</h3>
            <ul className="mt-4 space-y-2 px-2">
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="p-1 border border-[#525252c9] rounded-xl">
                        <div className='bg2 rounded-lg p-2'>
                            <div className='flex justify-between items-end'>
                                <p className={transaction.type === "income" ? "text-[#18e118]" : "text-red-600"}>{transaction.type}</p>
                                <p className='font-extrabold text-md'>RWF {transaction.amount}</p>
                            </div>
                            <div className='flex justify-between items-end'>
                                <p>{transaction.category}</p>
                                <p className='text-xs'>Date: {new Date(transaction.date.seconds * 1000).toLocaleDateString()}</p>
                                <p className='text-xs'>{transaction.account}</p> {/* Display selected account */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
