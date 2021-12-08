import React from 'react'
import styles from './Header.module.css'
import { useState } from 'react';


export default function Header(props) {

    const [buttonLogin, setButtonLogin] = useState(false);
    const [buttonRegister, setButtonRegister] = useState(false);
    return (
        <div>
              <div class={styles.Headercontainer}>
        <a href="/"><img className={styles.image} src='olivertwistLogo1.jpg' alt=''/></a>

                  <div className={styles.Account}>


                  {props.userLoggedIn ? 
                            <>
                                {/* If user is logged in, render these buttons */}
                                <button><a href='/currentOrdersPage' > Orders </a></button>
                                <button > <a href='/managerAccountPage' > My account</a></button>
                                <button onClick={props.logout} ><a href='/'> Log out</a></button>
                                

                            </>
                            :
                            <>
                                {/* If user is not logged in, render these buttons */}
                                <button > <a href='/loginpage' > Log in</a></button>
                                <button > <a href='/registerpage' > Sign up</a></button>
                            </>
                            }


{/*    We will see later if we have time to implement these (popups I mean)    */}         

{/*  <button onClick={() => setButtonLogin(true)}>Log in</button>
<button onClick={() => setButtonRegister(true)}>Sign up</button> */}
                  </div>
            
        </div>
      
        </div>
    )
}
