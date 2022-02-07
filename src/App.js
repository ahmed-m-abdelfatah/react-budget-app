import { Container, Stack, Button } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import './css/style.min.css';

function App() {
  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4 text-capitalize'>
        <h1 className='me-auto'>budgets</h1>
        <Button variant='primary' className='text-capitalize'>
          add budget
        </Button>
        <Button variant='outline-primary' className='text-capitalize'>
          add expense
        </Button>
      </Stack>
      <section className='cards'>
        <div>
          <BudgetCard name='Entertainment' amount={200} max={1000}></BudgetCard>
        </div>
      </section>
    </Container>
  );
}

export default App;
