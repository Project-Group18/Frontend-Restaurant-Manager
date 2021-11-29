import React from 'react'
import styles from './Managerfrontpage.module.css';


function Managerfrontpage(props) {
    return (
      <div className="App">
          <h1>Restaurant frontpage (logged in)  </h1>
        <header className={styles.background}>
          <div >
      
              <div className={styles.OrderStats}>
                  <div>
                      <p><span>Order Number:</span>{props.orderNumber}</p>
                  </div>
                  <div className={styles.OrderStatus}>
                      <p>
                    <label>
                        Status:
                        <select>
                            <option>Being Prepared</option>
                            <option>Order is Ready</option>
                            <option>Order is on it's way</option>
                         </select>
                    </label>
                   </p>
  
                  </div>
              </div>
              <div className={styles.OrderInfoContainer}>
                  <div className={styles.OrderDetailContainer}>
                      <div>
                          <p>Order Number:<span>{props.orderNumber}</span></p>
                          <p>Address:<span>{props.address}</span></p>
                          <p>Customer Name:<span>{props.customerName}</span></p>
                          <p>Phone Number:<span>{props.phoneNumber}</span></p>
                          <p>Order ID:<span>{props.orderId}</span></p>
                      </div>
                      <div>
                          <p>Notes:<span>{props.notes}</span> </p>
                      </div>
                  </div>
                  <div>
                      <p>Message: <span>{props.message}</span></p>
                  </div>
              </div>
  
          </div>
        </header>

      </div>
    );
  }
  
  export default Managerfrontpage;
  