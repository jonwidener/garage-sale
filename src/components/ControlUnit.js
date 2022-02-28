import { useState } from 'react';
import ControlUnitModel, {
  CONDITION_STRING,
  CONDITION_BADGE,
  conditionString,
} from '../models/ControlUnit.model';
import ItemModel from '../models/Item.model';
import PropTypes from 'prop-types';
import monify from '../monify';

const ControlUnit = ({ unit, item, onSave, onDelete, onCancel }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quality: unit.quality,
    price: unit.price,
  });

  const { name, description, quality, price } = formData;

  if (!unit) {
    return <div>Error: no unit provided</div>;
  }
  if (!(unit instanceof ControlUnitModel)) {
    return <div>Error: bad unit type provided</div>;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.type === 'number' ? +e.target.value : e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ ...formData, controlNo: unit.controlNo, itemNo: unit.itemNo });
    }
    setEditMode(false);
  };

  const onCancelClick = () => {
    setEditMode(false);
    setFormData({
      name: item.name,
      description: item.description,
      quality: unit.quality,
      price: unit.price,
    });
  };

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        {editMode ? (
          <>
            <form className='form-control' onSubmit={onSubmit}>
              <label htmlFor='name' className='input-group mb-2'>
                <span>Name</span>
                <input
                  name='name'
                  type='text'
                  placeholder='Item Name'
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
                  placeholder='Item Description'
                  className='textarea textarea-bordered'
                  value={description}
                  onChange={onChange}
                  required
                />
              </label>
              <label htmlFor='quality' className='input-group mb-2'>
                <span>Quality</span>
                <select
                  name='quality'
                  id='quality'
                  className='select select-bordered'
                  value={quality}
                  onChange={onChange}
                >
                  {CONDITION_STRING.map((el, index) => (
                    <option key={index} value={index}>
                      {el}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor='price' className='input-group mb-2'>
                <span>Price</span>
                <input
                  name='price'
                  type='number'
                  placeholder='Item Price'
                  className='input input-bordered'
                  value={price}
                  onChange={onChange}
                />
              </label>
              <div className='btn-group'>
                <button className='btn btn-primary'>Save</button>
                <button
                  type='button'
                  className='btn btn-ghost'
                  onClick={onCancelClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className='card-title'>{name}</h2>
            <h3>{description}</h3>
            <div className='card-actions'>
              <div className={'badge ' + CONDITION_BADGE[quality]}>
                {conditionString(quality)}
              </div>
              <div className='badge badge-outline'>{monify(price)}</div>
            </div>
            <button
              className='btn btn-primary'
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

ControlUnit.propTypes = {
  unit: PropTypes.instanceOf(ControlUnitModel).isRequired,
  item: PropTypes.instanceOf(ItemModel).isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ControlUnit;
