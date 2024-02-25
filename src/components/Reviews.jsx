import ReviewItem from './ReviewItem';

export default function Reviews({reviews}){
    if(reviews === undefined || reviews.length === 0){
        return <center><p>No reviews....</p></center>;
    }
    
    return(
        <>
            <ul id="reviews">
                {reviews.map((review)=> {
                    return (
                        <ReviewItem key={review.id} review={review} />
                    );
                })}
            </ul>
        </>
    );
}