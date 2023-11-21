const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
  credentials: true,
}));

app.use(bodyParser.json());


const expenseRoutes = require('./routes/expenseRoutes');
app.use('/expenses', expenseRoutes);

const sequelize = require('./config/database');
const Expense = require('./models/expense');






sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
