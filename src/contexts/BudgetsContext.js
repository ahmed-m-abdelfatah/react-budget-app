import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

// Budget
// {
//     id:
//     name:
//     max:
// }
// Expense
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    });
  }

  function addBudget({ name, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.name === name)) return prevBudgets;
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    //  TODO deal with expense
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
  }

  function deleteExpense({ id }) {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}>
      {children}
    </BudgetsContext.Provider>
  );
};
