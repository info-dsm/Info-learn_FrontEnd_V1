import React, {useState} from "react";
import styled, {keyframes} from "styled-components";
import {Text} from "../../components/text";
import Icon from "../../assets/Icon";
import {Colors} from "../../styles/theme/color";
import TextInput from "../../components/input/TextInput";
import Input from "../../components/input/Input";
import {Button} from "../../components/button/Button";
import toast from "react-hot-toast";

type ValueType = 'title' | 'explanation' | 'tag';

const LectureRegistration = () => {
    const [value, setValue] = useState<{
        [key in ValueType]: string
    }>({
        title: '',
        explanation: '',
        tag: ''
    });
    const [tag, setTag] = useState<string[]>([]);

    const tagAdd = () => {
        if (tag.every((data) => data !== value.tag)) {
            if(value.tag.trim() !== '') {
                setTag([
                    ...tag,
                    value.tag.replaceAll(' ', '')
                ]);
                toast.success(`'${value.tag.replaceAll(' ', '')}'태그가 등록되었습니다!`);
            }
            else return
        }
        else toast.error('태그가 중복됬습니다!');
        change('tag', '');
    }
    const change = (name: string, data: string): void => {
        setValue(value => {
            return {
                ...value,
                [name]: data
            }
        });
    }

    return (
        <Content>
            <TextDiv>
                <Text font="Title1" gradient={true}>강의 등록</Text>
                <Text font="Body2">강의를 등록해 주세요</Text>
            </TextDiv>
            <MainInfo>
                <Thumbnail>
                    <Icon icon="add"/>
                    <Text font="Body2">강의 썸네일</Text>
                </Thumbnail>
                <InputDiv>
                    <TextInput change={change} value={value.title} max={100} name="title" placeholder="강의 제목을 입력해 주세요" Title="강의 제목"/>
                    <TextInput change={change} value={value.explanation} max={100} name="explanation" placeholder="간단하고 명료한 강의 설명을 입력해 주세요" Title="강의 설명" textarea={true}/>
                </InputDiv>
            </MainInfo>
            <TagRDiv>
                <Text font="Body1">태그</Text>
                <TagInputDiv>
                    <Input name="tag" placeholder="태그를 입력해 주세요" value={value.tag} change={change} width="100%"/>
                    <Button width="12%" gray={true} onClick={() => tagAdd()}>태그 등록</Button>
                </TagInputDiv>
                <TagDiv>
                    {tag.map((value, index) =>
                        <Tag key={index}>
                            <Text font="Body2" color={Colors["FPrimary500"]}>#{value}</Text>
                            <Icon icon="close" size={16} color="FPrimary500" clicked={() =>
                                setTag(tag.filter((data, i) => i !== index))
                            }/>
                        </Tag>
                    )}
                </TagDiv>
            </TagRDiv>
        </Content>
    )
}

export default LectureRegistration

const TagInputDiv = styled.div`
  width: 100%;
  height: fit-content;
  gap: 10px;
  display: flex;
`
const AppearTag = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1.0);
  }
`
const Tag = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  display: flex;
  padding: 6px 12px;
  gap: 8px;
  animation: ${AppearTag} 0.4s ease;
  background-color: ${Colors["Gray100"]};

  svg {
    cursor: pointer;
  }
`
const TagDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
`
const TagRDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: 0.3s;
`
const Thumbnail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 120%;
  height: 1%;
  aspect-ratio: 16 / 9;
  background-color: ${Colors["Gray100"]};
  border-radius: 8px;
  transition: 0.3s;
`
const MainInfo = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  gap: 40px;
  @media only screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`
const TextDiv = styled.div`
  width: 148px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
`
const Content = styled.div`
  width: 1000px;
  padding: 80px 0;
  gap: 40px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`