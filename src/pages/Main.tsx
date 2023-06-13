import React from "react";
import styled from "styled-components";
import {Text} from "../components/text";
import {Colors} from "../styles/theme/color";
import BackendImg from "../assets/img/Back.svg";
import FrontendImg from "../assets/img/Front.svg";
import iOSImg from "../assets/img/iOS.svg";
import AndroidImg from "../assets/img/Android.svg";
import SecurityImg from "../assets/img/Secure.svg";
import HeadImg from "../assets/img/BackgroundImg.jpg";
import {Post} from "../components/posting/Post";
import {useQuery} from "react-query";
import axios from "axios";
import * as _ from "./MainStyle";
import {SkeletonPost} from "../components/posting/SkeletonPost";

export const AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJURUFDSEVSIiwianRpIjoiQWRtaW5pc3RyYXRvciIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2ODY2NTA0MTMsImV4cCI6MTY4NjczNjgxM30.lTWBNqHuczrZXmiQDfg5toglkKG0xQv3S3TXnvM8_1A";

export async function getLectures(limit: number) {
    const lecturesRes = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture?limit=${limit}`,
        headers: {
            Authorization: `Bearer ${AccessToken}`,
            'ngrok-skip-browser-warning': '69420'
        }
    })
    return lecturesRes.data.lectures
}

export interface lecturesProps {
    lectureId: number;
    title: string;
    explanation: string;
    lectureThumbnailUrl: string;
    tagNameList: {
        name: string;
    }[]
    createdAt: string;
    createdBy: string;
}

const Main = () => {
    const {data: lecture, isLoading} = useQuery(['getLectures'], () => getLectures(4));

    const titleCategory = [
        {name: "백엔드", imageUrl: BackendImg},
        {name: "프론트엔드", imageUrl: FrontendImg},
        {name: "안드로이드", imageUrl: AndroidImg},
        {name: "iOS", imageUrl: iOSImg},
        {name: "보안", imageUrl: SecurityImg}
    ];
    const newTil = [
        {imageUrl: HeadImg, writer: "승우최", date: "2023.03.03", title: "정처기를 공부해 보았다", subTitle: "정처기를 합격하기 위한 발버둥!", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "Mooner510", date: "2023.03.03", title: "Frontend 씹어먹기", subTitle: "아 프론트엔드 Easy 하네요", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "원준도", date: "2023.03.03", title: "30만원 맛있다", subTitle: "아 30만원짜리 맛있네요 개추", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "조지은", date: "2023.03.02", title: "마라탕이란 무엇인가?", subTitle: "내가 지금까지 마라탕과 살아가며 정리한 것이다.", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "Hood", date: "2023.03.02", title: "This is my hood life", subTitle: "My best friend is Hyun Suk Kim.", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "짱지", date: "2023.03.02", title: "히히", subTitle: "맛있는 //", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "서무성", date: "2023.03.02", title: "편안한 마음", subTitle: "마참내 나의 강의 사이트가 만들어진다고 하는데...", tag: [{name: "Study"}]},
        {imageUrl: HeadImg, writer: "현석조", date: "2023.03.01", title: "원준이와 함께 하고픈 일", subTitle: "원준이 맥북 해킹으로 먹고 싶농", tag: [{name: "Study"}]},
    ];
    const tag = ['HTML', 'CSS', 'Javascript', 'Typescript', 'React', 'Java', 'Kotlin', 'Go', 'Next', 'Nest', 'Spring', 'C', 'Dart'];

    return (
        <>
            <TextDiv>
                <_.DefaultWidth>
                    <FlexDiv wrap="wrap">
                        <Text gradient>인포런.</Text>
                        &nbsp;&nbsp;
                        <Text>듣고싶은 강의를</Text>
                    </FlexDiv>
                    <Text>들을 수 있는 가장 좋은 방법.</Text>
                </_.DefaultWidth>
            </TextDiv>
            <Content>
                <FlexDiv margin="80px 0 0" gap={60} width="100%" className="category">
                    {titleCategory.map((category) => (
                        <FlexDiv key={category.name} direction="column" align="center" gap={20} style={{cursor: 'pointer'}}>
                            <Image src={category.imageUrl}/>
                            <Text>{category.name}</Text>
                        </FlexDiv>
                    ))}
                </FlexDiv>
                <FlexDiv margin="100px 0 20px" wrap="wrap">
                    <Text gradient font="Title2">최신 강의.</Text>
                    &nbsp;&nbsp;
                    <Text font="Title2">따끈따끈한 강의 이야기.</Text>
                </FlexDiv>
                <PostDiv>
                    {lecture && lecture.map((data: lecturesProps) =>
                        <Post isLecture img={data.lectureThumbnailUrl} name={data.createdBy} date={data.createdAt} title={data.title} subTitle={data.explanation} tag={data.tagNameList}
                              lectureId={data.lectureId} key={data.lectureId}/>
                    )}
                    {!lecture || isLoading ? <PostDiv>
                        <SkeletonPost/>
                        <SkeletonPost/>
                        <SkeletonPost/>
                        <SkeletonPost/>
                    </PostDiv> : undefined}
                </PostDiv>
                <FlexDiv margin="100px 0 0" wrap="wrap">
                    <Text gradient font="Title2">최신 TIL.</Text>
                    &nbsp;&nbsp;
                    <Text font="Title2">새로나온 지식 이야기.</Text>
                </FlexDiv>
                <TagDiv>
                    {tag.map((name, index) => <Tag key={index}><Text font="Body3">{name}</Text></Tag>)}
                </TagDiv>
                <PostDiv>
                    {newTil.map((data, index) =>
                        <Post img={data.imageUrl} name={data.writer} date={data.date} title={data.title} subTitle={data.subTitle} tag={data.tag} lectureId={index} key={index}/>
                    )}
                </PostDiv>
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

const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: white;
  cursor: pointer;
`
const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  margin: 40px 0;
`
const PostDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 40px;
  height: fit-content;
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`
const Image = styled.img`
  width: 80px;
  height: 80px;
  transition: 0.2s;
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

  &:hover > img {
    transform: scale(1.2);
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
  display: flex;
  flex-direction: column;
  padding: 300px 0 0;
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }

  .category {
    overflow-x: scroll;
  }
`
