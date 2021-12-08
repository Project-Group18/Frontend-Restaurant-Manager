import React, { useState, useEffect } from 'react'
import api from '../api/config';
import jwtFromWeb from 'jsonwebtoken';
import { useNavigate, useLocation } from 'react-router-dom';
import {Image} from 'cloudinary-react'
import axios from 'axios'

function CreateRestaurant(props) {

    const navigate = useNavigate();
    const {jwt} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [type, setType] = useState([]);
    const [openHours, setOpenHours] = useState([]);
    const [pricelvl, setPricelvl] = useState([]);
    const [managerid, setManagerid] = useState([]);
    let location = useLocation();

    const [imageSelected, setImageSelected] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "uploadPreset2021")
        axios.post("https://api.cloudinary.com/v1_1/dczwvybll/image/upload", formData)
        .then((response) =>{
        console.log(response);
        console.log("res.data.url")
        setImageUrl(response.data.url)
        });
    };




    //we cannot use the jwt for the manager id because this appears right after register page
    // get manager id with manager email
    useEffect(() => {
        const managerIDWithEmail =  async () => {
        try {const res = await api.post('managerid/email',
        {
            manager_email: location.state.id
        }
        );
        console.log("id by email:")
        console.log(res);
        console.log("res data")
        console.log(res.data)
        console.log("res data")
        console.log(res.data[0].manager_id)
        setManagerid(res.data[0].manager_id)
       
        } catch (err) {//Not in 200 response range
            console.log(err);
        }}
        managerIDWithEmail();
    }, [])


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
                    restaurant_picture: imageUrl,
                    manager_id: managerid                 
                }
                );
                console.log("Create restaurant response:")
                console.log(res); 
                setImageUrl("")
                setImageSelected("")
                setTimeout(() => {
                navigate('/loginpage', {replace: true})
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
                <p>*Restaurant picture</p> 
                <input type="file" onChange={(event) => {
                uploadImage(event.target.files)
                }}
                />
            <br/>
                <div >
                    {imageSelected === "" ? 
                    <>
                    <ul><button type="submit">Submit</button></ul>
                    </>
                    :
                    <>
                    <h4>Wait for the image to upload</h4>
                    </>
                    }
                </div>


                
            </form>
        </div>
    )
}

export default CreateRestaurant
