import React from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";
import {Colors} from "../../styles/theme/color";
import Footer from "../../components/Footer";

const StudentLayout = () => {
    return (
        <>
            <Body>
                <Header/>
                <Outlet/>
            </Body>
            <Footer/>
        </>
    )
}

export default StudentLayout;

const Body = styled.div`
  background-color: ${Colors.Gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0;
`