import styles from './Registerpage.module.css';
import React, {useState} from 'react'
import api from '../api/config_new.js'
import { useNavigate } from 'react-router-dom';

function Registerpage() {

    const navigate = useNavigate();
    const [ signupProcessState, setSignupProcessState] = useState("idle")

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        setSignupProcessState("processing");

        if (
            event.target.name.value.length > 1 && 
            event.target.email.value.length > 5 && 
            event.target.email.value.includes("@") && 
            event.target.password.value.length >= 8  
            )
            {

        const createManager =  async () => {
            try {const res = await api.post('/manager', 
                {
                manager_email: event.target.email.value,
                manager_password: event.target.password.value,
                manager_name: event.target.name.value,
                })
                console.log(res);
                setSignupProcessState("SignUpSuccessful");
                /* When the login is successful, the page redirects to the login page */
                setTimeout(() => {
                    navigate('/createRestaurant', {state: {email: event.target.email.value}}, {replace: true} )
                }, 1500);   

            } catch (error) {
                console.log(error);
                setSignupProcessState("SignUpFailed");
            }
            } 
                createManager();

        } else {
            setSignupProcessState("SignUpFailed");
        }
            };

    let signupUIControls = null;
    switch(signupProcessState) {
        case "idle":
            signupUIControls =<button type="submit">Sign up</button>
            break;
        case "processing": 
            signupUIControls = <span style={{color:"blue"}}>Processing...</span>
            break;
        case "SignUpSuccessful":
            signupUIControls = <span style={{color:"green"}}>Sign up successful</span>
            break;
        case "SignUpFailed":
            signupUIControls = <span style={{color:"red"}}>Sign up failed</span>
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
            break;
    }

    return (
        <div className={styles.background}>
            <h2>Sign up as a restaurant owner</h2>
                <form onSubmit ={handleSignupSubmit} >
                    <p>*Name</p>
                        <input type="text" name="name" placeholder="Enter your name"></input>
                        <span> Note: Name must be at least 2 characters.</span>
                    <p>*Email</p>
                        <input type="text" name="email" placeholder="Enter email"></input>
                        <span> Note: Email must be at least 6 characters and contain "@".</span>
                    <p>*Password:</p>
                        <input type="text" name="password" placeholder="Enter password"></input>
                        <span> Note: Password must be at least 8 characters.</span>
                    <br/><br/>
                    <div>
                        {signupUIControls}
                    </div>
                </form>
                <br/>
                <br/>
        </div>
    )
}

export default Registerpage
