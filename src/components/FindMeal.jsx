import { useRef, useState } from "react";
import {useRouteLoaderData} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

// import useHttp from "../hooks/useHttp.js";
// import Input from "./UI/Input.jsx";
// import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";
import {uiActions} from '../store/ui-slice';
import LoadingIndicator from './UI/LoadingIndicator.jsx';
import MealItem from './MealItem.jsx';

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
                <h2>Search Meal</h2>
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

                    <ul>
                        {searchedMeals.map((meal) => {
                             return (
                                <MealItem key={meal.id} meal={meal} />
                            );
                        })}  
                    </ul>
                </section>
            </>
        </Modal>
    );
}