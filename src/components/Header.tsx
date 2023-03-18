import React from "react";
import styled from "styled-components";
import { TextButton } from "./TextButton";
import { Link } from "react-router-dom";
import TextLogo from "../assets/textLogo.png";
import { Text } from "./text";

const Header = () => {
  return (
    <Headers>
        <FlexDiv>
          <Link to="/"><Image src={TextLogo} /></Link>
          <TextButton><Link to="/le"><Text font="Body4">강의</Text></Link></TextButton>
          <TextButton><Link to="/comunity"><Text font="Body4">커뮤니티</Text></Link></TextButton>
        </FlexDiv>
        <FlexDiv>
        </FlexDiv>
    </Headers>
  )
}

export default Header;

const Headers = styled.header`
  height: 50px;
  background-color: blue;
  display: flex;
  align-items: center;
  padding: 0 460px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
  position: absolute;
  top:0;
  right:0;
  width:100%;
`
const Image = styled.img`
  height: 30px;
  margin-right:20px;
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