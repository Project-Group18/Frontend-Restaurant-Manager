import React, { useState } from 'react'
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Frontpage from './components/Frontpage';
import ManagerAccountPage from './components/ManagerAccountPage';
import CurrentOrderPage from './components/CurrentOrderPage.js';
import Registerpage from './components/Registerpage';
import Loginpage from './components/Loginpage';
import Payload from './components/Payload.js';
import CreateRestaurant from './components/CreateRestaurant.js';
import jwt from 'jsonwebtoken';

const jwtFromLocalStorage = window.localStorage.getItem('localStorageJWT');

function App() {

  const [userJWT, setUserJWT] = useState(jwtFromLocalStorage);

    
    //routes which are accessable only when user is not logged in
    let accessableRoutes = <>
      <Route path="/registerpage"element={<Registerpage />}/>  
      <Route path="/loginpage"element={<Loginpage login={ newJWToken => {
        setUserJWT(newJWToken)
      window.localStorage.setItem('localStorageJWT', newJWToken)
      }}/>}/>  
      <Route path="/createRestaurant" element={<CreateRestaurant jwt={userJWT} />}/>
    </>

    //these routes are accessable only when user is logged in
    if (userJWT != null) {
      accessableRoutes =
    <>
    <Route path="/managerAccountPage"element={<ManagerAccountPage jwt={userJWT} />}/>
    <Route path="/currentOrdersPage" element={<CurrentOrderPage jwt={userJWT} />}/> 
    <Route path="/payload" element={<Payload jwt={userJWT} />}/>
    </>
    }

  return (
    <div >


<Header userLoggedIn={userJWT != null} logout={()=> {
  setUserJWT(null)
  window.localStorage.removeItem('localStorageJWT');
}}/>

<Router>
      <div style={{ display:"flex", justifyContent: "space-around" }}>

      {/* <Link to='/payload'>Payload</Link>  */}
        
        
      </div>      
    <Routes>
    <Route path="/" element={<Frontpage userLoggedIn={userJWT != null}/>}/>
      <Route path="*" element={<Frontpage/>}/>
      <Route path="/manageraccpage" element={<ManagerAccountPage/>}/>
      <Route path="manageraccpage/:params" element={<ManagerAccountPage/>}/>
     
      {accessableRoutes}

      
    </Routes>

   </Router>
    
      <Footer/>
    </div>
  );
}

export default App;
