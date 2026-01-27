import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';

function App() {
  return (
  
    <>
      {/* <Footer/> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='*' element={<NotFound/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LoginPage/>}/>

        </Routes>
        </>
     
  
  );
}

export default App;
