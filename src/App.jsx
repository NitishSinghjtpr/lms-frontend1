import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import CourseList from './pages/coursePage/CourseList';
import Contact from './pages/Contact';
import Denied from './pages/Denied';
import CourseDescription from './pages/CourseDescription';

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
          <Route path='/allcourse' element={<CourseList/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/denied' element={<Denied/>}/>
          <Route path='/course/description' element={<CourseDescription/>}/>

        </Routes>
        </>
     
  
  );
}

export default App;
