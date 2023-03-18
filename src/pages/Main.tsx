import React from "react";
import styled from "styled-components";
import { Text } from "../components/text";
import { TextButton } from "../components/TextButton";
import { Colors } from "../styles/theme/color";

const Main = () => {
  const titleCategory = [
    {name:"백엔드",imageUrl:""},
    {name:"프론트엔드",imageUrl:""},
    {name:"안드로이드",imageUrl:""},
    {name:"iOS",imageUrl:""}
  ];
  return (
    <Content>
      <AdDiv>
        <Text>새로운 강의 나옴</Text>
        <TextButton>더 알아보기</TextButton>
      </AdDiv>
      <TextDiv>
        <FlexDiv><Text gradient={true}>인포런.</Text><Text>듣고싶은 강의를</Text></FlexDiv>
        <Text>들을 수 있는 가장 좋은 방법.</Text>
      </TextDiv>
      <FlexDiv margin="100px 0 0" gap={60}>
        {titleCategory.map((category)=>(
          <FlexDiv key={category.name} direction="column" align="center" gap={20}>
            <Image src={category.imageUrl}/>
            <Text>{category.name}</Text>
          </FlexDiv>
        ))}
      </FlexDiv>
      <FlexDiv margin="100px 0 20px"><Text gradient={true} font="Title2">최신 강의.</Text><Text font="Title2">따끈따끈한 강의 이야기.</Text></FlexDiv>
    </Content>
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

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: silver;
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
    ${props=>props.isTitle ? `font-size:40px;font-weight:600;color:${Colors["Gray600"]}` : null};
  }
`
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 439px;
  padding-top: 140px;
  p {
    font-size: 40px;
    font-weight: 600;
    color: ${Colors.Gray600};
  }
`
const Content = styled.div`
  width: 100%;
`
const AdDiv = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
  left:0;
`