import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firestore';

const transactionsCollection = collection(db, 'transactions');

export async function addTransaction(transaction) {
  return await addDoc(transactionsCollection, transaction);
}

export async function getTransactionsByDateRange(startDate, endDate) {
  const q = query(transactionsCollection, where('date', '>=', startDate), where('date', '<=', endDate));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
