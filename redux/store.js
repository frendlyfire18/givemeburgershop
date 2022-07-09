import {
    configureStore,
} from '@reduxjs/toolkit';
import cartReducer from '../redux/feature/cartSlice';

export const store = configureStore({
    reducer: {
        counter: cartReducer,
    },
});