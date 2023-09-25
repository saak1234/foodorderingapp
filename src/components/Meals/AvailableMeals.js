import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
const AvailableMeals=()=>{
      const [data,setdata]=useState([]);
      const [httpError,setHttpError]=useState();
      const [isLoading,setIsLoading]=useState(true);
      useEffect(()=>{
      const fetchMeals=async()=>
      {const response=await fetch('https://react-meals-9a506-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error('Something went wrong!');}
       const responseMeals=await response.json();
       const loadedMeals=[];
      for(const key in responseMeals){
        loadedMeals.push({
          id:key,
          name:responseMeals[key].name,
          desciption:responseMeals[key].description,
          price:responseMeals[key].price,
        })
      }
      setdata(loadedMeals);
      setIsLoading(false);
    }
      fetchMeals().catch(error=> {
        setHttpError(error.message)
        setIsLoading(false)
      })


      
      
     
      },[])
      if(isLoading){
        return<section className={classes.loading}>
          Loading...
        </section>
      }
     if(httpError){
      return<section className={classes.error}> 
      <p>{httpError}</p>
      </section>
     }
      const mealsList=data.map(meal=>
        < MealItem 
        key={meal.id}
        id={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} />)
          
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                {mealsList}
                </ul>
                </Card>
        </section>
    )
}
export default AvailableMeals;