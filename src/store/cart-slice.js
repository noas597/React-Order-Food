import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        // totalAmount: 0,
        changed: false,
        userProgress: ''
    },
    reducers:{
        replaceCart(state, action) {
          state.totalQuantity = action.payload.totalQuantity;
          state.items = action.payload.items;
          state.changed = false;
        },
        addItemToCart(state, action){
            const newItem = action.payload;
            const exisitingItem = state.items.find(item=>item.itemId === newItem.id);
            state.totalQuantity ++;
            state.changed = true;

            if(!exisitingItem){
                state.items.push({
                    itemId: newItem.id, 
                    name: newItem.name,
                    price: parseFloat(newItem.price),
                    quantity: 1,
                    totalPrice: parseFloat(newItem.price),
                    image: newItem.image
                });
            } else {
                exisitingItem.quantity ++;
                exisitingItem.totalPrice += parseFloat(newItem.price); 
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const exitinigItem = state.items.find(item => item.itemId === id);
            state.totalQuantity --;
            state.changed = true;

            if(exitinigItem.quantity === 1){
                state.items = state.items.filter(item => item.itemId !== id);
            } else {
                exitinigItem.quantity --;
                exitinigItem.totalPrice -= parseFloat(exitinigItem.price);
            }
        },
        showCart(state, action) {
            state.userProgress = 'cart';
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;