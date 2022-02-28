import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import AccountModel from '../models/Account.model';

function AddAccount() {
  const { data, setData } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { accounts } = data;
  const { name, description } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === 'number' ? +e.target.value : e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newAccounts = accounts.slice();
    newAccounts.push(
      new AccountModel({
        accountNo: newAccounts.length,
        name,
        description,
      })
    );

    setData((prevState) => ({
      ...prevState,
      accounts: newAccounts,
    }));
    navigate('/accounts');
  };

  const onCancelClick = () => {
    navigate('/accounts');
  };

  return (
    <>
      <div className='flex'>
        <div className='flex-initial'></div>
        <div className='flex-initial mx-2'>
          <h1 className='text-2xl m-2'>Add Account</h1>
          <div className='card w-96 bg-base-100 shadow-xl'>
            <div className='card-body'>
              <form className='form-control' onSubmit={onSubmit}>
                <label htmlFor='name' className='input-group mb-2'>
                  <span>Name</span>
                  <input
                    name='name'
                    type='text'
                    placeholder='Account Name'
                    className='input input-bordered'
                    value={name}
                    onChange={onChange}
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
                    placeholder='Account Description'
                    className='textarea textarea-bordered'
                    value={description}
                    onChange={onChange}
                    required
                  />
                </label>
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
        </div>
      </div>
    </>
  );
}

export default AddAccount;
