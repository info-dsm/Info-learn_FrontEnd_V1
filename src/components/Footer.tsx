import React from "react";
import styled from "styled-components";
import {Colors} from "../styles/theme/color";
import logo from "../assets/Logo.png";
import {Text} from "./text";

const Footer = () => {
    return (
        <FooterDiv>
            <Footers>
                <Line></Line>
                <Logo src={logo}/>
                <Text font="Body4" color={Colors["Gray500"]}>Copyright © 2023 infolearn</Text>
                <Text font="Body4" color={Colors["Gray500"]}>대표 현석조 대전광역시 유성구 가정북로 76<br/>전화 : 010-1234-5678 Email : pokabook@gmail.com</Text>
                <Text font="Body4" color={Colors["Gray500"]}>이용약관 | 개인정보처리방침</Text>
            </Footers>
        </FooterDiv>
    )
}

export default Footer

const Logo = styled.img`
  width: 24px;
  height: 24px;
`
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${Colors["Gray300"]};
`
const Footers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding: 140px 0 100px;
  background-color: ${Colors["Gray100"]};
`
