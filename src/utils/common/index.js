import makeRequest from '../makeRequest'
import { GET_CONTENT_TYPES, GET_COLLECTIONS_BY_TYPE } from '../../constants/apiEndPoints';


export const getAllContentTypesWithId = async (navigate) => {
    const response = await makeRequest(GET_CONTENT_TYPES, {}, navigate, 'api');
    const contentTypes = response.data.contentTypes;
    const contentTypeWithId = contentTypes.map((contentType) => {
        return { id: contentType.id, name: contentType.name };
    });
    return contentTypeWithId;
};

export const getAllCollectionsByContentType = async (contentTypeId, navigate) => {
    const response = await makeRequest(GET_COLLECTIONS_BY_TYPE(contentTypeId), {}, navigate, 'api');
    console.log(response);
    const { collection } = response.data;
    console.log('collection', collection);
    const records = collection.map((item) => {
        const record = {
            collectionId: item.id,
        };
        item.entities.forEach((entity) => {
            record[entity.field] = entity.value;
        });
        return record;
    });

    return records;
}