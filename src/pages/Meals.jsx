import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Cart from "../components/Cart.jsx";
import Checkout from "../components/Checkout.jsx";
import Header from "../components/Header.jsx";
import Meals from "../components/Meals.jsx";
import Notification from '../components/UI/Notification.jsx';
import {fetchCartData, sendCartData} from '../store/cart-actions.js';
import FindMeal from '../components/FindMeal.jsx';

let isInitial = true;

function MealsPage(){
  const dispatch = useDispatch();
  const userProgress = useSelector(state => state.userProgress.progress);
  const showSearch = useSelector(state => state.ui.searchIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }

    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message} 
        />
      )}

      <Header />
      {showSearch && <FindMeal/>}
      <Meals />
      {userProgress === "cart" && <Cart />}
      {userProgress === "checkout" && <Checkout />}
    </>
  );
}

export default MealsPage;

export async function loader(){
  const response = await fetch('https://react-food-orders-98999-default-rtdb.firebaseio.com/products.json');

    if (!response.ok) {
        throw json({message: "Could not fetch events"}, {status: 500});
    } else {
        const resData = await response.json();

        let loadedMeals = [];

        for(let item in resData) {
          loadedMeals.push(resData[item]);
        }

        return {meals: loadedMeals};
    }
}