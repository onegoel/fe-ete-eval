import './HomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllContentTypesWithId,
  getAllCollectionsByContentType,
  getFieldsByContentTypeId,
} from '../../utils/common'; //eslint-disable-line
import { Panel, TableRecord, CollectionEntryModal } from '../../components';
import makeRequest from '../../utils/makeRequest';
import { CREATE_COLLECTION } from '../../constants/apiEndPoints';

const HomePage = () => {
  const navigate = useNavigate();
  const [allContentTypes, setAllContentTypes] = useState([]);
  const [collectionRecords, setCollectionRecords] = useState([]);
  const [clickedContentTypeId, setClickedContentTypeId] = useState(null); //eslint-disable-line
  const [showEntryForm, setShowEntryForm] = useState(false); //eslint-disable-line
  const [selectedContentTypeFields, setSelectedContentTypeFields] = useState([]); //eslint-disable-line

  useEffect(
    () => async () => {
      const allContentTypesWithId = await getAllContentTypesWithId(navigate);
      console.log('allContentTypesWithId', allContentTypesWithId);
      setAllContentTypes(allContentTypesWithId);
    },
    [],
  );

  const handleClickedCollectionType = async (contentTypeId) => {
    const collectionRecords = await getAllCollectionsByContentType(contentTypeId, navigate);
    console.log('collectionRecords', collectionRecords);
    setCollectionRecords(collectionRecords);
    setClickedContentTypeId(contentTypeId);
  };

  const handleAddNewEntry = (data) => {
    console.log(data);
    makeRequest(
      CREATE_COLLECTION(clickedContentTypeId, data),
      {
        body: { ...data },
      },
      navigate,
      'api',
    )
      .then((response) => {
        console.log('response', response);
        alert('New entry added successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.log('error', error);
        alert('Error while adding new entry');
      });
  };

  const fieldsOfContentType = async (contentTypeId) => {
    const contentTypeFields = await getFieldsByContentTypeId(contentTypeId, navigate);
    console.log('contentTypeFields', contentTypeFields);
    setSelectedContentTypeFields(contentTypeFields);
  };

  const handleEditingFieldValue = async (collectionId, fieldId, value) => {};

  console.log(collectionRecords);

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
            <div
              className='addNewEntry'
              onClick={async () => {
                await fieldsOfContentType(clickedContentTypeId);
                console.log(selectedContentTypeFields);
                setShowEntryForm(true);
              }}
            >
              Add a new entry
            </div>
          </div>
          <div className='tableRecordsContainer'>
            {collectionRecords && (
              <TableRecord
                collection={collectionRecords}
                handleEditingFieldValue={handleEditingFieldValue}
              />
            )}
          </div>
          {showEntryForm === true &&
            clickedContentTypeId !== null &&
            clickedContentTypeId !== undefined && (
              <CollectionEntryModal
                contentTypeFields={selectedContentTypeFields}
                handleAddNewEntry={handleAddNewEntry}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
