import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import authReducer from './reducers/auth'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
