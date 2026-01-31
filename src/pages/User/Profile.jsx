import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state?.auth?.data);
  console.log("USER DATA → ", userData);

  return (
    <HomeLayout>


      

      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          {/* USER IMAGE */}
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 rounded-full border border-black mx-auto"
            alt=""
          />

          {/* USER NAME */}
          <h3 className="text-xl font-semibold text-center capitalize mt-3">
            {userData?.name}
          </h3>

          {/* USER DETAILS */}
          <div className="grid grid-cols-2 mt-3 gap-y-2">
            <p>Email:</p>
            <p>{userData?.email}</p>

            <p>Role:</p>
            <p>{userData?.role}</p>

            <p>Subscription:</p>
            <p>
              {userData?.subscription?.status?.toLowerCase() === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-center"
            >
              Change password
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 text-center"
            >
              Edit profile
            </Link>
          </div>

          {userData?.subscription?.status?.toLowerCase() !== "active" && (
            <button onClick={()=>navigate("/checkout")} className="w-full mt-3 bg-red-600 hover:bg-red-500 rounded-sm py-2">
               Subscripbe
            </button>
          )}

          {/* CANCEL SUBSCRIPTION BUTTON — only for ACTIVE users */}
          {userData?.subscription?.status?.toLowerCase() === "active" && (
            <button className="w-full mt-3 bg-red-600 hover:bg-red-500 rounded-sm py-2">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
