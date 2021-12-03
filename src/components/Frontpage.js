import React from 'react'
import styles from './Frontpage.module.css';

function Frontpage(props) {
  return (
    <div className="App">
      <header className={styles.background}>

      <div>
      <h5>User logged status: {props.userLoggedIn ? "is logged in" : "not logged in"} </h5>
            
        </div>
        
            <div className={styles.onSale}>
            <h3>Join our service to make people find your restaurant</h3>
            <a><img src='restaurant-manager-picture.jpg' alt=''/></a>
            <br/>
            </div>
      
      </header>
      </div>
  );
  }


export default Frontpage;
