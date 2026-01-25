import HomeLayout from './layout/HomeLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUs/>} />

        </Routes>
     
    </BrowserRouter>
  );
}

export default App;
