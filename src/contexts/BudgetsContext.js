import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

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
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

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

  function clearAllData() {
    setBudgets([]);
    setExpenses([]);
  }

  function addDummyData() {
    clearAllData();
    setBudgets([
      {
        id: 'b50b2342-d189-491f-b6e8-ed4d80173de5',
        name: 'Entertainment',
        max: 2000,
      },
      {
        id: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        name: 'Food',
        max: 3500,
      },
      {
        id: 'b0f92e5e-ba62-4679-a61d-27a528b8c4a2',
        name: 'Car wash and oil change',
        max: 1000,
      },
      {
        id: 'fbe69d54-2cab-43ee-95ec-94eb2897f2b2',
        name: 'Electronics',
        max: 10000,
      },
      {
        id: '029a0bdf-569a-4ab0-87e9-cc891e3a59d0',
        name: 'Jewelry',
        max: 7000,
      },
      {
        id: 'de44412e-f269-4327-a0d1-01ba37ccfd36',
        name: 'Clothes',
        max: 4200,
      },
      {
        id: '97b3e371-bfe1-4e6c-8158-437d15c99f94',
        name: 'Learning courses',
        max: 1000,
      },
      {
        id: 'b94458f9-5842-4867-ad66-5af61097a660',
        name: 'cat',
        max: 100,
      },
    ]);
    setExpenses([
      {
        id: '13d0b7b8-996e-4a37-b82b-b7e73e70046a',
        budgetId: 'b50b2342-d189-491f-b6e8-ed4d80173de5',
        amount: 0,
        description: 'netflix',
      },
      {
        id: 'e2c29668-0b9c-4bf4-be5e-21604bd53e54',
        budgetId: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        amount: 0,
        description: 'fruits',
      },
      {
        id: 'b1ab8ec0-95eb-422b-9cbd-01657ac3c7d7',
        budgetId: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        amount: 0,
        description: 'delivery',
      },
      {
        id: 'e5f6e2cf-833e-4986-ac8e-e13d9db0136e',
        budgetId: 'de44412e-f269-4327-a0d1-01ba37ccfd36',
        amount: 0,
        description: 'winter clothes',
      },
      {
        id: 'de2298fc-f37f-4a08-b3b3-f8f4e57c80da',
        budgetId: '97b3e371-bfe1-4e6c-8158-437d15c99f94',
        amount: 0,
        description: 'udemy',
      },
      {
        id: '759ceb30-0ccf-4bab-bad6-69a455e73a5e',
        budgetId: '029a0bdf-569a-4ab0-87e9-cc891e3a59d0',
        amount: 0,
        description: 'necklaces',
      },
      {
        id: 'f5eb5dd5-48ef-412f-8275-680eb286f521',
        budgetId: 'b94458f9-5842-4867-ad66-5af61097a660',
        amount: 0,
        description: 'cat food and stuff',
      },
      {
        id: '8d14b84d-f6a9-4101-8db1-b9dd491e4b21',
        budgetId: 'Uncategorized',
        amount: 0,
        description: 'taxes',
      },
    ]);
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
        clearAllData,
        addDummyData,
      }}>
      {children}
    </BudgetsContext.Provider>
  );
};
