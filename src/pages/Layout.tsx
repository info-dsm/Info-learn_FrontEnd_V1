import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import TextLogo from "../assets/textLogo.png";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextButton } from "../components/TextButton";
import { text } from "./textType";

const Layout = () => {
  return (
    <>
      <Header>
        <FlexDiv>
          <Image src={TextLogo} />
          <TextButton><Link to="/le"><Text size="12px">강의</Text></Link></TextButton>
          <TextButton><Link to="/comunity"><Text size="12px">커뮤니티</Text></Link></TextButton>
        </FlexDiv>
        <FlexDiv>
        </FlexDiv>
      </Header>
      <Body>
        <PrimaryButton><Text color="white">This is text</Text></PrimaryButton>
        <Outlet />
      </Body>
    </>
  )
}

export default Layout;

const Text = styled.p<text>`
  font-size: ${props => props.size ?? '16px'};
  font-weight: ${props => props.weight ?? 400};
  color: ${props => props.color ?? "black"};
`
const Header = styled.header`
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  padding: 0 460px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
`
const Body = styled.div`
  padding: 0 460px;
`
const Image = styled.img`
  height: 30px;
`
const FlexDiv = styled.div`
  display: flex;
  align-items:center;
  a{
    font-size: 12px;
    color: black;
    text-decoration: none;
  }
`