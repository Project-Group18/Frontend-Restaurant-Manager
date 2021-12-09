import axios from 'axios';

//this config is used to access public requests

export default axios.create({
    baseURL: 'https://delivertwist18.herokuapp.com/public'
    
});

//'http://localhost:3001'


