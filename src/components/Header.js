import React from 'react'
import styles from './Header.module.css'
import {Image} from 'cloudinary-react'

export default function Header(props) {

    return (
        <div>
              <div class={styles.Headercontainer}>
        <Image href='/' className={styles.image} cloudName="dczwvybll" publicId="https://res.cloudinary.com/dczwvybll/image/upload/v1639051046/uploadPreset2021/olivertwistLogo1_d645nb.jpg"/>
                  <div className={styles.Account}>


                  {props.userLoggedIn ? 
                            <>
                                {/* If user is logged in, render these buttons */}
                                <button className={styles.buttonContainer}><a href='/' className={styles.buttonFont}> Frontpage </a></button>
                                <button className={styles.buttonContainer}><a href='/currentOrdersPage' className={styles.buttonFont}> Orders </a></button>
                                <button className={styles.buttonContainer}> <a href='/managerAccountPage' className={styles.buttonFont}> My account</a></button>
                                <button onClick={props.logout} className={styles.buttonContainer}><a href='/' className={styles.buttonFont}> Log out</a></button>
                            </>
                            :
                            <>
                                {/* If user is not logged in, render these buttons */}
                                <button className={styles.buttonContainer}><a href='/' className={styles.buttonFont}> Frontpage </a></button>
                                <button className={styles.buttonContainer}> <a href='/loginpage' className={styles.buttonFont}> Log in</a></button>
                                <button className={styles.buttonContainer}> <a href='/registerpage' className={styles.buttonFont}> Sign up</a></button>
                            </>
                            }



                  </div>
            
        </div>
      
        </div>
    )
}
