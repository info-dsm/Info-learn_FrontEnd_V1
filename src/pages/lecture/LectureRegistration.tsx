import React, {useState} from "react";
import styled, {keyframes} from "styled-components";
import {Text} from "../../components/text";
import Icon from "../../assets/Icon";
import {Colors} from "../../styles/theme/color";
import TextInput from "../../components/input/TextInput";
import Input from "../../components/input/Input";
import {Button} from "../../components/button/Button";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/Modal";
import {korTypeToEng} from "../../K2E";
import {PostLecture} from "./api";
import {useMutation} from "react-query";

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
    const [modal, setModal] = useState<boolean>(false);
    const [inputFile, setFile] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>('');
    const {mutate: postLecture} = useMutation(['postLecture'], PostLecture);

    const navigate = useNavigate();

    const tagAdd = () => {
        if (tag.every((data) => data !== value.tag)) {
            if (value.tag.trim() !== '') {
                setTag([
                    ...tag,
                    value.tag.replaceAll(' ', '')
                ]);
                toast.success(`'${value.tag.replaceAll(' ', '')}'태그가 등록되었습니다!`);
            } else return
        } else toast.error('태그가 중복됬습니다!');
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

    const Reading = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();

        const selectedFile = (e.target.files as FileList)[0];
        if (selectedFile !== null) {
            fileReader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        }

        fileReader.onload = () => {
            setImgUrl(fileReader.result);
        };
    }

    const makeJson = () => {
        const postJson = JSON.stringify({
            title: value.title,
            explanation: value.explanation,
            searchTitle: korTypeToEng(value.title),
            searchExplanation: korTypeToEng(value.explanation),
            tagNameList: tag,
            lectureThumbnail: {
                // fileName: ,
                contentType: "image/png"
            }
        });
    }

    return (
        <>
            {modal && <Modal
                title="강의 등록을 그만둘까요?"
                explanation="내용을 다시 작성해야 할 수도 있어요"
                right="그만두기"
                onLeft={() => setModal(false)}
                onRight={() => navigate(-1)}
            />}
            <Content>
                <TextDiv>
                    <Text font="Title1" gradient>강의 등록</Text>
                    <Text font="Body2">강의를 등록해 주세요</Text>
                </TextDiv>
                <MainInfo>
                    <Thumbnail>
                        <FileInput id="file" onChange={Reading} type="file"/>
                        <FileLabel htmlFor="file" url="">
                            <Icon icon="add"/>
                            <Text font="Body2">강의 썸네일</Text>
                        </FileLabel>
                    </Thumbnail>
                    <InputDiv>
                        <TextInput change={change} value={value.title} max={100} name="title" placeholder="강의 제목을 입력해 주세요" Title="강의 제목"/>
                        <TextInput change={change} value={value.explanation} max={100} name="explanation" placeholder="간단하고 명료한 강의 설명을 입력해 주세요" Title="강의 설명" textarea/>
                    </InputDiv>
                </MainInfo>
                <TagRDiv>
                    <Text font="Body1">태그</Text>
                    <TagInputDiv>
                        <Input name="tag" placeholder="태그를 입력해 주세요" value={value.tag} change={change} width="100%"/>
                        <Button width="12%" gray onClick={() => tagAdd()}>태그 등록</Button>
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
                <RDiv>
                    <Button gray onClick={() => setModal(true)}>취소</Button>
                    <Button blue onClick={() => {
                        value.title && value.explanation && tag && makeJson()
                    }}>강의 등록</Button>
                </RDiv>
                <button onClick={() => {
                    inputFile && postLecture({inputFile});
                }}>강의 POST test버튼
                </button>
            </Content>
        </>
    )
}

export default LectureRegistration

const FileLabel = styled.label<{ url: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-image: ${props => props.url ?? "none"};

  svg, p {
    display: ${props => props.url ? 'none' : 'block'};
  }
`
const FileInput = styled.input`
  display: none;
`
const RDiv = styled.div`
  width: 100%;
  height: fit-content;
  padding: 80px 0 40px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`
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