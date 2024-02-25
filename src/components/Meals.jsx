import {useRouteLoaderData} from 'react-router-dom';

// import useHttp from "../hooks/useHttp.js";
// import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";
// import LoadingIndicator from "./UI/LoadingIndicator.jsx";

// const requestConfig = {}; //כדי למנוע לולאה אין סופית

export default function Meals(){
    const data = useRouteLoaderData("meals"); 
    let loadedMeals;

    if(data){
        loadedMeals = data.meals;
    }

    // const {data: loadedMeals, isLoading, error} = useHttp('https://react-food-orders-98999-default-rtdb.firebaseio.com/products.json', requestConfig, []);

    // if(isLoading){
    //     return (
    //         <>
    //             <center><LoadingIndicator/></center>
    //             <h3 className="center">Fetching meals...</h3>
    //         </>
    //     );
    // }

    // if(error){
    //     return <Error title="Failed to fetch meals" message={error} />;
    // }

    return(
        <>
            <ul id="meals">
                {loadedMeals.map((meal)=> {
                    return (
                        <MealItem key={meal.id} meal={meal} />
                    );
                })}
            </ul>
        </>
    );
}