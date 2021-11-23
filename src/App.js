import './App.css';
import Header from './components/Header.js';
import Frontpage from './components/Frontpage.js';
import Footer from './components/Footer.js';
import SearchbarLocation from './components/SearchbarLocation.js';

function App() {
  return (
    <div >
      <Header/>
      <SearchbarLocation />
      <Frontpage/>
      <Footer/>
    </div>
  );
}

export default App;
