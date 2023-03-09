export const AUTH_URL = 'http://localhost:8100/auth';

export const LOGIN_USER = (email, password) => ({
    url: '/login',
    method: 'post',
    data: {
        email,
        password,
    },
    withCredentials: true
});

export const REGISTER_USER = (email, password) => ({
    url: '/register',
    method: 'post',
    data: {
        email,
        password,
    },
});

export const VALIDATE_USER = {
    url: '/validate',
    method: 'get',
};