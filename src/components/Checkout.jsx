import {useDispatch, useSelector} from 'react-redux';
import Modal from "./UI/Modal";
import { currencyForamatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import { cartActions } from '../store/cart-slice.js';
import {userProgressActions} from '../store/userProgress-slice';
import {sendCartData} from '../store/cart-actions.js';
import ErrorBlock from './UI/ErrorBlock';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout(){
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const userProgress = useSelector(state => state.userProgress.progress);

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('https://react-food-orders-98999-default-rtdb.firebaseio.com/orders.json', requestConfig);

    const cartTotal = cartItems.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price, 0);

    function handleClose(){
        dispatch(userProgressActions.hideCheckout());
    }

    function handleFinish(){
        dispatch(userProgressActions.hideCheckout());
        dispatch(cartActions.replaceCart({
            items: [],
            totalQuantity: 0 
        }));
        dispatch(sendCartData({items: [], totalQuantity: 0}))
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault(); 

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // {email: test@gmaul.com ...}

        sendRequest(JSON.stringify({
            id: new Date().getTime(),
            items: cartItems,
            customer: customerData,
            status: 'Finished'
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if(isSending){
        actions = <span>Sending order data...</span>
    }

    if(error){
        return (
            <Modal
                open={userProgress === 'checkout'}
                onClose={handleFinish}
            >
                <h2>Error!</h2>
                <ErrorBlock 
                    title="Failed to submit order."
                    message={error.message ? error.message : 'Failed to submitted your order. Please try again later.'}
                />
                <p className="modal-actions">
                    <Button onClick={handleClose}>Okay</Button>
                </p>
            </Modal>
        );
    }

    if(data && !error){
        return (
            <Modal
                open={userProgress === 'checkout'}
                onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal 
            open={userProgress === 'checkout'}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyForamatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {/* {error && <Error title="Failed to submit order" message={error} />} //משום מה עושה שגיאה */}
                {error && (
                    <ErrorBlock 
                        title="Failed to submit order."
                        message={error.message ? error.message : 'Failed to submitted your order. Please try again later.'}
                    />
                    // <div className="error">
                    //     <h2>Failed to submit order</h2>
                    //     <p>{error}</p>
                    // </div>
                )}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}