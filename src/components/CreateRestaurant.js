import styles from './CreateRestaurant.module.css'
import React, { useState, useEffect } from 'react'
import api from '../api/config';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

function CreateRestaurant() {

    const navigate = useNavigate();
     let location = useLocation();
    const [type, setType] = useState([]);
    const [pricelvl, setPricelvl] = useState([]);
    const [managerid, setManagerid] = useState([]);
    const [ restCreateProcessState, setRestCreateProcessState] = useState("idle")
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

    // get manager id with manager email
    useEffect(() => {
        const managerIDWithEmail =  async () => {
        try {const res = await api.post('managerid/email',
        {
            manager_email: location.state.email
        }
        );
        console.log("id by email:")
        console.log(res);
        console.log("res data")
        console.log(res.data)
        console.log("res data")
        console.log(res.data[0].manager_id)
        setManagerid(res.data[0].manager_id)
       
        } catch (err) {  console.log(err);
        }}
        managerIDWithEmail();
    }, [])


    const handleCreation = (event) => {
        event.preventDefault();
        setRestCreateProcessState("processing")

        if (
            event.target.name.value.length > 3 && 
            event.target.location.value.length > 4
            ){
        const createRestaurant =  async () => {
            try {const res = await api.post('/createRestaurant', 
                {
                    restaurant_name: event.target.name.value,
                    restaurant_type: type,
                    open_hours: event.target.open.value+" To: "+event.target.close.value,
                    price_level: pricelvl,
                    location: event.target.location.value,
                    restaurant_picture: imageUrl,
                    manager_id: managerid                 
                }
                );
                setRestCreateProcessState("creationSuccessful")
                console.log("Create restaurant response:")
                console.log(res); 
                setImageUrl("")
                setTimeout(() => {
                navigate('/loginpage', {replace: true})
                }, 2000)
            } catch (error) {
                setRestCreateProcessState("creationFailed")
                console.log(error);
            }
            } 
            createRestaurant();
            } else {
                setRestCreateProcessState("creationFailed")
                console.log("Error in some of the fields");
            }

            }; 


    let restCreateUIControls = null;
    switch(restCreateProcessState) {
        case "idle":
            restCreateUIControls =<button type="submit">Create restaurant</button>
            break;
        case "processing": 
            restCreateUIControls = <span style={{color:"blue"}}>Processing...</span>
            break;
        case "creationSuccessful":
            restCreateUIControls = <span style={{color:"green"}}>Restaurant creation successful</span>
            break;
        case "creationFailed":
            restCreateUIControls = <span style={{color:"red"}}>Restaurant creation failed</span>
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
            break;
        }


    return (
        <div className={styles.background}>   
            <h2>Create a restaurant profile</h2>
                <form onSubmit={handleCreation} >
                    <p>*Restaurant name:</p>
                    <input type='text' name='name' placeholder='Name here...'></input>
                    <span> Note: Name must be at least 4 characters.</span>
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
                    <span> From</span>
                    <input name="open"type="time"></input>
                    <span> To</span>
                    <input name="close"type="time"></input>
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
                    <span> Note: Address must be at least 5 characters.</span>
                    <p>*Restaurant picture</p> 
                    <input type="file" onChange={(event) => {
                        uploadImage(event.target.files)
                        }}
                        />
                        <br/>
                <ul>{restCreateUIControls}</ul>
                </form>
            <br/>
        </div>
    )
}

export default CreateRestaurant
