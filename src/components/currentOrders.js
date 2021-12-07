import React from 'react'
import styles from './CurrentOrders.module.css'
import { useState } from 'react'
import {useLocation} from 'react-router-dom';


export default function CurrentOrderPage() {
   
    const location = useLocation();
    console.log(location.state)
        {/*Needs a data request from backend*/}
    const currentOrder = [
        {
           order_number: 1,
           order_name: 'order1 pizza',
           order_address: 'address1',
           order_id: 'ID1',
           user: 'Markus'

        }, 
        {
            order_number: 2,
            order_name: 'order2 sushi',
            order_address: 'address2',
            order_id: 'ID2',
            user: 'Sally'
        }
    ]
    return (
       <div className="App">
       
      <h1>Current orders</h1>  
       
      <div className={styles.Headercontainer}>
                <div>
                {currentOrder.map(element =>
                <div key={element.order_id} className={styles.orderInfo}>
                    <ul>dish name: {element.order_name}</ul>
                    <ul>address: {element.order_address}</ul>
                    <ul>ID: {element.order_id}</ul>
                    <ul>user: {element.user}</ul>

                    <div className={styles.status}>
                        <select id="order status">
                        <option value="1"> accepted </option>
                        <option value="2"> preparing</option>
                        <option value="3"> ready/delivering</option>
                        </select>
                        <button>Mark as complete</button>
                    </div>
                </div>
                )}
            



                
                </div>
            </div>


      </div>
    )
}
