import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import TextLogo from "../assets/textLogo.png";
import { Button } from "../components/Button";

const Layout = () => {
  return (
    <>
      <Header>
        <FlexDiv>
          <Image src={TextLogo} />
          <Link to="/le">강의</Link>
          <Link to="/comunity">커뮤니티</Link>
        </FlexDiv>
        <FlexDiv>
        </FlexDiv>
      </Header>
      <Body>
        <Button fill={"FPrimary500"}>Text</Button>
        <Outlet />
      </Body>
    </>
  )
}

export default Layout;

const Header = styled.header`
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  padding: 0 460px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
`
const Body = styled.body`
  background-color: red;
  padding: 0 460px;
`
const Image = styled.img`
  height: 30px;
`
const FlexDiv = styled.div`
  display: flex;
  align-items:center;
  gap: 40px;
  a{
    font-size: 12px;
    color: black;
    text-decoration: none;
  }
`