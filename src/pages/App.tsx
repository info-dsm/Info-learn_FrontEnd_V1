import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./auth/login/login";
import Signup from "./auth/signup/Signup";
import Main from "./Main";
import AuthLayout from "./router/AuthLayout";
import StudentLayout from "./router/StudentLayout";
import LectureAll from "./lecture";
import InfinityLayout from "./router/InfinityLayout";
import LectureRegistration from "./lecture/LectureRegistration";
import RegistrationLayout from "./router/RegistrationLayout";

function App() {
    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Route>
            <Route element={<StudentLayout/>}>
                <Route path="/" element={<Main/>}/>
            </Route>
            <Route element={<InfinityLayout/>}>
                <Route path="/lecture" element={<LectureAll/>}/>
            </Route>
            <Route element={<RegistrationLayout/>}>
                <Route path="/lecture/registration" element={<LectureRegistration/>}/>
            </Route>
        </Routes>
    );
}

export default App;
