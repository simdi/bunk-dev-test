const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const expenses = [];

app.post('/expenses', (req, res) => {
  const { name, expense } = req.body;
  expenses.push({ name, expense });
  res.sendStatus(201);
});

app.get('/settleUp', (req, res) => {
  // Implement logic to calculate how much each traveller needs to pay out to others
  // For simplicity, let's assume each traveller pays equally
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.expense, 0);
  const averageExpense = totalExpenses / expenses.length;
  const settleUpResult = expenses.map(exp => ({ name: exp.name, amountToPay: averageExpense - exp.expense }));
  res.json(settleUpResult);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});