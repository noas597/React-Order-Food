// export const fetchCartData = async () => {
//     const fetchData = async () =>{
//         const response = await fetch('https://react-food-orders-98999-default-rtdb.firebaseio.com/cart.json');

//         if(!response.ok){
//             throw new Error('Could not fetch cart data!');
//         }

//         const data = await response.json();

//         return data;
//     };

//     try{
//         const cartData = await fetchData();

//         return {
//             items: cartData.items || [],
//             totalQuantity: cartData.totalQuantity
//         };
//         // dispatch(cartActions.replaceCart({
//         //     items: cartData.items || [],
//         //     totalQuantity: cartData.totalQuantity 
//         // }));
//     } catch(error){
//         throw new Error(error.message || 'Fetching cart data failed!');
//         // dispatch(uiActions.showNotification({
//         //     status: 'error', title: 'Error!', message: 'Fetching cart data failed!' 
//         // }));
//     }
// };

// export const sendCartData = async (cartData) => {
//     // dispatch(uiActions.showNotification({
//     //     status: 'pending', title: 'Sending...', message: 'Sending cart data!' 
//     // }));

//     const sendRequest = async () => {
//         const response = await fetch(
//             'https://react-food-orders-98999-default-rtdb.firebaseio.com/cart.json', {
//             method: 'PUT',
//             body: JSON.stringify({
//                 items: cartData.items, 
//                 totalQuantity: cartData.totalQuantity
//             }), //במידה ויש דברים בסטייס שלא נרצה שישלחו
//         });

//         if(!response.ok){
//             throw new Error('Sending cart data failed.');
//         }
//     };

//     try{
//         await sendRequest();

//         // dispatch(uiActions.showNotification({
//         //     status: 'success', title: 'Success!', message: 'Sending cart data successfully!' 
//         // }));
//     } catch(error){
//         throw new Error(error.message || 'Sending cart data failed!');
//         // dispatch(uiActions.showNotification({
//         //     status: 'error', title: 'Error!', message: 'Sending cart data failed!' 
//         // }));
//     }
// };