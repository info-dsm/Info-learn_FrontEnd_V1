import React from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";

const AuthLayout = () => {
    return (
        <>
            <Body>
                <Header/>
                <Outlet/>
            </Body>
        </>
    )
}

export default AuthLayout;

const Body = styled.div`
  padding: 50px 460px 0;
`