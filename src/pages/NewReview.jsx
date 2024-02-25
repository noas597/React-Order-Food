import Header from "../components/Header";
import ReviewsRootLayout from "./ReviewsRoot";
import ReviewForm from '../components/ReviewForm'

export default function NewReviewPage(){
    return (
        <>
            <Header/>
            <ReviewsRootLayout/>
            <ReviewForm method="post" />
        </>
    );
}