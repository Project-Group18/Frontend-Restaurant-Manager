import React from 'react'
import styles from './Frontpage.module.css';

function Frontpage() {
  return (
    <div className="App">
      <header className={styles.background}>

      <div>
      <p>Welcome restaurant manager </p>
            
        </div>
            <div className={styles.onSale}>
            <img className={styles.ufo} src='ufo2.png' alt='picture'/>
            </div>
            
           


            <p className={styles.categories}> Food categories:</p>
            <div className={styles.optionmenu}>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            <img className={styles.Placeholder} src='restaurantPlaceHolderIcon.jpg' alt='picture'/>
            </div>
         

      
      </header>
      </div>
  );
  }


export default Frontpage;
