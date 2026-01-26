import HomeLayout from './layout/HomeLayout';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

function App() {
  return (
  
    <>
      {/* <Footer/> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='*' element={<NotFound/>}/>
          <Route path='/signup' element={<SignUp/>}/>

        </Routes>
        </>
     
  
  );
}

export default App;
