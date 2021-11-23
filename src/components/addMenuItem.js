import React from 'react'
import styles from './addMenuItem.module.css'

function AddMenuItemPopUp(props) {
    return (props.trigger) ? (
        <div className={styles.popup}>
            
            <div className={styles.popup_inner}>
                <div className= {styles.popup_text_container}>
                <p> Select item category </p>
                <input type="text" placeholder="Add new catergory"></input>
                <select id="catergory">
                  <option>Pizza</option>
                  <option>Lime</option>
                  <option>Coconut</option>
                  <option>Mango</option>
                </select>
                <div>
                    <p> Name of the dish </p>
                    <input type="text" placeholder=" Dish name"/>
                    <p>Price</p>
                    <input type="text" placeholder="€€€"/>
                    <p>Description</p>
                    <textarea class={styles.description} placeholder="Description"/>
                    <p>picture</p>
                    <input type="file" placeholder="Picture"/>
                    <button className={styles.addButton}>Add item to your menu</button>
                    </div>
                    
                </div>
                <button className={styles.closeButton} onClick={() => props.setTrigger(false)}>&times;</button> 
            </div>

               
        </div>
    
    ) : "";
}

export default AddMenuItemPopUp