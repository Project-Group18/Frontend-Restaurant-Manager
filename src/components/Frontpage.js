import React from 'react'
import styles from './Frontpage.module.css';

function Frontpage(props) {
  return (
    <div className="App">
      <header>

      <div>
            
        </div>

        <div className={styles.onSale}>
          {props.userLoggedIn ? 
            <>
              {/* If user is logged in, render these buttons */}
              <h1 className={styles.background}>Choose your next action from the top bars</h1>
              <a><img className={styles.image} src='restaurant-manager-picture.jpg' alt=''/></a>
            </>
            :
            <>
              {/* If user is not logged in, render these buttons */}
              <h2>Join our service to make people find your restaurant</h2>
              <a><img className={styles.image} src='restaurant-manager-picture.jpg' alt=''/></a>
            </>
          }
        </div>
      </header>
      </div>
  );
  }


export default Frontpage;
