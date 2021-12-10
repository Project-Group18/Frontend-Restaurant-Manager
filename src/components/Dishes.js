import styles from './Dishes.module.css';
import React, {useState} from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';
import axios from 'axios';
import {Image} from 'cloudinary-react'

function Dishes(props) {

    const{jwt, dishes, categories, restaurant} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [categoryType, setCategoryType] = useState([]);

    const [imageSelected, setImageSelected] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [ dishAddProcessState, setDishAddProcessState] = useState("idle")

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

    const dishHandler = (event) => {
        event.preventDefault();
        setDishAddProcessState("processing")

        console.log(event.target.name.value)
        console.log(event.target.price.value)
        console.log(event.target.dishinfo.value)
        console.log(categoryType)

        if(
            event.target.name.value.length >= 3 &&
            event.target.price.value.length > 0 &&
            !event.target.price.value.includes(",") &&
            event.target.price.value.match(/^[0-9]+$/) != null &&
            event.target.name.value.length <= 30 &&
            categoryType != "--"
        ) 
        {

        const createDish =  async () => {
            try {const res = await api.post('/createDish', 
            {
                dish_name: event.target.name.value,
                price: event.target.price.value,
                category_id: categoryType,
                dish_picture: imageUrl,
                dish_info: event.target.dishinfo.value,
                restaurant_id: decodedToken.user.restid
            },
            {
                headers: {
                'Authorization': 'Bearer ' +jwt
                }
            } 
            );
            setDishAddProcessState("dishAddSuccessful")
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
            setImageSelected("")
            setImageUrl("");
                    
            } catch (error) {
                console.log(error)
                setDishAddProcessState("dishAddFailed")
            }
            } 
            createDish();
        } else {
            setDishAddProcessState("dishAddFailed")
        }
        }

        let dishAddUIControls = null;
        switch(dishAddProcessState) {
            case "idle":
                dishAddUIControls =<button type="submit">Create dish</button>
                break;
            case "processing": 
                dishAddUIControls = <span style={{color:"blue"}}>Processing...</span>
                break;
            case "dishAddSuccessful":
                dishAddUIControls = <span style={{color:"green"}}>Dish creation successful</span>
                break;
            case "dishAddFailed":
                dishAddUIControls = <span style={{color:"red"}}>Dish creation failed</span>
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
                break;
            }

    return (
        <div>
            <div className={styles.accountInfo}>
            <div>
            <h2 className={styles.heading}>Create a new dish</h2>
            <form onSubmit={dishHandler}>
                <ul><h4>Dish name</h4></ul>
                <ul><input style={{width: "190px"}} type="text" name="name" placeholder="Enter name of new dish"></input></ul>
                <ul><span> Note: Dish name must be at least 3 characters</span></ul>
                <ul><h4>Price of new dish €</h4></ul>
                <ul><input style={{width: "190px"}} type="text" name="price" placeholder="Enter price of new dish 00.00"></input></ul>
                <ul><span> Note: Price must only include numbers and can't include ","</span></ul>
                <ul><h4>Information about the dish</h4></ul>
                <ul><input style={{width: "190px"}} type="text" name="dishinfo" placeholder="Enter information of new dish"></input></ul>
                <ul><span> Note: Maximum length 30 characters</span></ul>
                <ul><h4>Category type</h4></ul>
                    <ul><select name="categorytype" onChange={(e) =>{
                        const selectedState=e.target.value;
                        setCategoryType(selectedState);
                        }}>
                            <option value="--">--</option>
                        {
                            categories.map(element =><option {...element} key={element.cateogry_id} value={element.category_id}> {element.category_name} </option>)
                        }
                    </select></ul>
               

                <h4 className={styles.heading}>Add a picture of the dish:</h4>


                <input className={styles.heading} type="file" onChange={(event) => {
                uploadImage(event.target.files)
                }}
                />
                <ui>{dishAddUIControls}</ui>
                
            </form>
            </div>
            <div>
            <h2 className={styles.heading}>These are your dishes:</h2>
            <div className={styles.scrolldiv}>
           {dishes.map(d => 
                    <div key={d.dish_id}>
                    <ul>ID: {d.dish_id}</ul>
                    <ul>Name: {d.dish_name}</ul>
                    <ul><Image style={{width: '300px'}} cloudName="dczwvybll"
                    publicId={d.dish_picture}/></ul>
                    <ul>Price: {d.price}€</ul>
                    <ul>Category ID: {d.category_id}</ul>
                    <ul>Info: {d.dish_info}</ul>
                    <hr/>
                    </div>
                            )} 
            </div>
            </div>
            </div>
        </div>
    )
}

export default Dishes
