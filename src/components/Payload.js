import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken';
import api from '../api/config_manager';

function Payload(props) {

    const [managers, seManager] = useState([]);
    const decodedToken = jwt.decode(props.jwt);
    console.log("following is the decoded token")
    console.log(decodedToken);


        //get all managers from manager table
        useEffect(() => {
        const loadManagersWithJWT =  async () => {
        try {const res = await api.get('/managers',
        {
            //we need to add an authorization token from app.js to 
            //access authenticated requests.
            headers: {
                'Authorization': 'Bearer ' +props.jwt
            }
        }
        );
        console.log(res);
        seManager(res.data)
        } catch (err) {//Not in 200 response range
            console.log(err);
        }}
        loadManagersWithJWT();
    }, [])


    return (
        <div>
            <div> <h4>User info:</h4>
               User Id: {decodedToken.user.id} <br/>
                User email {decodedToken.user.email} <br/>
            </div>
            <br/>
            <table>
                {managers.map(m => 
                <tr>
                    <td>{m.manager_id}</td>
                    <td>{m.manager_name}</td>
                    <td>{m.manager_email}</td>
                    <td>{m.manager_password}</td>
                    <td>{m.restaurant_id}</td>
                </tr>)}
            </table>

        </div>
    )
}

export default Payload
