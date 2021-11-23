import React from 'react'
import styles from './Header.module.css'
export default function SearchbarLocation() {
    
    
    return (
        <div>
            <div className={styles.search}> 
              <input className={styles.searchbar} type="searchtext" placeholder= "Search for restaurants or dishes"></input> 
              <button> Search</button>
            </div> 


        </div>
    )
}
