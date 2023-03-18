import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import 'remixicon/fonts/remixicon.css'
import Header from "../../components/Header";
import { Colors } from "../../styles/theme/color";

const StudentLayout = () => {
  const Body = styled.div`
    padding: 50px 460px 0;
    background-color: ${Colors.Gray100};
  `
  return (
    <>
      <Header />
      <Body>
        <Outlet />
      </Body>
      {/* Footer 넣어야됨 */}
    </>
  )
}

export default StudentLayout;