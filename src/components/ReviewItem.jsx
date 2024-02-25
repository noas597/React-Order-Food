import ReactStars from "react-rating-stars-component";

export default function ReviewItem({review}){
    let date;

    if(review.date){
        date = review.date.split('T')[0]
    }

    return (
        <li key={review.id} className="review-item">
            <article>
                <div>
                    <h2>{review.name}</h2>
                    <h3>{date}</h3>
                </div>
                <div>
                    <ReactStars
                        count={5}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        edit={false}
                        value={parseFloat(review.rating)}
                    />
                </div>
                <div>
                    <p className="review-item-description">{review.description}</p>
                </div>
            </article>
        </li>
    );
}