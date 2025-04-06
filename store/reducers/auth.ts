import { createReducer } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from '../actions/userActions';
import {User as UserData} from '../../entities/user'

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

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loginStart, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginSuccess, (state, action) => {
            state.loading = false;
            state.data = action.payload; 
        })
        .addCase(loginFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default authReducer;
