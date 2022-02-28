import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { Link } from 'react-router-dom';

function Accounts() {
  const { data } = useContext(DataContext);

  const { accounts } = data;

  return (
    <div>
      <table className='table table-compact table-zebra w-full'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index} className='hover'>
              <td>{+index + 1}</td>
              <td>{account.name}</td>
              <td>{account.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to='/addaccount' className='btn btn-primary mt-2'>
        Add Account
      </Link>
    </div>
  );
}

export default Accounts;
