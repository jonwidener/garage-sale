import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { conditionString, CONDITION_BADGE } from '../models/ControlUnit.model';
import monify from '../monify';

function Inventory() {
  const { data } = useContext(DataContext);

  const { controlUnits, items, accounts } = data;

  return (
    <div className='overflow-x-auto'>
      <table className='table table-compact table-zebra w-full'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Condition</th>
            <th>Account</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {controlUnits.map((cu, index) => (
            <tr key={index} className='hover'>
              <td>{+index + 1}</td>
              <td>{items[cu.itemNo].name}</td>
              <td>{items[cu.itemNo].description}</td>
              <td>
                {items[cu.itemNo].tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className='badge badge-outline badge-secondary mr-1'
                  >
                    {tag}
                  </div>
                ))}
              </td>
              <td>
                <div className={`badge ${CONDITION_BADGE[cu.condition]}`}>
                  {conditionString(cu.condition)}
                </div>
              </td>
              <td>{accounts[cu.account].name}</td>
              <td>{monify(cu.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/additems' className='btn btn-primary mt-2'>
        Add Items
      </Link>
    </div>
  );
}

export default Inventory;
