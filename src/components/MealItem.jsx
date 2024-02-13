import {useDispatch} from 'react-redux';
import { cartActions } from '../store/cart-slice';

import {currencyForamatter} from '../util/formatting.js';
import Button from './UI/Button.jsx';

export default function MealItem({meal}){
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

    return (
        <li className="meal-item">
            <article>
                <img src={'../../public/' + meal.image} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {currencyForamatter.format(meal.price)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-action">
                    <Button onClick={hadleAddMealToCart}>
                        Add To Cart
                    </Button>
                </p>
            </article>
        </li>
    );
}