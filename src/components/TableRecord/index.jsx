import './TableRecord.css';
import propTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TableRecord = ({ collection }) => {
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
};

export default TableRecord;
