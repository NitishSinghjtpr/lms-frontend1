import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  //for displaying the option acc to role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto"; // FIXED
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false; // FIXED

    changeWidth();
  }

  function handelLogout(e){
    e.preventDefault();
    
    // const res=await dispatch(logout());
    // if(res?.payload?.success)

    navigate('/');
  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        {/* FIX: removed w-0 (drawer कभी दिखाई नहीं देगा अगर w-0 रहेगा) */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>

            {isLoggedIn && role === "admin" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/allcourse">Get all course</Link>
            </li>

            {!isLoggedIn && (
              <li className="  bottom-2 w-[60%] mt-4">
              <div className="w-full flex items-center  gap-4">
                <Link to="/login">
                  <button className="bg-blue-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-blue-700">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="bg-green-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-green-700">
                    Signup
                  </button>
                </Link>
              </div>
              </li>
            )}

             {isLoggedIn && (
              <li className="  bottom-2 w-[60%] mt-4">
              <div className="w-full flex items-center  gap-4">
                <Link to="/user/profile">
                  <button className="bg-blue-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-blue-700">
                    Profile
                  </button>
                </Link>

                <Link onClick={handelLogout}>
                  <button className="bg-green-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-green-700">
                    Logout
                  </button>
                </Link>
              </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
