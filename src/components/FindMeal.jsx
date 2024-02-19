import { useRef, useState } from "react";
import {useRouteLoaderData} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

// import useHttp from "../hooks/useHttp.js";
// import Input from "./UI/Input.jsx";
// import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";
import {uiActions} from '../store/ui-slice';
import LoadingIndicator from './UI/LoadingIndicator.jsx';
// import MealItem from './MealItem.jsx';
import MealItemSearch from "./MealItemSearch.jsx";
import closeIcon from '../assets/icons/icon-close.svg';
import Button from './UI/Button.jsx';

export default function FindMeal(){
    const mealsData = useRouteLoaderData("meals").meals; 

    const dispatch = useDispatch();
    const showSearch = useSelector(state => state.ui.searchIsVisible);

    const searchElement = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [searchedMeals, setSearchedMeals] = useState([]);

    function handleClose(){
        dispatch(uiActions.hideSearch());
    }

    function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);

        let data = [];
        if(searchElement.current.value !== ""){
            data = mealsData.filter((meal) => {
                return meal.name.toLowerCase().startsWith(searchElement.current.value.toLowerCase())
            });
        }

        setIsLoading(false);
        setSearchedMeals(data);
    }

    return (
        <Modal
            open={showSearch}
            onClose={handleClose}
        >
            <>
                <div>
                    <h2 style={{display: "inline"}}>Search Meal</h2>
                    <button className="closeIconButton" onClick={handleClose}>
                        <img className='closeIcon' src={closeIcon} alt="search" />
                    </button>
                </div>
                
                <section className="content-section">
                    {/* <form 
                        onSubmit={handleSubmit} 
                        id="search-form"
                    > */}
                        <p>Please enter a search term and to find meal.</p>
                        <div className="control-row" style={{"gap": "0.3rem"}}>
                            <p className="control">
                                <input 
                                    placeholder="Search meal"
                                    type="search" 
                                    id="searchMeal"
                                    ref={searchElement}
                                    onChange={handleSubmit}
                                />
                            </p>
                            {/* <p className="modal-actions">
                                <Button>Search</Button>
                            </p> */}
                        </div>
                    {/* </form> */}
                    {isLoading && (
                        <>
                            <center>
                                <LoadingIndicator/>
                            </center>
                            <h3 className="center">Searching meals...</h3>
                        </>
                    )}

                    <div>
                        {searchedMeals.length > 0 && (
                           <ul className="search-meals-item">
                                {searchedMeals.map((meal) => {
                                    return (
                                        <MealItemSearch key={meal.id} meal={meal} />
                                    );
                                })}  
                            </ul> 
                        )}
                        
                        {searchElement.current !== undefined && searchedMeals.length === 0 ? (
                            <p>No meals found...</p>
                        ) : searchElement.current !== "" && searchedMeals.length === 0 ? null : null}
                    </div>
                </section>
            </>
        </Modal>
    );
}