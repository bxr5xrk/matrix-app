import { MatrixProvider } from '../../features/matrix/matrixContext';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import cl from './MainPage.module.scss';

export default function MainPage() {
  return (
    <MatrixProvider>
      <main className={cl.root}>
        <Form />

        <Table />
      </main>
    </MatrixProvider>
  );
}
