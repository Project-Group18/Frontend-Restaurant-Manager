import React, { useState } from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

function CreateRestaurant(props) {

    const navigate = useNavigate();
    const {jwt} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [type, setType] = useState([]);
    const [openHours, setOpenHours] = useState([]);
    const [pricelvl, setPricelvl] = useState([]);


    //we cannot use the jwt for the manager id because this appears right after register page
    // get manager id with manager email
    /* useEffect(() => {
        const loadManagersWithJWT =  async () => {
        try {const res = await api.post('/managers',
        {
            
           
        }
        );
        console.log(res);
        seManager(res.data)
        } catch (err) {//Not in 200 response range
            console.log(err);
        }}
        loadManagersWithJWT();
    }, []) */


    const handleCreation = (event) => {
        event.preventDefault();

        const createRestaurant =  async () => {
            try {const res = await api.post('/createRestaurant', 
                {
                    restaurant_name: event.target.name.value,
                    restaurant_type: type,
                    open_hours: openHours,
                    price_level: pricelvl,
                    location: event.target.location.value,
                    /* restaurant_picture: event.target.name.value, */
                    manager_id: decodedToken.user.id                 
                },
                {
                    headers: {
                    'Authorization': 'Bearer ' +jwt
                    }
                } 
                );
                console.log("Create restaurant response:")
                console.log(res); 
                setTimeout(() => {
                navigate('/', {replace: true})
                }, 1500)
            } catch (error) {
                console.log(error);
            }
            } 
            createRestaurant();
            }; 


    return (
        <div>   
            <h2>Create a restaurant profile</h2>
            <form onSubmit={handleCreation} >
                <p>*Restaurant name:</p>
                    <input type='text' name='name' placeHolder='Name here...'></input>
                    <br/>
                <p>*Restaurant type:</p>
                <select name="restaurantType" onChange={(e) =>{
                    const selectedState=e.target.value;
                    setType(selectedState);
                    }}>
                    <option value="Buffet"> Buffet </option>
                    <option value="Fast food"> Fast food</option>
                    <option value="Fast casual"> Fast casual</option>
                    <option value="Casual dining"> Casual dining</option>
                    <option value="Fine dining"> Fine dining</option>
                </select>
                 <p>*Restaurant open hours</p>
                <select name="openHours" onChange={(e) =>{
                    const selectedState=e.target.value;
                    setOpenHours(selectedState);
                    }}>
                    <option value="7.00-20.00"> 7.00-20.00 </option>
                    <option value="8.00-20.00"> 8.00-20.00 </option>
                    <option value="9.00-20.00"> 9.00-20.00</option>
                    <option value="10.00-20.00"> 10.00-20.00 </option>
                    <option value="11.00-20.00"> 11.00-20.00</option>
                    <option value="12.00-20.00"> 12.00-20.00</option>
                </select>

                <p>*Restaurant price level</p>
                <select name="openHours" onChange={(e) =>{
                    const selectedState=e.target.value;
                    setPricelvl(selectedState);
                    }}>
                    <option value="€"> Cheap (€) </option>
                    <option value="€€"> Moderately cheap (€€) </option>
                    <option value="€€€"> Moderately expensive (€€€)</option>
                    <option value="€€€€"> Expensive (€€€€) </option>
                </select>
                <p>*Restaurant address</p>
                    <input type='text' name='location'></input>
                {/*  <p>Restaurant picture</p>
                <input type='text' name='img'></input> */}
                    <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateRestaurant
