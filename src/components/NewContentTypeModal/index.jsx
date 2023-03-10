import { useState } from 'react';
import './NewContentTypeModal.css';
import propTypes from 'prop-types';

const NewContentTypeModal = ({ handleSubmitNewContentType }) => {
  const [contentTypeName, setContentTypeName] = useState('');
  //   const fieldNames = contentTypeFields.map((field) => field.name);

  const handleChange = (event) => {
    setContentTypeName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSubmitNewContentType(contentTypeName);
  };

  return (
    <div className='entryModal'>
      <div className='modalContent'>
        <div className='modalHeader'>
          <h4>New record entry</h4>
        </div>
        <div className='modalBody'>
          <form>
            <label>{'Name of the content type'}</label>
            <input type='text' value={contentTypeName} onChange={(event) => handleChange(event)} />
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

NewContentTypeModal.propTypes = {
  contentTypeFields: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }),
  ),
  // handleAddNewEntry: propTypes.func.isRequired,
  handleSubmitNewContentType: propTypes.func.isRequired,
};

export default NewContentTypeModal;
