import React from 'react'
import { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';

import api from '../api/config';

function TempRestManagerList() {

    const [managers, SetManagers ] = useState([]);

//get all rest.mangaers from rest.manager table
useEffect(() => {
    const fetchManagers =  async () => {
    try {const res = await api.get('/manager');
    console.log(res);
    SetManagers(res.data)
    } catch (err) {//Not in 200 response range
        console.log(err);
    }}
    fetchManagers();
}, [])

    return (
        <div>
            {managers.map(manager =>
                <div>
                <div> 
                    <Link to= 
                    {{ 
                    pathname: '/manageraccpage/' + manager.manager_id.toString()}} 
                    state={{manager,
                    }}
                    >
                    <div>Choose manager {manager.manager_id}</div>
                    </Link>
                </div>
                <br/>
                <div key={manager.manager_id}></div>
                <ul>ID: {manager.customer_id}</ul>
                <ul>Name: {manager.manager_name}</ul>
                <ul>Email: {manager.manager_email}</ul>
                <ul>Password: {manager.manager_password}</ul>
                <ul>Restaurant ID: {manager.restaurant_id}</ul>
                <br/>
                </div>
            )} 
        </div>
    )
}

export default TempRestManagerList
