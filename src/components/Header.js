import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useBudgets } from '../contexts/BudgetsContext';

export default function Header({ setShowAddBudgetModal, openAddExpenseModal }) {
  const { clearAllData, addDummyData } = useBudgets();

  return (
    <Stack direction='horizontal' gap='2' className='mb-4 text-capitalize flex-wrap justify-content-end'>
      <h1 className='me-auto'>budgets</h1>
      <Button variant='outline-secondary' className='text-capitalize' onClick={addDummyData}>
        add dummy data
      </Button>
      <Button variant='primary' className='text-capitalize' onClick={setShowAddBudgetModal}>
        add budget
      </Button>
      <Button variant='outline-primary' className='text-capitalize' onClick={openAddExpenseModal}>
        add expense
      </Button>
      <Button variant='danger' className='text-capitalize' onClick={clearAllData}>
        clear all data
      </Button>
    </Stack>
  );
}
