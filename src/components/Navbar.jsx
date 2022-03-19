import { Link } from 'react-router-dom';
import { FaCashRegister } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-none'>
        <label
          htmlFor='my-drawer'
          className='btn btn-square btn-ghost drawer-button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost normal-case text-xl'>
          Garage Sale
        </Link>
      </div>
      <div className='flex-none'>
        <Link to='/cashier' className='btn btn-ghost'>
          <FaCashRegister />
        </Link>
        {/*
        <button className='btn btn-square btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            ></path>
          </svg>
        </button>
        */}
      </div>
    </div>
  );
}

export default Navbar;
