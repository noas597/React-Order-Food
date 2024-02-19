import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';

import {userProgressActions} from '../store/userProgress-slice';
import {uiActions} from '../store/ui-slice';
import logoImg from '../assets/logo.jpg';
import searchIcon from '../assets/icons/search-icon.svg';
import Button from './UI/Button.jsx';

export default function Header(){
    const dispatch = useDispatch();
    const cartQuantity = useSelector(state => state.cart.totalQuantity);

    function handleShowCart(){
        dispatch(userProgressActions.showCart());
    }

    function handleSearch(){
        dispatch(uiActions.showSearch());
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logoImg} alt="Meals Logo" />
                <h1>OrderFood</h1>
            </div>
            <nav>
                <ul className='navList'>
                    <li>
                        <NavLink 
                            to='/'
                            end
                            className={({isActive}) => (isActive ? "active" : undefined)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/meals'
                            end
                            className={({isActive}) => (isActive ? "active" : undefined)}
                        >
                            Meals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/reviews'
                            end
                            className={({isActive}) => (isActive ? "active" : undefined)}
                        >
                            Reviews
                        </NavLink>
                    </li>
                    <li>
                        <Button textOnly onClick={handleSearch}>
                            <img className='searchIcon' src={searchIcon} alt="search" />
                        </Button>
                    </li>
                    <li>
                        <Button textOnly onClick={handleShowCart}>
                            Cart ({cartQuantity})    
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}