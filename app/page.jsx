import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Home() {
  return (
    <div className='lg:flex items-start p-4 lg:p-10 lg:w-4/6 mx-auto gap-20'>
      <TransactionList />
      <div>
        <h1 className='mb-6 text-xl'>Task Force Wallet</h1>
        <TransactionForm />
      </div>
    </div>
  );
}
