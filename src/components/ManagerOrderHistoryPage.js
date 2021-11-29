import React from 'react'
import styles from './ManagerOrderHistoryPage.module.css';

export default function ManagerOrderHistoryPage(props) {
    return (
        <div className="App">
        
        <div class={styles.heading}><b>Order History</b></div>
       
        <div> 
        <div className={styles.OrderInfoContainer}>
        <div className={styles.scrolldiv}>
                  <div className={styles.OrderDetailContainer}>
                      <div>
                          <p>Order Number:<span>{props.orderNumber}</span></p>
                          <p>Address:<span>{props.address}</span></p>
                          <p>Customer Name:<span>{props.customerName}</span></p>
                          <p>Phone Number:<span>{props.phoneNumber}</span></p>
                          <p>Message: <span>{props.message}</span></p>
                        
                      </div>
                      <div className={styles.status}>
                          <p>Status:<span>{props.notes}</span> </p>
                      </div>
                 
                       
                    </div>

                    <div className={styles.OrderDetailContainer}>
                      <div>
                          <p>Order Number:<span>{props.orderNumber}</span></p>
                          <p>Address:<span>{props.address}</span></p>
                          <p>Customer Name:<span>{props.customerName}</span></p>
                          <p>Phone Number:<span>{props.phoneNumber}</span></p>
                          <p>Message: <span>{props.message}</span></p>
                      </div>
                      <div className={styles.status}>
                          <p>Status:<span>{props.notes}</span> </p>
                      </div>
                  </div>
                  <div className={styles.OrderDetailContainer}>
                      <div>
                          <p>Order Number:<span>{props.orderNumber}</span></p>
                          <p>Address:<span>{props.address}</span></p>
                          <p>Customer Name:<span>{props.customerName}</span></p>
                          <p>Phone Number:<span>{props.phoneNumber}</span></p>
                          <p>Message: <span>{props.message}</span></p>
                      </div>
                      <div className={styles.status}>
                          <p>Status:<span>{props.notes}</span> </p>
                      </div>
              </div>
              <div className={styles.OrderDetailContainer}>
                      <div>
                          <p>Order Number:<span>{props.orderNumber}</span></p>
                          <p>Address:<span>{props.address}</span></p>
                          <p>Customer Name:<span>{props.customerName}</span></p>
                          <p>Phone Number:<span>{props.phoneNumber}</span></p>
                          <p>Message: <span>{props.message}</span></p>
                      </div>
                      <div className={styles.status}>
                          <p>Status:<span>{props.notes}</span> </p>
                      </div>
              </div>
              </div>
              </div>
              </div>
        </div>
    )
}
