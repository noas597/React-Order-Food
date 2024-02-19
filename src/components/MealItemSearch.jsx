import {useDispatch} from 'react-redux';

import { cartActions } from '../store/cart-slice';
import {currencyForamatter} from '../util/formatting.js';
import Button from './UI/Button.jsx';

export default function MealItemSearch({meal}){
    const dispatch = useDispatch();

    function hadleAddMealToCart(){
        dispatch(
            cartActions.addItemToCart({
                id: meal.id,
                name: meal.name,
                price: meal.price,
                image: meal.image
            })
        );
    }

    return(
        <li key={meal.id}>
            <div className='serach-meal-item'>
                <img 
                    src={'../../public/' + meal.image} 
                    alt={meal.name} 
                    style={{height: "70px", width: "70px"}}
                />
                <div style={{width: "50%"}}>
                    <h3>{meal.name}</h3>
                    <p>
                        {currencyForamatter.format(meal.price)}
                    </p>
                </div>
                <p className="meal-item-action">
                    <Button onClick={hadleAddMealToCart}>
                        Add To Cart
                    </Button>
                </p>
            </div>
        </li>
    );
}