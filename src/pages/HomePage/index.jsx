import './HomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContentTypesWithId, getAllCollectionsByContentType } from '../../utils/common'; //eslint-disable-line
import { Panel, TableRecord } from '../../components';
import makeRequest from '../../utils/makeRequest';
import { CREATE_COLLECTION } from '../../constants/apiEndPoints';

const HomePage = () => {
  const navigate = useNavigate();
  const [allContentTypes, setAllContentTypes] = useState([]);
  const [collectionRecords, setCollectionRecords] = useState([]);
  const [clickedContentTypeId, setClickedContentTypeId] = useState(null); //eslint-disable-line

  useEffect(
    () => async () => {
      const allContentTypesWithId = await getAllContentTypesWithId(navigate);
      console.log('allContentTypesWithId', allContentTypesWithId);
      setAllContentTypes(allContentTypesWithId);
    },
    [],
  );

  // this will go inside a handler
  // click handlers: on collection type, content type builder

  const handleClickedCollectionType = async (contentTypeId) => {
    const collectionRecords = await getAllCollectionsByContentType(contentTypeId, navigate);
    console.log('collectionRecords', collectionRecords);
    setCollectionRecords(collectionRecords);
    setClickedContentTypeId(contentTypeId);
  };

  const handleClickAddNewEntry = (clickedContentTypeId, data = {}) => {
    makeRequest(
      CREATE_COLLECTION,
      {
        ...data,
      },
      navigate,
      'api',
    )
      .then((response) => {
        console.log('response', response);
        alert('New entry added successfully');
      })
      .catch((error) => {
        console.log('error', error);
        alert('Error while adding new entry');
      });
  };

  return (
    <div className='homePageContainer'>
      <div className='panelContainer'>
        <Panel
          allContentTypes={allContentTypes}
          handleClickedCollectionType={handleClickedCollectionType}
        />
      </div>
      <div className='contentContainer'>
        <div className='contentHeader'>
          <p>Content type/name</p>
        </div>
        <div className='contentBody'>
          <div className='tableHeader'>
            <div className='tableHeading'>
              <strong>13 new entries made</strong>
            </div>
            <div className='addNewEntry' onClick={() => handleClickAddNewEntry}>
              Add a new entry
            </div>
          </div>
          <div className='tableRecordsContainer'>
            {collectionRecords && <TableRecord collection={collectionRecords} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
