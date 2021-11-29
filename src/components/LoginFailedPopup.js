import React from 'react'
import styles from './LoginFailedPopup.module.css'

function LoginFailedPopup(props) {
    return (props.trigger) ? (
        <div className={styles.popup}>
            
            <div className={styles.popup_inner}>
                <div className= {styles.popup_text_container}>
                <p>Incorrect username or password</p>
                <button onClick={() => props.setTrigger(false)}>Try again</button>
                </div>
                <button className={styles.closeButton} onClick={() => props.setTrigger(false)}>&times;</button> 
            </div>
               
        </div>
    
    ) : "";
}

export default LoginFailedPopup