import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import ControlUnitModel, {
  CONDITION_STRING,
} from '../models/ControlUnit.model';
import ItemModel from '../models/Item.model';

function AddItems() {
  const { data, setData } = useContext(DataContext);
  const [itemFormData, setItemFormData] = useState({
    name: '',
    description: '',
    defaultPrice: 1,
    tags: [],
  });
  const [count, setCount] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [step, setStep] = useState(2);

  const { name, description, defaultPrice, tags } = itemFormData;
  const { controlUnits, items, accounts } = data;

  const navigate = useNavigate();

  const onItemChange = (e) => {
    setItemFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === 'number' ? +e.target.value : e.target.value,
    }));
  };

  const onCountChange = (e) => {
    if (count < e.target.value) {
      const newTableRows = tableRows.slice();
      while (newTableRows.length < e.target.value) {
        newTableRows.push({
          condition: 0,
          account: 0,
          price: defaultPrice,
        });
      }
      setTableRows(newTableRows);
    } else {
      const newTableRows = tableRows.slice(0, e.target.value);
      setTableRows(newTableRows);
    }
    setCount(+e.target.value < 0 ? 0 : +e.target.value);
  };

  const onControlUnitsChange = (e) => {
    const newTableRow = {
      ...tableRows[+e.target.id],
      [e.target.name]: +e.target.value,
    };
    const newTableRows = tableRows.slice();
    newTableRows[+e.target.id] = newTableRow;
    setTableRows(newTableRows);
  };

  const onItemSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const onControlUnitsSubmit = (e) => {
    e.preventDefault();
    const newItems = items.slice();
    const itemNo = items.length;
    newItems.push(
      new ItemModel({
        itemNo,
        name,
        description,
        defaultPrice,
        tags: tags.split(/[\s,;.]+/),
      })
    );

    const newControlUnits = controlUnits.slice();
    for (const { condition, price } of tableRows) {
      newControlUnits.push(
        new ControlUnitModel({
          controlNo: newControlUnits.length,
          itemNo,
          condition,
          price,
        })
      );
    }

    setData((prevState) => ({
      ...prevState,
      items: newItems,
      controlUnits: newControlUnits,
    }));
    navigate('/inventory');
  };

  const onCancelClick = () => {
    navigate('/inventory');
  };

  return (
    <>
      <ul className='steps w-full content-center'>
        <li className='step step-primary'>Choose New or Existing Item</li>
        <li className={`step ${step > 1 && 'step-primary'}`}>
          Set Item Information
        </li>
        <li className={`step ${step > 2 && 'step-primary'}`}>
          Add Individual Items
        </li>
      </ul>
      <div className='flex'>
        <div className='flex-initial'></div>
        <div className='flex-initial mx-2'>
          {step > 1 && (
            <>
              <h1 className='text-2xl m-2'>Describe items to add</h1>
              <div className='card w-96 bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <form className='form-control' onSubmit={onItemSubmit}>
                    <label htmlFor='name' className='input-group mb-2'>
                      <span>Name</span>
                      <input
                        name='name'
                        type='text'
                        placeholder='Item Name'
                        className='input input-bordered'
                        value={name}
                        onChange={onItemChange}
                        required
                      />
                    </label>
                    <label
                      htmlFor='description'
                      className='input-group input-group-vertical mb-2'
                    >
                      <span>Description</span>
                      <textarea
                        name='description'
                        type='text'
                        placeholder='Item Description'
                        className='textarea textarea-bordered'
                        value={description}
                        onChange={onItemChange}
                        required
                      />
                    </label>
                    <label htmlFor='defaultPrice' className='input-group mb-2'>
                      <span>Default Price</span>
                      <input
                        name='defaultPrice'
                        type='number'
                        placeholder='Default Item Price'
                        className='input input-bordered'
                        value={defaultPrice}
                        onChange={onItemChange}
                      />
                    </label>
                    <label
                      htmlFor='tags'
                      className='input-group input-group-vertical mb-2'
                    >
                      <span>Tags</span>
                      <textarea
                        name='tags'
                        type='text'
                        placeholder='Item Tags'
                        className='textarea textarea-bordered'
                        value={tags}
                        onChange={onItemChange}
                      />
                    </label>
                    <div className='btn-group'>
                      <button type='submit' className='btn btn-primary'>
                        Next
                      </button>
                      <button
                        type='button'
                        className='btn btn-ghost'
                        onClick={onCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='flex-initial'>
          {step > 2 && (
            <>
              <h1 className='text-2xl m-2'>Add Individual Items</h1>
              <div className='card w-96 bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <form
                    className='form-control'
                    onSubmit={onControlUnitsSubmit}
                  >
                    <label htmlFor='count' className='input-group mb-2'>
                      <span>Number of Items</span>
                      <input
                        name='count'
                        type='number'
                        placeholder='Item Count'
                        className='input input-bordered'
                        value={count}
                        onChange={onCountChange}
                      />
                    </label>
                    <table className='table table-compact w-full'>
                      <thead>
                        <tr>
                          <th>Condition</th>
                          <th>Account</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map(
                          ({ condition, account, price }, index) => (
                            <tr key={index}>
                              <td>
                                <select
                                  id={index}
                                  name='condition'
                                  className='select select-bordered select-sm'
                                  value={condition}
                                  onChange={onControlUnitsChange}
                                >
                                  {CONDITION_STRING.map((el, index) => (
                                    <option key={index} value={index}>
                                      {el}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select
                                  id={index}
                                  name='account'
                                  className='select select-bordered select-sm'
                                  value={account}
                                  onChange={onControlUnitsChange}
                                >
                                  {accounts.map((el, index) => (
                                    <option key={index} value={index}>
                                      {el.name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input
                                  id={index}
                                  name='price'
                                  type='number'
                                  placeholder='Unit Price'
                                  className='input input-bordered w-full input-sm'
                                  value={price}
                                  onChange={onControlUnitsChange}
                                />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <div className='btn-group'>
                      <button type='submit' className='btn btn-primary'>
                        Submit
                      </button>
                      <button
                        type='button'
                        className='btn btn-ghost'
                        onClick={onCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddItems;
