import React from "react";
import {Routes, Route} from "react-router-dom";
import Main from "./Main";
import StudentLayout from "./router/StudentLayout";
import LectureAll from "./lecture";
import InfinityLayout from "./router/InfinityLayout";
import LectureRegistration from "./lecture/LectureManage/LectureRegistration";
import RegistrationLayout from "./router/RegistrationLayout";
import Search from "./search";
import DetailLecture from "./lecture/LectureManage/DetailLecture";
import VideoRegistration from "./lecture/VideoManage/VideoRegistration";
import DetailVideo from "./lecture/VideoManage/DetailVideo";

function App() {
    return (
        <Routes>
            {/* <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Route> */}
            <Route element={<StudentLayout/>}>
                <Route path="/" element={<Main/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/lecture/detail" element={<DetailLecture/>}/>
            </Route>
            <Route element={<InfinityLayout/>}>
                <Route path="/lecture" element={<LectureAll/>}/>
                <Route path="/video/about" element={<DetailVideo/>}/>
            </Route>
            <Route element={<RegistrationLayout/>}>
                <Route path="/lecture/registration" element={<LectureRegistration/>}/>
                <Route path="/lecture/videoRegistration" element={<VideoRegistration/>}/>
            </Route>
        </Routes>
    );
}

export default App;
