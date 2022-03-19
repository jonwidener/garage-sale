import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { FileInput, FileSave } from './FileInputOutput';

function DrawerContents() {
  const { data, loadData } = useContext(DataContext);

  return (
    <ul className='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
      <li>
        <Link to='/accounts'>Accounts</Link>
      </li>
      <li>
        <Link to='/inventory'>Inventory</Link>
      </li>
      <li>
        <Link to='/sales'>Sales</Link>
      </li>
      <li>
        <Link to='/cashier'>Cashier</Link>
      </li>
      <li>
        <FileInput onFileLoad={loadData} />
      </li>
      <li>
        <FileSave name={'garage-sale-data.txt'} data={data} />
      </li>
    </ul>
  );
}

export default DrawerContents;
