# My Wallet - Personal Budget Tracker
Welcome to My Wallet, a simple yet powerful personal budget tracker that helps you manage your income and expenses. This application allows you to set and track your budget, calculate the total income and expenses, and check if you've exceeded your budget. With real-time updates and a clean interface, you'll always be in control of your finances.

## Features

- Set and Manage Budget: Easily set your budget limit and monitor your spending.
- Track Income and Expenses: Add, update, and categorize your transactions as income or expense.
- Real-Time Updates: Automatically updates your budget calculations with every new transaction.
- Remaining Budget Calculation: Displays the remaining budget after calculating total expenses and income.
- Budget Exceeded Alert: Notifies you when your expenses exceed your set budget.

## Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Material Tailwind UI
### Backend:
- Firebase Firestore
- Firebase Authentication (if necessary)
- Realtime Updates: Firebase Realtime Database with Firestore

## Installation
### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (Recommended version: 14.x or later)
- npm or yarn (for package management)

### Steps to Set Up the Project
Clone the repository:

````
https://github.com/joel-kalema/Wallet-Web-Application.git

````

- Install the dependencies: Using npm:

````
npm install or yarn dev
````

- Run the project:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## How to Use
### Set Your Budget:

- Input your budget in the "Set Budget" field.
- The app will automatically calculate if you've exceeded your budget based on your total expenses.

### Track Your Transactions:

- Add transactions as either income or expense.
- The total income and total expense will be calculated and displayed.

### Budget Alerts:

- If your total expense exceeds your set budget, you will see a red "Budget Exceeded" alert.

### Real-Time Updates:

Transactions and budget data are updated in real time. Any changes made to the transactions will be reflected immediately.