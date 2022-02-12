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
      if (prevBudgets.find(budget => budget.name === name)) {
        const budgetIndex = prevBudgets.findIndex(budget => budget.name === name);
        const budget = prevBudgets[budgetIndex];
        const newBudget = { ...budget, max };
        prevBudgets.splice(budgetIndex, 1, newBudget);

        return [...prevBudgets]; // new array cuz reference vs value
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

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
        max: 120,
      },
      {
        id: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        name: 'Food',
        max: 130,
      },
      {
        id: 'b0f92e5e-ba62-4679-a61d-27a528b8c4a2',
        name: 'Car wash and oil change',
        max: 90,
      },
      {
        id: 'fbe69d54-2cab-43ee-95ec-94eb2897f2b2',
        name: 'Electronics',
        max: 210,
      },
      {
        id: '029a0bdf-569a-4ab0-87e9-cc891e3a59d0',
        name: 'Jewelry',
        max: 160,
      },
      {
        id: 'de44412e-f269-4327-a0d1-01ba37ccfd36',
        name: 'Clothes',
        max: 110,
      },
      {
        id: '97b3e371-bfe1-4e6c-8158-437d15c99f94',
        name: 'Learning courses',
        max: 140,
      },
      {
        id: 'b94458f9-5842-4867-ad66-5af61097a660',
        name: 'cat',
        max: 100,
      },
      {
        id: 'e262c3a6-6696-41a3-8e27-aab2b5bdeec9',
        name: 'Delete Me v1',
        max: 100,
      },
      {
        id: '45872c43-e551-49ed-a301-d1b2bf169bf0',
        name: 'Delete Me v2',
        max: 100,
      },
    ]);
    setExpenses([
      {
        id: 'bd4a350e-6308-4393-8e08-df45391e9ee0',
        budgetId: 'b50b2342-d189-491f-b6e8-ed4d80173de5',
        amount: 20,
        description: 'Netflix',
      },
      {
        id: 'a430b49a-99e7-47d5-ad22-8ea1cafc8b9e',
        budgetId: 'b50b2342-d189-491f-b6e8-ed4d80173de5',
        amount: 25,
        description: 'Amazon Prime',
      },
      {
        id: '1a838707-f40b-453b-8ff0-6bf51a3e38ab',
        budgetId: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        amount: 30,
        description: 'Fruits',
      },
      {
        id: 'cbdba68f-f560-4450-b978-2168fcb7d3eb',
        budgetId: 'b0f92e5e-ba62-4679-a61d-27a528b8c4a2',
        amount: 70,
        description: 'oil change',
      },
      {
        id: 'e5e2e610-003c-44a3-bbba-e9f8bb40eaac',
        budgetId: 'de44412e-f269-4327-a0d1-01ba37ccfd36',
        amount: 140,
        description: 'zara',
      },
      {
        id: '2409f137-7945-4500-ac6a-e326fdfbc12d',
        budgetId: '029a0bdf-569a-4ab0-87e9-cc891e3a59d0',
        amount: 100,
        description: 'Ring',
      },
      {
        id: '3d1e013e-2980-41ed-a64a-180f31f54ebe',
        budgetId: 'b94458f9-5842-4867-ad66-5af61097a660',
        amount: 40,
        description: 'cat food',
      },
      {
        id: 'fea31732-210b-42f8-972f-373445ab23c2',
        budgetId: 'd9b273b4-7d52-4327-8e26-5e9f30be6b08',
        amount: 40,
        description: "McDonald's",
      },
      {
        id: '94d5b932-0dd8-40cb-a8c2-ddd38f946595',
        budgetId: 'fbe69d54-2cab-43ee-95ec-94eb2897f2b2',
        amount: 100,
        description: 'Repair iPhone',
      },
      {
        id: '54be4ad2-a739-4c5a-b477-fdaf87b168ec',
        budgetId: '97b3e371-bfe1-4e6c-8158-437d15c99f94',
        amount: 60,
        description: 'React',
      },
      {
        id: 'e0083069-8a6e-4891-a971-c65d10aa7abe',
        budgetId: 'Uncategorized',
        amount: 280,
        description: 'Taxes',
      },
      {
        id: 'dd006e0d-a241-4e18-9c9e-482d9513ee03',
        budgetId: '45872c43-e551-49ed-a301-d1b2bf169bf0',
        amount: 100,
        description: 'Delete Me v2',
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
