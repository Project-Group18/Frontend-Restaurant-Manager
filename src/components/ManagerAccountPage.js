import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import styles from './ManagerAccountPage.module.css';
import jwtFromWeb from 'jsonwebtoken';
import api from '../api/config_manager';
import Category from './Category.js';
import Dishes from './Dishes.js';
import {Image} from 'cloudinary-react'

export default function ManagerAccountPage(props) {

    const {jwt} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [restaurant, setRestaurant] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);



        //get restaurant with managerid
        useEffect(() => {
            const loadRestaurantWithJWT =  async () => {
            try {const res = await api.get('/getRestaurant/'+decodedToken.user.id.toString(),
            {
                headers: {
                    'Authorization': 'Bearer ' +jwt
                }
            }
            );
            console.log(res);
            setRestaurant(res.data)
            } catch (err) {//Not in 200 response range
                console.log(err);
            }}
            loadRestaurantWithJWT();
        }, [])

        //get categories with restaurant id
        useEffect(() => {
            const loadCategoriesWithJWT =  async () => {
            try {const res = await api.get('/getCategories/'+decodedToken.user.restid.toString(),
            {
                headers: {
                    'Authorization': 'Bearer ' +jwt
                }
            }
            );
            console.log(res);
            setCategories(res.data)
            } catch (err) {//Not in 200 response range
                console.log(err);
            }}
            loadCategoriesWithJWT();
        }, [])

        //get dishes with restaurant id
        useEffect(() => {
            const loadDishesWithJWT =  async () => {
            try {const res = await api.get('/getDishes/'+decodedToken.user.restid.toString(),
            {
                headers: {
                    'Authorization': 'Bearer ' +jwt
                }
            }
            );
            console.log(res);
            setDishes(res.data)
            } catch (err) {//Not in 200 response range
                console.log(err);
            }}
            loadDishesWithJWT();
        }, [])

   
    return (

<div className={styles.background}>

    
      <h1>My account</h1>  
      <div className={styles.accountInfo}>
         
            <div>
                    <div >
                        <h2 className={styles.heading}>Profile</h2>
                        <ul>ID: {decodedToken.user.id} </ul>
                        <ul>Name: {decodedToken.user.name} </ul>
                        <ul>Email: {decodedToken.user.email}</ul>
                        <ul>Restaurant ID: {decodedToken.restid}</ul>
                    </div>
            </div>
  
                   
    
        <div >
        <h2 className={styles.heading}>My restaurant</h2>
        {restaurant.map(restaurantElement=>
            <div className={styles.restaurant}>
            <div  key={restaurantElement.restaurant_id}>
                <ul>ID: {restaurantElement.restaurant_id}</ul>
                <ul>Name: {restaurantElement.restaurant_name}</ul>
                <ul>Type: {restaurantElement.restaurant_type}</ul>
                <ul>Hours: {restaurantElement.open_hours}</ul>
                <ul>Price level: {restaurantElement.price_level}</ul>
                <ul>Location: {restaurantElement.location}</ul>
                <ul>Restaurant picture:</ul>
                <ul>
                </ul>
               </div>
               <div>
                <Image style={{width: '400px'}} cloudName="dczwvybll"
                publicId={restaurantElement.restaurant_picture}/>
               
                </div>
                
                </div>
            )}
        </div>
       
        </div>  
        
            <div className={styles.accountInfo}>
                        <Category categories={categories} jwt={jwt}/>
            </div>


            <div>
                        <Dishes dishes={dishes} categories={categories} jwt={jwt} restaurant={restaurant}/>
            </div>

  
        </div>

    )
}
