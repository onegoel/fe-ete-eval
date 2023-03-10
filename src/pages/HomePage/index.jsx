import './HomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllContentTypesWithId,
  getAllCollectionsByContentType,
  getFieldsByContentTypeId,
} from '../../utils/common';
import { Panel, TableRecord, CollectionEntryModal } from '../../components';
import makeRequest from '../../utils/makeRequest';
import { CREATE_COLLECTION } from '../../constants/apiEndPoints';

const HomePage = () => {
  const navigate = useNavigate();
  const [allContentTypes, setAllContentTypes] = useState([]);
  const [collectionRecords, setCollectionRecords] = useState([]);
  const [clickedContentTypeId, setClickedContentTypeId] = useState(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [selectedContentTypeFields, setSelectedContentTypeFields] = useState([]);
  const [showCollections, setShowCollections] = useState(false);
  const [currentView, setCurrentView] = useState('Content types');
  const [entryCount, setEntryCount] = useState(0);
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
    setShowCollections(true);
    setCurrentView(
      allContentTypes.filter((contentType) => contentType.id === contentTypeId)[0].name,
    );
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
    setEntryCount(entryCount + 1);
  };

  const fieldsOfContentType = async (contentTypeId) => {
    const contentTypeFields = await getFieldsByContentTypeId(contentTypeId, navigate);
    console.log('contentTypeFields', contentTypeFields);
    setSelectedContentTypeFields(contentTypeFields);
  };

  // const handleDeleteCollection = (collectionId) => {
  //   makeRequest(DELETE_COLLECTION(collectionId), {}, navigate, 'api')
  //     .then((response) => {
  //       console.log('response', response);
  //       alert('Collection deleted successfully');
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //       alert('Error while deleting collection');
  //     });
  // };

  // const handleEditingFieldValue = async (collectionId, fieldId, value) => {
  //   makeRequest(UPDATE_FIELD_VALUE(collectionId, fieldId, value), {
  //     body: { value },
  //   })
  //     .then((response) => {
  //       console.log('response', response);
  //       alert('Field value updated successfully');
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //       alert('Error while updating field value');
  //     });
  // };

  return (
    <div className='homePageContainer'>
      <div className='panelContainer'>
        <Panel
          allContentTypes={allContentTypes}
          handleClickedCollectionType={handleClickedCollectionType}
          setShowCollections={setShowCollections}
        />
      </div>
      <div className='contentContainer'>
        <div className='contentHeader'>
          <p>{currentView}</p>
        </div>
        <div className='contentBody'>
          {showCollections === true && (
            <div className='tableHeader'>
              <div className='tableHeading'>
                <strong>{`${entryCount} new entries made`}</strong>
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
          )}
          <div className='tableRecordsContainer'>
            {collectionRecords && (
              <TableRecord
                collection={collectionRecords}
                // handleEditingFieldValue={handleEditingFieldValue}
                // handleDeleteCollection={handleDeleteCollection}
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
