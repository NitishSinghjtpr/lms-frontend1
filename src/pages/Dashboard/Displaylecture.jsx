import { useEffect, useState } from "react";
import HomeLayout from "../../layout/HomeLayout";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slice/LectureSlice";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();
  const {lectures}=useSelector((state)=>state.lecture);
  const {role}=useSelector((state)=>state.auth);

  const [currentVideo,setCurrentVideo]=useState(0);

 async function onLectureDelete(courseId,lectureId){
    console.log(courseId,lectureId);
    await dispatch(deleteCourseLecture({courseId:courseId,lectureId:lectureId}));
    await dispatch(getCourseLectures(courseId));
    
 } 

 useEffect(() => {
  if (!state) {
    navigate("/courses");
    return;
  }

  dispatch(getCourseLectures(state._id));  // ✅ Correct Call

}, []);


  return (
    <HomeLayout>
      <div className=" flex flex-col gap-10 items-center justify-center min-h-[90vv] pt-10 text-white  relative">
        <div className=" text-center text-2xl font-bold text-yellow-500">
            Course Name:{state?.title}
        </div>
        <div className=" flex justify-center gap-10 w-full">
            {/* Left section for video palying & displaying course details to admin */}
                <div className=" space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video src={lectures && lectures[currentVideo]?.lecture?.secure_url} 
                    className=" object-fill rounded-tl-lg rounded-tr-lg w-full"
                    controls
                    disablePictureInPicture
                    muted
                    controlsList="nodownload"
                    >

                    </video>
                    <div>
                        <h1>
                            <span className=" text-yellow-500">
                                Title:{" "}
                            </span>
                            {lectures && lectures[currentVideo]?.title}                            
                        </h1>
                        <p>
                            <span className=" text-yellow-500 line-clamp-4">
                                Description: {" "}

                            </span>
                            {lectures && lectures[currentVideo]?.description}
                        </p>
                    </div>
                </div>
                        {/* rigth section for displaying list of lecture */}
               <ul className="w-[28rem] p-2 rounded-lg text-yellow-500 space-y-4 shadow-[0_0_10px_black]">

  {/* Header */}
  <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
    <p>Lecture list</p>

    {role === "admin" && (
      <button
        onClick={() => navigate("/course/addlecture", { state: { ...state } })}
        className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
      >
        Add new lecture
      </button>
    )}
  </li>

  {/* Lecture List */}
  {lectures &&
    lectures.map((lecture, idx) => {
      return (
        <li className="space-y-2" key={lecture._id}>

          {/* Title */}
          <p
            className="cursor-pointer"
            onClick={() => setCurrentVideo(idx)}
          >
            <span> Lecture {idx + 1}: </span>
            {lecture?.title}
          </p>

          {/* DELETE BUTTON FIXED */}
          {role === "admin" && (
            <button
              onClick={() => onLectureDelete(state._id, lecture._id)}
              className="btn-secondary px-2 py-1 rounded-md font-semibold text-sm"
            >
              Delete lecture
            </button>
          )}
        </li>
      );
    })}
</ul>

        </div>
        </div>
    </HomeLayout>
  );
}

export default Displaylectures;
