import React from 'react'
import jwt from 'jsonwebtoken';

function Payload(props) {

    const decodedToken = jwt.decode(props.jwt);
    console.log("following is the decoded token")
    console.log(decodedToken);

    return (
        <div>
            <div> <h4>User info:</h4>
               User Id: {decodedToken.user.id} <br/>
                User email {decodedToken.user.email} <br/>
                Restaurant id {decodedToken.user.restid} <br/>
            </div>
            <br/>



        </div>
    )
}

export default Payload
