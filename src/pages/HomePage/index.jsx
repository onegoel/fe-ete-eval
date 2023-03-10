import './HomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllContentTypesWithId,
  getAllCollectionsByContentType,
  getFieldsByContentTypeId,
} from '../../utils/common';
import { FaHandPointRight, FaEdit } from 'react-icons/fa';
import { Panel, TableRecord, CollectionEntryModal, NewContentTypeModal } from '../../components';
import makeRequest from '../../utils/makeRequest';
import { CREATE_COLLECTION, CREATE_CONTENT_TYPE } from '../../constants/apiEndPoints';

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
  const [createContentType, setCreateContentType] = useState(false);

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

  // const handleDisplayOfFieldsOfSelectedContentType = async (contentTypeId) => {
  //   await fieldsOfContentType(contentTypeId);
  // };

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

  const handleSubmitNewContentType = (name) => {
    console.log(name);
    makeRequest(
      CREATE_CONTENT_TYPE(name),
      {
        data: { name },
      },
      navigate,
      'api',
    )
      .then((response) => {
        console.log('response', response);
        alert('Successfully created new content type');
        window.location.reload();
      })
      .catch((error) => {
        console.log('error', error);
        alert(error.message);
      });
  };

  return (
    <div className='homePageContainer'>
      <div className='panelContainer'>
        <Panel
          allContentTypes={allContentTypes}
          handleClickedCollectionType={handleClickedCollectionType}
          setShowCollections={setShowCollections}
          setCreateContentType={setCreateContentType}
          setCurrentView={setCurrentView}
        />
      </div>
      <div className='contentContainer'>
        <div className='contentHeader'>
          <p>{currentView}</p>
        </div>
        <div className='contentBody'>
          {showCollections === true ? (
            <>
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
                  {'Add a new entry'}
                </div>
              </div>
              <div className='tableRecordsContainer'>
                <TableRecord
                  collection={collectionRecords}
                  // handleEditingFieldValue={handleEditingFieldValue}
                  // handleDeleteCollection={handleDeleteCollection}
                />
              </div>
            </>
          ) : (
            <div className='contentTypeBuilderContainer'>
              <div className='allTypes'>
                <button onClick={() => setCreateContentType(true)}>{'+ NEW TYPE'}</button>
                {allContentTypes.map((contentType, index) => (
                  <div
                    className='collectionType'
                    key={index}
                    onClick={() => {
                      setCreateContentType(contentType.name);
                      setClickedContentTypeId(contentType.id);
                    }}
                  >
                    <FaHandPointRight style={({ color: 'white' }, { padding: '5px' })} />
                    <span>{contentType.name}</span>
                  </div>
                ))}
              </div>
              <div className='fieldDetails'>
                <div className='fieldDetailsHeader'>
                  <span className='headerSpan'>
                    <h1>Content Type</h1>
                    <FaEdit style={({ color: 'white' }, { padding: '5px' })} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {showEntryForm === true &&
            clickedContentTypeId !== null &&
            clickedContentTypeId !== undefined && (
              <CollectionEntryModal
                contentTypeFields={selectedContentTypeFields}
                handleAddNewEntry={handleAddNewEntry}
              />
            )}
          {createContentType === true && (
            <NewContentTypeModal
              setCreateContentType={setCreateContentType}
              handleSubmitNewContentType={handleSubmitNewContentType}
              createContentType={createContentType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
