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



                  </div>
            
        </div>
      
        </div>
    )
}
