import React from "react";
import styled from "styled-components";
import {Text} from "../../components/text";
import * as _ from "../MainStyle";
import HeadImg from "../../assets/img/BackgroundImg.jpg";
import {Colors} from "../../styles/theme/color";
import {Button} from "../../components/button/Button";
import InfinityScroll from "./InfinityScroll";
import {Link} from "react-router-dom";

const LectureAll = () => {
    return (
        <>
            <TextDiv>
                <_.DefaultWidth flex>
                    <Text font="Title2" gradient>최신 강의.</Text>
                    <Text font="Title2" color={Colors["White"]}>따끈따끈한 강의 이야기.</Text>
                </_.DefaultWidth>
            </TextDiv>
            <ContentDiv>
                <TitleDiv>
                    <Text font="Title1" gradient>전체</Text>
                    <Link to="/lecture/registration" style={{textDecoration:"none"}}><Button gray>강의 등록하기</Button></Link>
                </TitleDiv>
                <InfinityScroll/>
            </ContentDiv>
        </>
    )
}

export default LectureAll

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ContentDiv = styled.div`
  padding: 80px 0 0;
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: fit-content;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 100%;
  background-position: center center;
  background-size: cover;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${HeadImg});
`
