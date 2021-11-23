import React from 'react'
import styles from './Register.module.css';
import {useState} from 'react';
import CreateRestaurantPopUp from './CreateRestaurantPopUp'

function ManagerRegisterPopUp(props) {

    const [createRestaurantPopup, setCreateRestaurantPopup] = useState(false);

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <div className= {styles.popup_text_container}>
                    <h1>Sign up now and register your own restaurant</h1>
                    <p>*Username:</p>
                    <input type="text" placeholder="username*"></input>
                    <p>*Password:</p>
                    <input type="text" placeholder="password*"></input>
                    <p>*Input password again:</p>
                    <input type="text" placeholder="password*"></input>
                    <p>*Email</p>
                    <input type="text" placeholder="Email*"></input>

                    <br></br>
                    
                    
                    <button className={styles.registerButton} onClick={() => setCreateRestaurantPopup(true)}>Register now!</button>
                </div>
                <button className={styles.closeButton} onClick={() => props.setTrigger(false)}>&times;</button>
            </div>

            <CreateRestaurantPopUp trigger={createRestaurantPopup} setTrigger ={setCreateRestaurantPopup}/>
        </div>
        
    ) : "";
}

export default ManagerRegisterPopUp