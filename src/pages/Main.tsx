import React from "react";
import styled from "styled-components";
import {Text} from "../components/text";
import {Colors} from "../styles/theme/color";
import BackendImg from "../assets/Java.png";
import FrontendImg from "../assets/Frontend.png";
import iOSImg from "../assets/iOS.png";
import AndroidImg from "../assets/Android.png";
import SecurityImg from "../assets/Security.png";
import HeadImg from "../assets/city-4991094.jpg";
import {Post} from "../components/Post";

const Main = () => {
    const titleCategory = [
        {name: "백엔드", imageUrl: BackendImg},
        {name: "프론트엔드", imageUrl: FrontendImg},
        {name: "안드로이드", imageUrl: AndroidImg},
        {name: "iOS", imageUrl: iOSImg},
        {name: "보안", imageUrl: SecurityImg}
    ];
    const newLecture = [
        {imageUrl: HeadImg, writer: "태곤임", date: "2023.04.01", title: "아마도 요즘 유행하는 패스트캠퍼스 리엑트 강의", subTitle: "소중한 강의...!", tag: ["#React"]},
        {imageUrl: HeadImg, writer: "태곤임", date: "2023.04.01", title: "싱글벙글 HTML로 코딩하기", subTitle: "전세계 최대의 난제인 HTML로 코딩할 수 있는가...", tag: ["#Frontend", "HTML", "#CSS"]},
        {imageUrl: HeadImg, writer: "태곤임", date: "2023.04.01", title: "싱글벙글 HTML로 코딩하기", subTitle: "전세계 최대의 난제인 HTML로 코딩할 수 있는가...", tag: ["#Frontend", "HTML", "#CSS"]},
        {imageUrl: HeadImg, writer: "태곤임", date: "2023.04.01", title: "싱글벙글 HTML로 코딩하기", subTitle: "전세계 최대의 난제인 HTML로 코딩할 수 있는가...", tag: ["#Frontend", "HTML", "#CSS"]},
    ]
    return (
        <>
            <TextDiv>
                <DefaultWidth>
                    <FlexDiv wrap="wrap">
                        <Text gradient={true}>인포런.</Text>
                        <Text>듣고싶은 강의를</Text>
                    </FlexDiv>
                    <Text>들을 수 있는 가장 좋은 방법.</Text>
                </DefaultWidth>
            </TextDiv>
            <Content>
                <FlexDiv margin="80px 0 0" gap={60}>
                    {titleCategory.map((category) => (
                        <FlexDiv key={category.name} direction="column" align="center" gap={20}>
                            <Image src={category.imageUrl}/>
                            <Text>{category.name}</Text>
                        </FlexDiv>
                    ))}
                </FlexDiv>
                <FlexDiv margin="100px 0 20px" wrap="wrap">
                    <Text gradient={true} font="Title2">최신 강의.</Text>
                    <Text font="Title2">따끈따끈한 강의 이야기.</Text>
                </FlexDiv>
                <PostDiv>
                    {newLecture.map((data, index) =>
                        <Post isLecture={true} img={data.imageUrl} name={data.writer} date={data.date} title={data.title} subTitle={data.subTitle} tag={data.tag} key={index}/>
                    )}
                </PostDiv>
                <FlexDiv margin="100px 0 40px" wrap="wrap">
                    <Text gradient={true} font="Title2">최신 TIL.</Text>
                    <Text font="Title2">새로나온 지식 이야기.</Text>
                </FlexDiv>
            </Content>
        </>
    )
}

export default Main;

interface flex {
    gap?: number;
    justify?: string;
    align?: string;
    direction?: string;
    wrap?: string;
    width?: string;
    height?: string;
    margin?: string;
    isTitle?: boolean;
}

const PostDiv = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
  row-gap: 40px;
  height: fit-content;
  width: 100%;
  flex-wrap: wrap;
`
const DefaultWidth = styled.div`
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const Image = styled.img`
  width: 80px;
  height: 80px;
`
const FlexDiv = styled.div<flex>`
  display: flex;
  justify-content: ${props => props.justify ?? "flex-start"};
  align-items: ${props => props.align ?? "flex-start"};
  flex-wrap: ${props => props.wrap ?? "nowrap"};
  flex-direction: ${props => props.direction ?? "row"};
  gap: ${props => props.gap ?? 0}px;
  width: ${props => props.width ?? "auto"};
  height: ${props => props.height ?? "auto"};
  margin: ${props => props.margin ?? "0"};

  p {
    ${props => props.isTitle ? `font-size:40px;font-weight:600;color:${Colors["Gray600"]}` : null};
  }
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  left: 0;
  position: absolute;
  background-position: center center;
  background-size: cover;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${HeadImg});

  p {
    font-size: 40px;
    font-weight: 600;
    color: ${Colors["White"]};
  }
`
const Content = styled.div`
  padding: 300px 0 0;
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`