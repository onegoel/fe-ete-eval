import './Panel.css';
import { FaDotCircle } from 'react-icons/fa';
import propTypes from 'prop-types';

const Panel = ({
  allContentTypes,
  handleClickedCollectionType,
  setShowCollections,
  setCurrentView,
}) => {
  return (
    <div>
      <header className='panelHeader'>
        <p>CMS+</p>
      </header>
      <div className='panelOptions'>
        <div className='collectionTypes'>
          <h3>COLLECTION TYPES</h3>
          <div className='collectionTypesList'>
            {allContentTypes.map((contentType, index) => (
              <div
                className='collectionType'
                key={index}
                onClick={() => handleClickedCollectionType(contentType.id)}
              >
                <FaDotCircle style={({ color: 'white' }, { padding: '5px' })} />
                <span>{contentType.name}</span>
              </div>
            ))}
          </div>
          <div
            className='contentTypeBuilder'
            onClick={() => {
              setCurrentView('Content Types');
              setShowCollections(false);
            }}
          >
            <h3>CONTENT TYPE BUILDER</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

Panel.propTypes = {
  allContentTypes: propTypes.array.isRequired,
  handleClickedCollectionType: propTypes.func.isRequired,
  setShowCollections: propTypes.func.isRequired,
  setCurrentView: propTypes.func.isRequired,
};

export default Panel;
