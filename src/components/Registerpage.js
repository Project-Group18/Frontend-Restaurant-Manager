import React, {useState} from 'react'
import api from '../api/config_new.js'
import { useNavigate } from 'react-router-dom';

function Registerpage(props) {

    const navigate = useNavigate();
    const [ signupProcessState, setSignupProcessState] = useState("idle")

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        setSignupProcessState("processing");

        console.log(event.target.name.value);
        console.log(event.target.email.value);
        console.log(event.target.password.value);

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
                    navigate('/createRestaurant', {state: {id: event.target.email.value}}, {replace: true})
                }, 1500);

            } catch (error) {
                console.log(error);
                setSignupProcessState("SignUpFailed");
            }
            } 
                createManager();
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
            break;
    }

    return (
        <div>
            <h2>Sign up as a restaurant owner</h2>
                <form onSubmit ={handleSignupSubmit} >
                    <p>*Name</p>
                        <input type="text" name="name" placeholder="Enter your name"></input>
                    <p>*Email</p>
                        <input type="text" name="email" placeholder="Enter email"></input>
                    <p>*Password:</p>
                        <input type="text" name="password" placeholder="Enter password"></input>
                    <br/><br/>
                    <div>
                        {signupUIControls}
                    </div>
                </form>
        </div>
    )
}

export default Registerpage
