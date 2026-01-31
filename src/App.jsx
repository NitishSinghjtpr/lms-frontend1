import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import CourseList from "./pages/coursePage/CourseList";
import Contact from "./pages/Contact";
import Denied from "./pages/Denied";
import CourseDescription from "./pages/CourseDescription";
import RequireAuth from "./components/Auth/RequireAuth";
import CreateCourse from "./pages/CreateCourse";
import Profile from "./pages/User/Profile";
import EditProfile from './pages/User/EditProfile';
import Checkout from './pages/payment/Checkout';
import CheckoutSuccess from './pages/payment/CheckoutSuccess';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/allcourse" element={<CourseList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />

        {/* PROTECTED ROUTE NOW FIXED */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["admin","user"]} />}>
          <Route path="/user/profile" element={<Profile/>} />
          <Route path="/user/editprofile" element={<EditProfile/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/checkout/success" element={<CheckoutSuccess/>} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
