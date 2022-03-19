import { useState, useContext } from 'react';
import DataContext from '../context/DataContext';

function ItemSearch() {
  const [search, setSearch] = useState('');
  const { data, setData } = useContext(DataContext);
  const { controlUnits, items, accounts } = data;
  const [selectedItem, setSelectedItem] = useState(null);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onItemClick = (e) => {
    setSelectedItem(+e.target.id);
  };

  const itemFilter = ({ name, description, tags }) => {
    const searchClean = search.trim().toUpperCase();
    if (search.trim().length > 0) {
      if (name.toUpperCase().includes(searchClean)) {
        return true;
      }
      if (description.toUpperCase().includes(searchClean)) {
        return true;
      }
      if (tags.some((tag) => tag.toUpperCase().includes(searchClean))) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  };

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <label htmlFor='search' className='input-group mb-2'>
          <span>Search</span>
          <input
            name='search'
            type='text'
            placeholder='Item Search'
            className='input input-bordered'
            value={search}
            onChange={onSearchChange}
          />
        </label>
        <ul className='mb-2'>
          {items
            .filter((item) => itemFilter(item))
            .map(({ name }, index) => (
              <li
                key={index}
                id={index}
                onClick={onItemClick}
                className={selectedItem == index ? 'bg-primary' : ''}
              >
                {name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemSearch;
