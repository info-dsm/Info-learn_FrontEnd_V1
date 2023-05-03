import React from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";
import {Colors} from "../../styles/theme/color";

const RegistrationLayout = () => {
    return (
        <>
            <Body>
                <Header/>
                <Outlet/>
            </Body>
        </>
    )
}

export default RegistrationLayout;

const Body = styled.div`
  background-color: ${Colors.White};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0;
`