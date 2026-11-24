import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
    <div className='app-layout'>

    <Navbar />    
    <main className='app-main'>

        <Outlet />
    </main>
        <Footer />    
    </div>
   
    </>
  )
  
}

export default App
