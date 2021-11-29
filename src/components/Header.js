import React from 'react'
import styles from './Header.module.css'
import { useState } from 'react';
import LoginPopUp from './Login';
import ManagerRegisterPopUp from './ManagerRegister.js';

export default function Header() {

    const [buttonLogin, setButtonLogin] = useState(false);
    const [buttonRegister, setButtonRegister] = useState(false);
    return (
        <div>
              <div class={styles.Headercontainer}>
        <a href="/"><img className={styles.image} src='olivertwistLogo1.jpg' alt=''/></a>

                  <div className={styles.Account}>
                  <button onClick={() => setButtonLogin(true)}>Log in</button>
                  
                  <button onClick={() => setButtonRegister(true)}>Sign up</button>
                  </div>
            
        </div>
      
            <LoginPopUp trigger ={buttonLogin} setTrigger ={setButtonLogin}/>
            <ManagerRegisterPopUp trigger={buttonRegister} setTrigger ={setButtonRegister}/>
        </div>
    )
}
