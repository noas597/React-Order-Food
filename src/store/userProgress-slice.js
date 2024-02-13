import {createSlice} from '@reduxjs/toolkit';

const userProgressSlice = createSlice({
    name: "userProgress",
    initialState: {progress: '', /*cartIsVisible: false,*/},
    reducers:{
        showCart(state, action){
            state.progress = 'cart';
            // state.cartIsVisible = true;
        },
        hideCart(state, action){
            state.progress = '';
            // state.cartIsVisible = false;
        },
        showCheckout(state, action){
            state.progress = 'checkout';
            // state.cartIsVisible = false;
        },
        hideCheckout(state, action){
            state.progress = '';
            // state.cartIsVisible = false;
        }
    }
});

export const userProgressActions = userProgressSlice.actions;
export default userProgressSlice;