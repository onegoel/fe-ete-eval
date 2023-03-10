import { useState } from 'react';
import './CollectionEntryModal.css';
import propTypes from 'prop-types';

const CollectionEntryModal = ({ contentTypeFields, handleAddNewEntry }) => {
  const [data, setData] = useState({});

  const fieldNames = contentTypeFields.map((field) => field.name);

  const handleChange = (event, fieldName) => {
    setData({
      ...data,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToBeSubmitted = [];
    for (const field of contentTypeFields) {
      const { id, name } = field;
      dataToBeSubmitted.push({ id, value: data[name] });
    }
    handleAddNewEntry({ data: dataToBeSubmitted });
  };

  return (
    <div className='entryModal'>
      <div className='modalContent'>
        <div className='modalHeader'>
          <h4>New record entry</h4>
        </div>
        <div className='modalBody'>
          <form>
            {fieldNames.map((field, index) => (
              <div className='formField' key={index}>
                <label>{field}</label>
                <input
                  type='text'
                  value={data[field]}
                  onChange={(event) => handleChange(event, field)}
                />
              </div>
            ))}
          </form>
        </div>
        <div className='modalFooter'>
          <button className='cancelButton' onClick={() => {}}>
            Cancel
          </button>
          <button className='addButton' onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

CollectionEntryModal.propTypes = {
  contentTypeFields: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }),
  ),
  handleAddNewEntry: propTypes.func.isRequired,
};

export default CollectionEntryModal;
