const Expense = require('../models/expense');

const expenseController = {
  getAllExpenses: async (req, res) => {
    try {
      const expenses = await Expense.findAll();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getExpenseById: async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        res.status(404).json({ error: 'Expense not found' });
      } else {
        res.json(expense);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createExpense: async (req, res) => {
    const { expenseName, description, amount, category } = req.body;
    try {
      const newExpense = await Expense.create({
        description,
        amount,
        category,
      });
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateExpense: async (req, res) => {
    const { id } = req.params;
    const { expenseName, description, amount, category } = req.body;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        res.status(404).json({ error: 'Expense not found' });
      } else {
        await expense.update({
          description,
          amount,
          category,
        });
        res.json(expense);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteExpense: async (req, res) => {
    const { id } = req.params;
    try {
      const expense = await Expense.findByPk(id);
      if (!expense) {
        res.status(404).json({ error: 'Expense not found' });
      } else {
        await expense.destroy();
        res.json({ message: 'Expense deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = expenseController;
