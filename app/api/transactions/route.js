// src/app/api/transactions/route.js
import { NextResponse } from 'next/server';
import { addTransaction, getTransactionsByDateRange } from '../../../services/transactions';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await addTransaction(body);
    return NextResponse.json({ id: result.id, message: 'Transaction added successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add transaction', details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = new Date(searchParams.get('startDate'));
  const endDate = new Date(searchParams.get('endDate'));

  try {
    const transactions = await getTransactionsByDateRange(startDate, endDate);
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions', details: error.message }, { status: 500 });
  }
}
