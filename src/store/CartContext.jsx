// import {createContext, useReducer} from 'react';

// const CartContext = createContext({
//     items: [],
//     totalQuantity: 0,
//     addItem: (item)=>{},
//     removeItem: (id)=>{},
//     clearCart: ()=>{},
//     // sendCartData: (cartData)=>{},
//     // fetchCartData: ()=>{},
//     replaceCart: (cart)=>{}
// });

// function cartReducer(state, action){
//     if(action.type === 'ADD_ITEM'){
//         const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.item.id);

//         const updatedItems = [...state.items];

//         if(existingCartItemIndex > -1){
//             const existingItem = state.items[existingCartItemIndex];
//             const updatedItem = {
//                 ...existingItem,
//                 quantity: existingItem.quantity + 1,
//             };

//             updatedItems[existingCartItemIndex] = updatedItem;
//         } else {
//             updatedItems.push({
//                 ...action.item,
//                 quantity: 1,
//             });
//         }

//         return {
//             ...state,
//             items: updatedItems,
//             totalQuantity: state.totalQuantity + 1,
//         };
//     }

//     if(action.type === 'REMOVE_ITEM'){
//         const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id);

//         const existingCartItem = state.items[existingCartItemIndex];

//         const updatedItems = [...state.items];

//         if(existingCartItem.quantity === 1){
//             updatedItems.splice(existingCartItemIndex, 1);
//         } else {
//             const updatedItem = {
//                 ...existingCartItem,
//                 quantity: existingCartItem.quantity - 1,
//             };

//             updatedItems[existingCartItemIndex] = updatedItem;
//         }

//         return {
//             ...state,
//             items: updatedItems,
//             totalQuantity: state.totalQuantity - 1,
//         };
//     }

//     if(action.type === "CLEAR_CART"){
//         return {
//             ...state, 
//             items: [], 
//             totalQuantity: 0,
//         };
//     }

//     // if(action.type === "SEND_CART_DATA"){
//     //     sendCartData(state.cart);
//     // }

//     // if(action.type === "FETCH_CART_DATA"){

//     // }

//     if(action.type === "REPLACE_CART"){
//         return {
//             ...state,
//             item: state.cart.items || [],
//             totalQuantity: state.cart.totalQuantity || 0
//         };
//     }

//     return state;
// }

// export function CartContextProvider({children}){
//     const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

//     function addItem(item){
//         dispatchCartAction({type: 'ADD_ITEM', item});
//     }

//     function removeItem(id){
//         dispatchCartAction({type: 'REMOVE_ITEM', id});
//     }

//     function clearCart(){
//         dispatchCartAction({type: 'CLEAR_CART'});
//     }

//     // function sendCartData(cartData) {
//     //     dispatchCartAction({type: 'SEND_CART_DATA'});
//     // }

//     // function fetchCartData(){
//     //     dispatchCartAction({type: 'FETCH_CART_DATA'});
//     // }
        
//     function replaceCart(cart){
//         dispatchCartAction({type: 'REPLACE_CART', cart});
//     }

//     const cartContext = {
//         items: cart.items,
//         totalQuantity: 0,
//         changed: false,
//         addItem,
//         removeItem,
//         clearCart,
//         replaceCart
//     };

//     console.log(cartContext);

//     return (
//         <CartContext.Provider value={cartContext}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export default CartContext;