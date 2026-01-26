import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    changeWidth();
  }

  function handelLogout(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <>
    <div className="min-h-[100vh]">

      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white mt-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative shadow-2xl">
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
              <li className=" absolute bottom-2 w-[90%]">
                <div className="w-full flex items-center jc' gap-4">
                  <Link to="/login" className="">
                    <button className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-md w-full text-center hover:bg-blue-700">
                      Login
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button className="bg-green-600 text-white px-4 py-2 font-semibold w-full rounded-md hover:bg-green-700">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="bottom-2 w-[60%] mt-4">
                <div className="w-full flex items-center gap-4">
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

      {/* MAIN CONTENT */}
      
        {children}
  

      {/* FOOTER — Always full width */}
      <Footer />
    </div>
    </>
  );
};

export default HomeLayout;


// import React from "react";
// import { FiMenu } from "react-icons/fi";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/Footer.jsx";
// import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "./../Redux/Slices/AuthSlice.js";

// const HomeLayout = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // for checking if user is logged in
//   const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

//   // for Displaying the option is acc to role
//   const role = useSelector((state) => state?.auth?.role);

//   const changeWith = () => {
//     const drawerSide = document.getElementsByClassName("drawer-side");
//     drawerSide[0].style.width = "auto";
//   };

//   const hideDrawer = () => {
//     const element = document.getElementsByClassName("drawer-toggle");
//     element[0].checked = false;

//     const drawerSide = document.getElementsByClassName("drawer-side");
//     drawerSide[0].style.width = "0";
//   };
//   // logout handler
//   const handleLogot = async (e) => {
//     e.preventDefault();
//     const res = await dispatch(logout());
//     if (res?.payload?.success) {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="min-h-[100vh] ">
//       <div className="drawer absolute left-0 z-50 w-fit">
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Page content here */}
//           <label htmlFor="my-drawer" className="cursor-pointer relative">
//             <FiMenu
//               onClick={changeWith}
//               size={"32px"}
//               className="font-bold text-white m-4"
//             />
//           </label>
//         </div>

//         <div className="drawer-side w-0">
//           <label htmlFor="my-drawer" className="drawer-overlay"></label>
//           <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-300 text-base-content relative shadow-2xl ">
//             {/* Sidebar content here */}
//             <li className="w-fit absolute right-2 z-50">
//               <button onClick={hideDrawer}>
//                 <AiFillCloseCircle size={24} />
//               </button>
//             </li>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             {isLoggedIn && role === "admin" && (
//               <li>
//                 <Link to="/admin/dashboard ">Admin DashBoard</Link>
//               </li>
//             )}

//             {isLoggedIn && role === "admin" && (
//               <li>
//                 <Link to="/course/create">Create New Course</Link>
//               </li>
//             )}

//             <li>
//               <Link to="/courses">All Course</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact Us</Link>
//             </li>
//             <li>
//               <Link to="/about">about Us</Link>
//             </li>

//             {!isLoggedIn && (
//               <li className="absolute bottom-2 w-[90%]">
//                 <div className="w-full flex items-center justify-center gap-4">
//                   <Link
//                     to="/login"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold rounded-md w-full text-center"
//                   >
//                     Login
//                   </Link>

//                   <Link
//                     to="/signup"
//                     className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 font-semibold rounded-md w-full text-center"
//                   >
//                     SignUp
//                   </Link>
//                 </div>
//               </li>
//             )}

//             {isLoggedIn && (
//               <li className="absolute bottom-4 w-[90%]">
//                 <div className="w-full flex items-center justify-center gap-4">
//                   <Link
//                     to="/user/profile"
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold rounded-md w-full text-center"
//                   >
//                     Profile
//                   </Link>

//                   <button
//                     onClick={handleLogot}
//                     className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 font-semibold rounded-md w-full text-center"
//                   >
//                     LogOut
//                   </button>
//                 </div>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>

//       {children}

//       <Footer />
//     </div>
//   );
// };

// export default HomeLayout;
