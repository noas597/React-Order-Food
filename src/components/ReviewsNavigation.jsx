import { NavLink } from 'react-router-dom';

export default function ReviewsNavigation(){
    return (
        <header className='reviews-header'>
            <nav>
                <ul className='navList-reviews'>
                    <li>
                        <NavLink
                            to="/reviews"
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined
                            }
                            end
                        >
                        All Reviews
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink
                            to="/reviews/new"
                            className={({ isActive }) =>
                            isActive ? 'active' : undefined
                            }
                        >
                            New Review
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}