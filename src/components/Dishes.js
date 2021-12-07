import React, {useState} from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';

function Dishes(props) {

    const{jwt, dishes, categories} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [categoryType, setCategoryType] = useState([]);

    const dishHandler = (event) => {
        event.preventDefault();
        console.log(event.target.name.value)
        console.log(event.target.price.value)
        console.log(event.target.dishinfo.value)
        console.log(categoryType)

        const createDish =  async () => {
            try {const res = await api.post('/createDish', 
            {
                dish_name: event.target.name.value,
                price: event.target.price.value,
                category_id: categoryType,
                dish_info: event.target.dishinfo.value,
                restaurant_id: decodedToken.user.restid
            },
            {
                headers: {
                'Authorization': 'Bearer ' +jwt
                }
            } 
            );
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
                    
            } catch (error) {
               console.log(error)
            }
            } 
            createDish();
        }

    return (
        <div>
           <h2>These are your dishes:</h2>
           {dishes.map(dish => 
                    <div key={dish.dish_id}>
                    <ul>ID: {dish.dish_id}</ul>
                    <ul>Name: {dish.dish_name}</ul>
                    <ul>Price: {dish.price}</ul>
                    <ul>Category ID: {dish.category_id}</ul>
                    <ul>Info: {dish.dish_info}</ul>
                    <hr/>
                    </div>
                            )}


            <h3>Create a new dish:</h3>
            <form onSubmit={dishHandler}>
                <ul>Dish name</ul>
                <ul><input style={{width: "190px"}} type="text" name="name" placeholder="Enter name of new dish"></input></ul>
                <ul>Price of new dish</ul>
                <ul><input style={{width: "190px"}} type="text" name="price" placeholder="Enter price of new dish"></input></ul>
                <ul>Information about the dish</ul>
                <ul><input style={{width: "190px"}} type="text" name="dishinfo" placeholder="Enter information of new dish"></input></ul>

            
                    <ul><select name="categorytype" onChange={(e) =>{
                        const selectedState=e.target.value;
                        setCategoryType(selectedState);
                        }}>
                            <option value="--">--</option>
                        {
                            categories.map(element =><option {...element} key={element.cateogry_id} value={element.category_id}> {element.category_name} </option>)
                        }
                    </select></ul>
               

                <ul><button type="submit">Submit</button></ul>
            </form>


        </div>
    )
}

export default Dishes
