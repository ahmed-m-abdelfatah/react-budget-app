import { Form, Modal, Button } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useBudgets } from '../contexts/BudgetsContext';

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault(); // stop page loading
    if (maxRef.current.value > 0) {
      maxRef.current.style.cssText = '';
      addBudget({
        name: nameRef.current.value,
        max: parseFloat(maxRef.current.value),
      });
      handleClose();
    } else {
      maxRef.current.style.cssText = 'border-color: red;box-shadow: 0 0 0 0.25rem rgb(255 0 0 / 25%);';
    }
  }

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type='text' required autoComplete='off' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='max'>
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control ref={maxRef} type='number' required min={0} step={0.01} autoComplete='off' />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
