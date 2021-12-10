import styles from './Category.module.css';
import React, { useState } from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';

function Category(props) {

    const  {jwt, categories} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [ categoryAddProcessState, setCategoryAddProcessState] = useState("idle")
    const categoryNames = [];
    const categroyNamesLowerCase = [];

    categories.forEach(category1 => 
        categoryNames.push(
            category1.category_name
            )
        )  

    categories.forEach(category2 => 
        categroyNamesLowerCase.push(
            category2.category_name.toLowerCase()
            )
        ) 

    const categoryHandler = (event) => {
        event.preventDefault();
        setCategoryAddProcessState("processing")

        

        if(
            event.target.category.value.length >= 4 &&
            !categoryNames.includes(event.target.category.value) &&
            !categroyNamesLowerCase.includes(event.target.category.value)
        ) {
    
        const createCategory =  async () => {
            try {const res = await api.post('/createCategory', 
            {
                category_name: event.target.category.value,
                restaurant_id: decodedToken.user.restid.toString()
            },
            {
                headers: {
                'Authorization': 'Bearer ' +jwt
                }
            } 
            );
            setCategoryAddProcessState("categoryAddSuccessful")
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
            } catch (error) {
                setCategoryAddProcessState("categoryAddFailed")
                console.log(error)
            }
            } 
            createCategory();
        } else {
            setCategoryAddProcessState("categoryAddFailed")
        }
        }

        let categoryAddUIControls = null;
        switch(categoryAddProcessState) {
            case "idle":
                categoryAddUIControls =<button type="submit">Create category</button>
                break;
            case "processing": 
                categoryAddUIControls = <span style={{color:"blue"}}>Processing...</span>
                break;
            case "categoryAddSuccessful":
                categoryAddUIControls = <span style={{color:"green"}}>Category creation successful</span>
                break;
            case "categoryAddFailed":
                categoryAddUIControls = <span style={{color:"red"}}>Category creation failed</span>
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
                break;
            }

    return (
        <div>
            <h2 className={styles.heading}>Menu categories</h2>

            {categories.map(category => 
                <div key={category.category_id}>
                    <ul>{category.category_id}.{category.category_name}</ul>
                </div>
            )}

            <h3 className={styles.heading}>Create a new category</h3>
            <form onSubmit={categoryHandler}>
                <ul><input style={{width: "190px"}} type="text" name="category" placeholder="Enter name of new category"></input>
                <span> Note: Category name must be at least 4 characters.</span></ul>
                <ul>{categoryAddUIControls}</ul>
            </form>
        </div>
    )
}

export default Category
