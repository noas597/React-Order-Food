import { currencyForamatter } from "../util/formatting";

export default function CartItem({key, name, quantity, price, image, onIncrease, onDecrease}){
    return (
        <li key={key} className="cart-item">
            <img src={'../../public/' + image} slt={name} /> 
            <p style={{ "position": "absolute", "marginLeft": "60px"}}>
                {name} - {quantity} X {currencyForamatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}