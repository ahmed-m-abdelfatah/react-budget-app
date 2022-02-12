import { Modal, Button, Stack } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal' gap={2}>
            <div>Expenses - {budget.name}</div>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
