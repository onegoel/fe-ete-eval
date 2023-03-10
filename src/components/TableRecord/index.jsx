import './TableRecord.css';
import propTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableRecord = ({ collection /*handleEditingFieldValue handleDeleteCollection*/ }) => {
  return (
    <>
      {collection.map((record, index) => (
        <div className='tableRecord' key={index}>
          {Object.keys(record).map((key, index) => (
            <div className='tableRecordItem' key={index}>
              <span>{record[key]}</span>
            </div>
          ))}
          <div className='actions'>
            <FaEdit />
            <FaTrash />
          </div>
        </div>
      ))}
    </>
  );
};

TableRecord.propTypes = {
  collection: propTypes.object.isRequired,
  handleDeleteCollection: propTypes.func.isRequired,
};

export default TableRecord;
