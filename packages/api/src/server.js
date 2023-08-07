const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ home: "Welcome"})
});

app.post('/payouts', (req, res) => {
  const { expenses } = req.body;
  let response = {
    total: 0,
    equalShare: 0,
    payouts:[],
  };
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  response.total = totalExpenses;

  const travelers = expenses.reduce((acc, curr) => {
    const findIndex = acc.findIndex(traveler => traveler.name === curr.name);
    if (findIndex > -1) {
      acc[findIndex].amount += curr.amount;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  
  const travelersLength = travelers.length;
  const averageExpense = totalExpenses / travelersLength;
  response.equalShare = averageExpense

  for (let i = 0; i < travelersLength; i++) {
    for (let j = i + 1; j < travelersLength; j++) {
      const diff = travelers[i].amount - averageExpense;
      if (Math.abs(diff) > 0.001) {
        response.payouts.push({
          owes: travelers[i].name,
          owed: travelers[j].name,
          amount: Math.abs(diff)
        });
      }
    }
  }
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;