import './App.css';
import Header from './components/Header.js';
import Managerfrontpage from './components/Managerfrontpage.js';
import Footer from './components/Footer.js';
import SearchbarLocation from './components/SearchbarLocation.js';
import Errorpage from './components/Errorpage.js';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Frontpage from './components/Frontpage';
import TempRestManagerList from './components/TempRestManagerList';
import ManagerAccountPage from './components/ManagerAccountPage';


function App() {
  return (
    <div >


<Header/>

<Router>
      <div style={{ display:"flex", justifyContent: "space-around" }}>
        <Link to='/'>Frontpage</Link>
        <Link to='/managerfrontpage'>Manager frontpage </Link>
        <Link to='/restmanagerlist'>Restaurant manager list</Link>

        {/* Commented out becasue they don't have functionality yet */}

        {/* <Link to='/restaurantaccountpage'>Restaurant account page</Link>
        <Link to='/managerorderhistorypage'>Manager Order History</Link>
        <Link to='/searchresultpage'>Search Result Page</Link>
        <Link to='/foodcategoriespage'>Food Categories Page</Link>
        <Link to='/restaurantinfopage'>Restaurant Info Page</Link> */}
        
        
      </div>
      <SearchbarLocation />
    <Routes>
    <Route path="/" element={<Frontpage/>}/>
    <Route path="/managerfrontpage" element={<Managerfrontpage/>}/>
      <Route path="/*" element={<Errorpage/>}/>
      <Route path="/restmanagerlist" element={<TempRestManagerList/>}/>
      <Route path="/manageraccpage" element={<ManagerAccountPage/>}/>
      <Route path="manageraccpage/:params" element={<ManagerAccountPage/>}/>
    </Routes>

   </Router>
    
      <Footer/>
    </div>
  );
}

export default App;
