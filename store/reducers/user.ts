import { createReducer } from '@reduxjs/toolkit';
import { fetchStart, fetchSuccess, fetchFailure } from '../actions/userActions';
import {User as UserData} from '../../entities/user'

interface UserData {
    name: string;
    email: string;
}

interface UserState {
    loading: boolean;
    error: string | null;
    data: UserData | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    data: null,
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchStart, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSuccess, (state, action) => {
            state.loading = false;
            state.data = action.payload; // Here, payload is { name: string; email: string; }
        })
        .addCase(fetchFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Here, payload is string
        });
});

export default userReducer;
