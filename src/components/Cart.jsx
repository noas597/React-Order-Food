import {useSelector, useDispatch} from 'react-redux';

import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button";
import { currencyForamatter } from "../util/formatting";
import {userProgressActions} from '../store/userProgress-slice';
import CartItem from "./CartItem.jsx";
import { cartActions } from '../store/cart-slice.js';

export default function Cart(){
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const progress = useSelector(state => state.userProgress.progress)
    
    const cartTotal = cartItems.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price, 0);

    function handleCloseCart(){
        dispatch(userProgressActions.hideCart());
    }

    function handleGoToCheckout(){
        dispatch(userProgressActions.showCheckout());
    }

    function handleIncrease(item){
        dispatch(cartActions.addItemToCart({
            id: item.itemId,
            name: item.name,
            price: item.price,
            image: item.image
        }));
    }

    function handleDecrease(item){
        dispatch(cartActions.removeItemFromCart(item.itemId))
    }

    return (
        <Modal 
            className="cart" 
            open={progress === 'cart'}
            onClose={progress === 'cart' ? handleCloseCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item)=>(
                    <CartItem 
                        key={item.id}
                        name={item.name} 
                        quantity={item.quantity} 
                        price={item.price} 
                        image={item.image}
                        onIncrease={()=>handleIncrease(item)}
                        onDecrease={()=>handleDecrease(item)}
                    />

                    
                ))}
            </ul>
            <p className="cart-total">
                {currencyForamatter.format(cartTotal)}
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartItems.length > 0 && 
                    <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
                }
            </p>
        </Modal>
    );
}