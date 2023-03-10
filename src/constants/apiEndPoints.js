export const BACKEND_URL = 'http://localhost:8000';

export const GET_CONTENT_TYPES = {
    url: '/api/content',
    method: 'get',
};

export const GET_COLLECTIONS_BY_TYPE = (contentTypeId) => ({
    url: `/api/collection/content-type/${contentTypeId}`,
    method: 'get'
});

export const CREATE_COLLECTION = (contentTypeId) => ({
    url: `/api/collection/create/${contentTypeId}`,
    method: 'post'
});

// export const UPDATE_COLLECTION = (collectionId) => ({

// export const DELETE_COLLECTION = (collectionId) => ({