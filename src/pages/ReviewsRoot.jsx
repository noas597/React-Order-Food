import { Outlet } from 'react-router-dom';

import ReviewsNavigation from '../components/ReviewsNavigation';

export default function ReviewsRootLayout(){
    return (
        <>
            <ReviewsNavigation/>
            <Outlet/>
        </>
    );
}