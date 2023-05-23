import React from "react";
import {Outlet} from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";
import {Colors} from "../../styles/theme/color";

const InfinityLayout = () => {


    return (
        <>
            <Global/>
            <Body>
                <Header/>
                <Outlet/>
            </Body>
        </>
    )
}

const Global = createGlobalStyle`
  body {
    background-color: ${Colors.Gray100};
  }
`

export default InfinityLayout;

const Body = styled.div`
  //height: 100%;
  background-color: ${Colors.Gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0;
`