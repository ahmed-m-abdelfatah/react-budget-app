import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import Header from './components/Header';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { currentCurrencyLogo, UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import './css/style.min.css';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

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
        <Header setShowAddBudgetModal={() => setShowAddBudgetModal(true)} openAddExpenseModal={openAddExpenseModal} />
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
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
          {/* </div> */}
        </section>
      </Container>
      {showAddBudgetModal && (
        <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      )}
      {showAddExpenseModal && (
        <AddExpenseModal
          show={showAddExpenseModal}
          handleClose={() => setShowAddExpenseModal(false)}
          defaultBudgetId={addExpenseModalBudgetId}
        />
      )}
      <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
    </>
  );
}

export default App;
