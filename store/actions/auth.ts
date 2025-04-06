import { createAction } from '@reduxjs/toolkit';

// Define action type constants
export const LOGIN_START = 'auth/loginStart';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';

// Define action creators
export const loginStart = createAction(LOGIN_START);
export const loginSuccess = createAction<{ name: string; email: string }>(LOGIN_SUCCESS);
export const loginFailure = createAction<string>(LOGIN_FAILURE);
