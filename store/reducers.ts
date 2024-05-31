import { createReducer } from '@reduxjs/toolkit';
import { updateDataStart, updateDataSuccess, updateDataError, updateDataReset } from './actions';

interface State {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateDataStart, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateDataSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(updateDataError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateDataReset, (state) => {
      state.loading = false;
      state.error = null;
      state.data = null
    });
});

export default rootReducer;
