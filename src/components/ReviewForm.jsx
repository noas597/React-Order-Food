import { Form, redirect, json, useNavigate, useNavigation,useActionData } from 'react-router-dom';

import ReactStars from "react-rating-stars-component";
import { useState } from 'react';

// import BasicRating from './UI/BasicRating';

let rating;

export default function ReviewForm({method}){
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const [isRating, setIsRating] = useState();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler(){
        navigate('..');
    }

    function ratingChangedHandler(newRating){
        rating = newRating;
        setIsRating(newRating);
    }

    return (
        <Form method={method} className='form'>
            {data && data.errors && (
                <ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
                </ul>
            )}
            
            <p>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    // defaultValue={event ? event.title : ''}
                />
            </p>
            <div>
                <label htmlFor='rating'>Rating</label>
                <ReactStars
                    count={5}
                    onChange={ratingChangedHandler}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
                {/* <input 
                    id="rating"
                    name='rating'
                    type='number'
                    value={rating}
                    style={{display: 'none'}} 
                /> */}
                {!isRating && <p style={{color:'red'}}>Rating is required</p>}
            </div>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    // defaultValue={event ? event.description : ''}
                />
            </p>

            <div className='actions'>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    console.log("data: ");
    console.log(data);
    // const token = getAuthToken();

    console.log("rating : "+ rating);

    const reviewData = {
        name: data.get('name'),
        // rating: parseFloat(data.get('rating')),
        rating: rating,
        date: new Date().toISOString(),
        description: data.get('description'),
    };

    console.log("reviewData: ");
    console.log(reviewData);

    let url = 'https://react-food-orders-98999-default-rtdb.firebaseio.com/reviews.json';

    const response = await fetch(url, {
        method: method,
        // headers: {
        // 'Content-Type': 'application/json',
        // 'Authorization': 'Beare ' + token
        // },
        body: JSON.stringify(reviewData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save review.' }, { status: 500 });
    }

    return redirect('/reviews');
}