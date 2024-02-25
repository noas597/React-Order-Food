// import {useEffect} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Cart from "./components/Cart.jsx";
// import Checkout from "./components/Checkout.jsx";
// import Header from "./components/Header.jsx";
// import Meals from "./components/Meals.jsx";
// import Notification from './components/UI/Notification.jsx';
// import {fetchCartData, sendCartData} from './store/cart-actions';
import MealsPage, {loader as MealsLoader } from './pages/Meals.jsx';
import ReviewsPage, {loader as ReviewsLoader} from './pages/Reviews.jsx';
import RootLayout from './pages/Root.jsx';
import ErrorPage from './pages/Error.jsx';
import HomePage from './pages/home.jsx';
import ReviewsRootLayout from './pages/ReviewsRoot.jsx';
import NewReviewPage from './pages/NewReview.jsx';
import {action as reviewAction} from './components/ReviewForm.jsx';

// let isInitial = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        id: 'meals',
        path: 'meals',
        element: <MealsPage/>,
        loader: MealsLoader
      },
      {
        path: 'reviews',
        // element: <ReviewsRootLayout/>,
        children: [
          {
            index: true,
            element: <ReviewsPage />,
            loader: ReviewsLoader,
          },
          {
            path: 'new',
            element: <NewReviewPage/>,
            action: reviewAction,
            // loader:checkAuthLoader
          },
        ]
      },
    ]
  }
]);

function App() {
  // const dispatch = useDispatch();
  // const userProgress = useSelector(state => state.userProgress.progress);
  // const cart = useSelector(state => state.cart);
  // const notification = useSelector(state => state.ui.notification);

  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, [dispatch]);

  // useEffect(() => {
  //   if(isInitial){
  //     isInitial = false;
  //     return;
  //   }

  //   if(cart.changed){
  //     dispatch(sendCartData(cart));
  //   }
  // }, [cart, dispatch]);

  // return (
  //   <>
  //     {notification && (
  //       <Notification 
  //         status={notification.status} 
  //         title={notification.title} 
  //         message={notification.message} 
  //       />
  //     )}

  //     <Header />
  //     <Meals />
  //     {userProgress === "cart" && <Cart />}
  //     {userProgress === "checkout" && <Checkout />}
      
  //   </>
  // );
  return <RouterProvider router={router} />
}

export default App;
