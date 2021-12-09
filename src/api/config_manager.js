import axios from 'axios';

//this config is used to access manager's protected requests

export default axios.create({
    baseURL: 'https://delivertwist18.herokuapp.com/manager'
    
});

//'http://localhost:3001/manager'
