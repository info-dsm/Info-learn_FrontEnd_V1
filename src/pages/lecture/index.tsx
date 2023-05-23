import React, {useState} from "react";
import styled from "styled-components";
import {Text} from "../../components/text";
import * as _ from "../MainStyle";
import HeadImg from "../../assets/img/BackgroundImg.jpg";
import {Colors} from "../../styles/theme/color";
import {Button} from "../../components/button/Button";
import InfinityScroll from "./InfinityScroll";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {GetTags} from "./api";

const LectureAll = () => {
    const {data: tags} = useQuery(['getTag'], () => GetTags());
    const [selected, setSelected] = useState<string[]>([]);

    const selectTag = (tag: string) => {
        const pre = [...selected];
        if(pre.indexOf(tag) !== -1) {
            setSelected(pre.filter(value => value !== tag));
        } else {
            pre.push(tag);
            setSelected(pre);
        }
    }

    const clearTag = () => {
        setSelected([]);
    }

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
                <TagDiv>
                    <Tag selected={selected.length === 0} onClick={() => clearTag()}>
                        <Text color={selected.length === 0 ? 'white' : undefined} font={"Body3"}>전체</Text>
                    </Tag>
                    {tags && tags?.tags?.map((value: any, index: React.Key | null | undefined) =>
                        <Tag selected={selected.indexOf(value.name) !== -1} key={index} onClick={() => selectTag(value.name)}>
                            <Text color={selected.indexOf(value.name) !== -1 ? 'white' : undefined} font="Body3">{value.name}</Text>
                        </Tag>
                    )}
                </TagDiv>
                <InfinityScroll tags={selected}/>
            </ContentDiv>
        </>
    )
}

export default LectureAll

const Tag = styled.button<{selected: boolean}>`
  width: fit-content;
  height: fit-content;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: ${props => props.selected ? `linear-gradient(90deg, #0080FF 0%, #B800FF 100%)}` : `white`};
`
const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  margin-bottom: 40px;
`
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
