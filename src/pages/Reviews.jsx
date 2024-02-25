import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import Header from "../components/Header";
import Reviews from "../components/Reviews";
import ReviewsRootLayout from "./ReviewsRoot";

function ReviewsPage(){
    const { reviews } = useLoaderData();

    return (
        <>
            <Header/>
            <ReviewsRootLayout/>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={reviews}>
                    {(loadedReviews) => <Reviews reviews={loadedReviews} />}
                </Await>
            </Suspense>
        </>

        // <>
        //     <Header/>
        //     <ReviewsRootLayout/>
        //     <Reviews/>
        // </>
    );
}

export default ReviewsPage;

export async function loadReviews(){
    const response = await fetch('https://react-food-orders-98999-default-rtdb.firebaseio.com/reviews.json');

    if (!response.ok) {
        throw json({message: "Could not fetch reviews"}, {status: 500});
    } else {
        const resData = await response.json();

        let loadedReviews = [];

        for(let item in resData) {
            resData[item].id = item;
            loadedReviews.push(resData[item]);
        }

        Array.prototype.reverse.call(loadedReviews)

        return loadedReviews;
    }
}

export function loader() {
    return defer({
      reviews: loadReviews(),
    });
  }
  

// export async function loader(){
//     const response = await fetch('https://react-food-orders-98999-default-rtdb.firebaseio.com/reviews.json');

//     if (!response.ok) {
//         throw json({message: "Could not fetch reviews"}, {status: 500});
//     } else {
//         const resData = await response.json();

//         let loadedReviews = [];

//         for(let item in resData) {
//             loadedReviews.push(resData[item]);
//         }

//         return {reviews: loadedReviews};
//     }
// }