import React from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';

function Category(props) {


    const  {jwt, categories} = props;
    const decodedToken = jwtFromWeb.decode(jwt);

    const categoryHandler = (event) => {
        event.preventDefault();
    
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
            
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
                    
            } catch (error) {
               console.log(error)
            }
            
            } 
            createCategory();
        }



    return (
        <div>
            <h2>These are your categories:</h2>



            {categories.map(category => 
                    <div key={category.category_id}>
                    <ul>{category.category_id}.{category.category_name}</ul>
                    </div>
                            )}

        <h3>Create a new category:</h3>
            <form onSubmit={categoryHandler}>
                <ul><input style={{width: "190px"}} type="text" name="category" placeholder="Enter name of new category"></input></ul>
                <ul><button type="submit">Submit</button></ul>
            </form>
        </div>
    )
}

export default Category
