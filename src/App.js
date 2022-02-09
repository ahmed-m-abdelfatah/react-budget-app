import { useState } from 'react';
import { Container, Stack, Button } from 'react-bootstrap';
import AddBudgetModal from './components/AddBudgetModal';
import BudgetCard from './components/BudgetCard';
import { useBudgets } from './contexts/BudgetsContext';
import './css/style.min.css';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4 text-capitalize'>
          <h1 className='me-auto'>budgets</h1>
          <Button variant='primary' className='text-capitalize' onClick={() => setShowAddBudgetModal(true)}>
            add budget
          </Button>
          <Button variant='outline-primary' className='text-capitalize' onClick={openAddExpenseModal}>
            add expense
          </Button>
        </Stack>
        <section className='cards'>
          <div>
            {budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                  onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                />
              );
            })}
          </div>
        </section>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />{' '}
    </>
  );
}

export default App;
