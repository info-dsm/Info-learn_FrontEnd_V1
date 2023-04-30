import styled from "styled-components";
import {Text} from "./text";
import {Colors} from "../styles/theme/color";
import React from "react";
import triangle from "../assets/img/Triangle.png";
import Icon from "../assets/Icon";

interface postProps {
    img: string;
    name: string;
    date: string;
    title: string;
    subTitle: string;
    tag: {
        name:string;
    }[]
    isLecture?: boolean;
}

export const Post = ({img, name, date, title, subTitle, tag, isLecture}: postProps) => {
    return (
        <PostBody>
            <UpDiv className="upDiv">
                {isLecture ? <PlayCircle><Triangle src={triangle}/></PlayCircle> : null}
                <Img src={img}/>
            </UpDiv>
            <InfoDiv>
                <Text font="Body4">{name}</Text>
                <div style={{width: "1px", height: "8px", backgroundColor: Colors["Gray500"], borderRadius: "1px"}}></div>
                <Text font="Body4">{date}</Text>
            </InfoDiv>
            <TitleDiv>
                <Text font="Body1">{title}</Text>
                <Text font="Body4" color={Colors["Gray500"]}>{subTitle}</Text>
            </TitleDiv>
            <BottomDiv>
                <TagDiv>
                    {tag.map((data, index) => <Text key={index} color={Colors["FPrimary500"]} font="Body4">{data.name}</Text>)}
                </TagDiv>
                <Icon icon="heart"/>
                <Icon icon="more"/>
            </BottomDiv>
        </PostBody>
    )
}

const UpDiv = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 138px;
  position: relative;
  transition: 0.2s;
`
const TagDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
`
const BottomDiv = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
`
const Triangle = styled.img`
  height: 12px;
  width: 12px;
`
const PlayCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 24px;
  width: 24px;
  outline: ${Colors["Gray100"]} 4px solid;
  background-color: ${Colors["FPrimary500"]};
  position: absolute;
  bottom: -12px;
  right: 20px;
`
const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`
const InfoDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`
const Img = styled.img`
  width: 244px;
  height: 138px;
  object-fit: cover;
  border-radius: 8px;
`
const PostBody = styled.div`
  width: 244px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  cursor: pointer;

  &:hover .upDiv {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.12) 0 16px 16px;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`