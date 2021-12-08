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
        console.log(event.target)
    
        const updateOrder =  async () => {
            try {const res = await api.put('/orderStatus', 
            {
                order_status: dropMenu,
                /* order_status: "Received", */
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
       <h1>Current order page</h1> 
      


      <h3 >{orders.length === 0 && <div>No current orders</div>}</h3>


            {orders.length > 0 &&  
            <div className={styles.Headercontainer}>
                 
                <div>
                {orders.map(orderElement =>
                <form key={orderElement.order_id} onSubmit={handleUpdate}>
                    <ul>Order ID: <input style={{width:'30px'}}name='orderid' value={orderElement.order_id}/></ul>
                    <ul>Total price: {orderElement.total_price}€</ul>
                    <ul>Message: {orderElement.message}</ul>
                    <ul>Order status: {orderElement.order_status}</ul>
                    <ul>Customer ID: {orderElement.customer_id}</ul>
                    <ul>Restaurant ID: <input style={{width:'30px'}} name='restaurantid' value={orderElement.restaurant_id}/></ul>


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
                    <hr/>
                 
                </form>
                )}  
                 </div>
                </div>
            
            }

      </div>
    )
}
