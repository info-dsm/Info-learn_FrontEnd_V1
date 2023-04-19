import React from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";
import {Colors} from "../../styles/theme/color";

const StudentLayout = () => {
    return (
        <>
            <Header/>
            <Body>
                <Outlet/>
            </Body>
            {/* Footer 넣어야됨 */}
        </>
    )
}

export default StudentLayout;

const Body = styled.div`
  background-color: ${Colors.Gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
`