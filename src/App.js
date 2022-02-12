import { useState } from 'react';
import { Container, Stack, Button } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import { useBudgets } from './contexts/BudgetsContext';
import './css/style.min.css';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const { budgets, getBudgetExpenses, clearAllData, addDummyData } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4 text-capitalize flex-wrap justify-content-end'>
          <h1 className='me-auto'>budgets</h1>
          <Button variant='outline-secondary' className='text-capitalize' onClick={addDummyData}>
            add dummy data
          </Button>
          <Button variant='primary' className='text-capitalize' onClick={() => setShowAddBudgetModal(true)}>
            add budget
          </Button>
          <Button variant='outline-primary' className='text-capitalize' onClick={openAddExpenseModal}>
            add expense
          </Button>
          <Button variant='danger' className='text-capitalize' onClick={clearAllData}>
            clear all data
          </Button>
        </Stack>
        <section className='cards'>
          {/* <div> */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='my-masonry-grid'
            columnClassName='my-masonry-grid_column'>
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
          </Masonry>
          <UncategorizedBudgetCard />
          <TotalBudgetCard />
          {/* </div> */}
        </section>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
    </>
  );
}

export default App;
