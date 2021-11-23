import React from 'react'
import styles from './ObsPopup.module.css'
import { useState } from 'react';
import LoginPopUp from './Login';
import ManagerRegisterPopUp from './ManagerRegister';
function ObsPopup(props) {
    const [buttonLogin, setButtonLogin] = useState(false);
    const [buttonRegister, setButtonRegister] = useState(false);
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <div className= {styles.popup_text_container}>
                <h1>Please log in or register first!</h1>
                <br/>
                <button onClick={() => setButtonLogin(true)} >Log in</button>
                <br/>
                <button onClick={() => setButtonRegister(true)}>Register</button>
                </div>
                <button className= {styles.closeButton} onClick={() => props.setTrigger(false)}>&times;</button>
            </div>
            <LoginPopUp trigger ={buttonLogin} setTrigger ={setButtonLogin}/>
            <ManagerRegisterPopUp trigger={buttonRegister} setTrigger ={setButtonRegister}/>
        </div>
    ) : "";
}

export default ObsPopup
