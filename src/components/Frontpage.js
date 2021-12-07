import React from 'react'
import styles from './Frontpage.module.css';

function Frontpage(props) {
  return (
    <div className="App">
      <header className={styles.background}>

      <div>
      <h5>User logged in status: {props.userLoggedIn ? "logged in" : "logged out"} </h5>
            
        </div>

        <div className={styles.onSale}>
          {props.userLoggedIn ? 
            <>
              {/* If user is logged in, render these buttons */}
              <h1>Choose your next action from the top bars</h1>
              <a><img src='restaurant-manager-picture.jpg' alt=''/></a>
            </>
            :
            <>
              {/* If user is not logged in, render these buttons */}
              <h3>Join our service to make people find your restaurant</h3>
              <a><img src='restaurant-manager-picture.jpg' alt=''/></a>
            </>
          }
        </div>
      
      </header>
      </div>
  );
  }


export default Frontpage;
