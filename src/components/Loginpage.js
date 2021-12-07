import React, { useState } from 'react'
import api from '../api/config_login';
import { useNavigate } from 'react-router-dom';
import jwtFromWeb from 'jsonwebtoken';

function Loginpage(props) {

    const navigate = useNavigate();
    const [ logInSetUpState, setlogInSetUpState] = useState("idle")

    const handleLogIn = (event) => {
        event.preventDefault();

        setlogInSetUpState("processing");
        const managerLogin =  async () => {
            try {const res = await api.post('', 
            null, 
            {
                auth: {
                username: event.target.email.value,
                password: event.target.password.value
                }
            }
            
            );
            //successful login
            setlogInSetUpState("SignInSuccessful");
            console.log(res);
            const JWToken = res.data.jwt;
            props.login(JWToken);

            const decodedToken = jwtFromWeb.decode(JWToken);
            //if the user has a restaurant
            console.log("restid!!!")
            console.log(decodedToken.user.restid)


        
            setTimeout(() => {
                navigate('/', {replace: true})
            }, 1500)
                    //resetting navigation history?
                   /*  {state:{
                        email:event.target.email.value
                        }} */
    
            } catch (error) {
                setlogInSetUpState("SignInFailed");
                console.log(error);
            }
           
            } 
            managerLogin();
    }

    let logInUIControls = null;
    switch(logInSetUpState) {
        case "idle":
            logInUIControls =<button type="submit">Sign in</button>
            break;
        case "processing": 
        logInUIControls = <span style={{color:"blue"}}>Processing...</span>
            break;
        case "SignInSuccessful":
            logInUIControls = <span style={{color:"green"}}>Sign in successful</span>
            break;

        case "SignInFailed":
            logInUIControls = <span style={{color:"red"}}>Sign in failed</span>
            break;
    }

    return (
        <div>
          <br/>
            <h2>Login</h2>
            <form onSubmit={ handleLogIn}>
                    <p>*Email</p>
                        <input type="text" name="email" placeholder="Enter email"></input>
                    <p>*Password:</p>
                        <input type="text" name="password" placeholder="Enter password"></input>
                    <br/>
                    <div>
                       {logInUIControls}
                    </div>
                </form>
        </div>
    )
}

export default Loginpage
