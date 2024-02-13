import {configureStore} from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';
import userProgressSlice from './userProgress-slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
        userProgress: userProgressSlice.reducer
    }
});

export default store;