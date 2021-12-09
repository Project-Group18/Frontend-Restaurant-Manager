import React, {useEffect} from 'react'
import styles from './CurrentOrders.module.css'
import { useState } from 'react'
import api from '../api/config_manager';
import jwtFromWeb from 'jsonwebtoken';

export default function CurrentOrderPage(props) {

    const {jwt} = props;
    const decodedToken = jwtFromWeb.decode(jwt);
    const [orders, setOrders] = useState([]);
    const [dropMenu, setDropMenu] = useState([]);

    //filtering a list with only non-delivered orders
    var onGoingOrders = orders.filter(function (el)
    {
    return el.order_status != "Delivered";
    }
    );

    //filtering a new list with only delived orders
    var orderHistory = orders.filter(function (elementOrder)
    {
    return elementOrder.order_status == "Delivered";
    }
    );

    //get all orders restaurant id
    useEffect(() => {
        const loadOrdersWithJWT =  async () => {
        try {const res = await api.get('/getOrders/restaurant/'+decodedToken.user.restid.toString() ,
        {
            headers: {
                'Authorization': 'Bearer ' +jwt
            }
        }
        );
        console.log("Restaurant orders:")
        console.log(res);
        setOrders(res.data)
        } catch (err) {//Not in 200 response range
            console.log(err);
        }}
        loadOrdersWithJWT();
    }, [])

    //update order Status

    const handleUpdate = (event) => {
        event.preventDefault();
        const updateOrder =  async () => {
            try {const res = await api.put('/orderStatus', 
            {
                order_status: dropMenu,
                order_id: event.target.orderid.value,
                restaurant_id: event.target.restaurantid.value
            },
            {
                headers: {
                'Authorization': 'Bearer ' +jwt
                }
            } 
            );
            console.log("updated state successfully");
            console.log(res);
            //forces component to refresh the page
            window.location.reload(false);
                    
            } catch (error) {
               console.log(error)
            }
            
            } 
            updateOrder();
        }
   
    return (
       <div className="App">
        <div className={styles.background}>
       <h1>My current orders</h1> 

      <h3 >{onGoingOrders.length === 0 && <div>No current orders</div>}</h3>

            {onGoingOrders.length > 0 &&  
            <div className={styles.Headercontainer}>
                 
                <div>
                {onGoingOrders.map(orderElement =>
                <form key={orderElement.order_id} onSubmit={handleUpdate}>
                    <ul>Order ID: <input style={{width:'30px'}}name='orderid' value={orderElement.order_id}/></ul>
                    <ul>Order List: {orderElement.product_list.replace(/[{(")}]/g, ' ')}</ul>
                    <ul>Total price: {orderElement.total_price}€</ul>
                    <ul>Message: {orderElement.message}</ul>
                    <ul>Order status: {orderElement.order_status}</ul>
                    <ul>Customer ID: {orderElement.customer_id}</ul>
                    <ul>Restaurant ID: <input style={{width:'30px'}} name='restaurantid' value={orderElement.restaurant_id}/></ul>

                    <div className={styles.status}>
                    <select name="orderStatus" onChange={(e) =>{
                        const selectedState=e.target.value;
                        setDropMenu(selectedState);
                        }}>
                        <option value="--"> -- </option>
                        <option value="Preparing"> Preparing </option>
                        <option value="Ready for delivery"> Ready for delivery</option>
                        <option value="Delivering"> Delivering</option>
                    </select>
                        <button type='submit' >Update order</button>
                        </div>
                    <hr/>
                </form>
                )}  
                 </div>
                </div>
            
            }
        
        <h2>Order history</h2>
            {orderHistory.length > 0 &&  
            <div className={styles.Headercontainer}>
                    {orderHistory.map(orderElement =>
                        <div key={orderElement.order_id}>
                        <ul>Order ID: <input style={{width:'30px'}}name='orderid' value={orderElement.order_id}/></ul>
                        <ul>Order List: {orderElement.product_list.replace(/[{(")}]/g, ' ')}</ul>
                        <ul>Total price: {orderElement.total_price}€</ul>
                        <ul>Message: {orderElement.message}</ul>
                        <ul>Order status: {orderElement.order_status}</ul>
                        <ul>Customer ID: {orderElement.customer_id}</ul>
                        <ul>Restaurant ID: <input style={{width:'30px'}} name='restaurantid' value={orderElement.restaurant_id}/></ul>
                        <hr/>
                        </div>
                    )}  
            </div>
        }

      </div>
      </div>
    )
}
