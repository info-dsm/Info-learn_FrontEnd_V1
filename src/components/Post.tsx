import styled from "styled-components";
import {Text} from "./text";
import {Colors} from "../styles/theme/color";
import React from "react";

interface postProps {
    img: string;
    name: string;
    date: string;
    title: string;
    subTitle: string;
    tag: string[];
}

export const Post = ({img, name, date, title, subTitle, tag}: postProps) => {
    return (
        <PostBody>
            <Img src={img}/>
            <InfoDiv>
                <Text font="Body4">{name}</Text>
                <div style={{width: "1px", height: "8px", backgroundColor: Colors["Gray500"], borderRadius: "1px"}}></div>
                <Text font="Body4">{date}</Text>
            </InfoDiv>
            <TitleDiv>
                <Text font="Body1">{title}</Text>
                <Text font="Body4" color={Colors["Gray500"]}>{subTitle}</Text>
            </TitleDiv>
        </PostBody>
    )
}

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
  border-radius: 8px;
`
const PostBody = styled.div`
  width: 244px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
`