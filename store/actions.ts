import { createAction } from '@reduxjs/toolkit';

export const updateDataStart = createAction('updateDataStart');
export const updateDataSuccess = createAction<string>('updateDataSuccess');
export const updateDataError = createAction<string>('updateDataError');
export const updateDataReset = createAction<string>('updateDataReset');
