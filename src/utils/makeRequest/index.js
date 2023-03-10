import axios from 'axios';
import { BACKEND_URL } from '../../constants/apiEndPoints';
import { AUTH_URL } from '../../constants/authEndPoints';
import { ERROR_ROUTE } from '../../constants/routes';

const makeRequest = async (
    endPoint,
    dynamicConfig = {},
    navigate = null,
    type = 'auth',
) => {
    try {
        // console.log('apiEndPoint', apiEndPoint);
        const baseURL = type === 'auth' ? AUTH_URL : BACKEND_URL;
        const requestDetails = {
            baseURL,
            ...endPoint,
            ...dynamicConfig,
        };
        const { data } = await axios(requestDetails);
        return data;
    } catch (e) {
        console.log(e);
        if (navigate) {
            const errorStatus = e.response?.status;
            if (errorStatus) {
                navigate(ERROR_ROUTE(errorStatus));
            } else {
                navigate(ERROR_ROUTE(500));
            }
        }
    }
};

export default makeRequest;