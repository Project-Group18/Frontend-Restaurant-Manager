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
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
            setImageSelected("")
            setImageUrl("");
                    
            } catch (error) {
               console.log(error)
            }
            } 
            createDish();
        }

    return (
        <div>
            <div className={styles.accountInfo}>
            <div>
            <h2 className={styles.heading}>Create a new dish</h2>
            <form onSubmit={dishHandler}>
                <ul>Dish name</ul>
                <ul><input style={{width: "190px"}} type="text" name="name" placeholder="Enter name of new dish"></input></ul>
                <ul>Price of new dish €</ul>
                <ul><input style={{width: "190px"}} type="text" name="price" placeholder="Enter price of new dish 00.00"></input></ul>
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
               

                <h4 className={styles.heading}>Add a picture of the dish:</h4>


                <input className={styles.heading} type="file" onChange={(event) => {
                uploadImage(event.target.files)
                }}
                />
               



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
