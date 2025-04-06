import { createAction } from '@reduxjs/toolkit';

// Define action type constants
export const FETCH_START = 'user/fetchStart';
export const FETCH_SUCCESS = 'user/fetchSuccess';
export const FETCH_FAILURE = 'user/fetchFailure';

// Define action creators
export const fetchStart = createAction(FETCH_START);
export const fetchSuccess = createAction<{ name: string; email: string }>(FETCH_SUCCESS);
export const fetchFailure = createAction<string>(FETCH_FAILURE);
