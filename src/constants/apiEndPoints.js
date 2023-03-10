export const BACKEND_URL = 'http://localhost:8000';

export const GET_CONTENT_TYPES = {
    url: '/api/content',
    method: 'get',
};

export const GET_COLLECTIONS_BY_TYPE = (contentTypeId) => ({
    url: `/api/collection/content-type/${contentTypeId}`,
    method: 'get'
});

export const CREATE_COLLECTION = (contentTypeId, data) => ({
    url: `/api/collection/create/${contentTypeId}`,
    method: 'post',
    data: {
        ...data
    }
});

export const GET_FIELDS_BY_CONTENT_TYPE = (contentTypeId) => ({
    url: `/api/content/${contentTypeId}/field`,
    method: 'get'
});

export const UPDATE_FIELD_VALUE = (collectionId, fieldId, data) => ({
    url: `/api/collection/${collectionId}/field/${fieldId}`,
    method: 'put',
    data: {
        ...data
    }
});


