import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/signup/Signup";
import Main from "./Main";
import AuthLayout from "./router/AuthLayout";
import StudentLayout from "./router/StudentLayout";

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
        </Routes>
    );
}

export default App;
