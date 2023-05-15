import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Text} from "../../components/text";
import Icon from "../../assets/Icon";
import {Colors} from "../../styles/theme/color";
import TextInput from "../../components/input/TextInput";
import Input from "../../components/input/Input";
import {Button} from "../../components/button/Button";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/Modal";
import {DeleteLecture, PostLecture, PutLecture} from "./api";
import {useMutation, useQuery} from "react-query";
import {getLectures} from "../Main";
import {getLDetail} from "./DetailLecture";
import {korTypeToEng} from "../../K2E";

type ValueType = 'title' | 'explanation' | 'tag';
type modalType = 'cancel' | 'delete';

const LectureRegistration = () => {
    const [value, setValue] = useState<{
        [key in ValueType]: string
    }>({
        title: '',
        explanation: '',
        tag: ''
    });
    const [tag, setTag] = useState<string[]>([]);
    const [modal, setModal] = useState<{ [key in modalType]: boolean }>({cancel: false, delete: false});
    const [inputFile, setFile] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>('');
    const [isRegi, setIsRegi] = useState<string>('등록');
    const {mutate: postLecture, data: resData, isLoading} = useMutation(['postLecture'], PostLecture);
    const {mutate: putLecture} = useMutation(['putLecture'], PutLecture);
    const {mutate: deleteLecture} = useMutation(['deleteLecture'], DeleteLecture);
    const {data: pathData, refetch: rePath} = useQuery(['path'], () => getLectures(1));
    const {data: editData} = useQuery(['Edit'], () => getLDetail(state));

    useEffect(() => {
        if (editData) {
            setValue({
                title: editData.title,
                explanation: editData.explanation,
                tag: ''
            });
            setTag(editData.tagNameList.map((value: { name: string }) => value.name));
            setImgUrl(editData.lectureThumbnailUrl);
            setIsRegi('수정');
        } else {
            setValue({
                title: '',
                explanation: '',
                tag: ''
            });
            setTag([]);
            setImgUrl(null);
            setFile(undefined);
            setIsRegi('등록');
        }
    }, [editData])

    useEffect(() => {
        rePath;
        if (!isLoading && resData && pathData[0] !== undefined) {
            console.log('enter navigate code!');
            const {title, createdBy} = pathData[0];
            const navTitle = title.replaceAll(" ", "_").trim();
            navigate(`/lecture/${createdBy}/${navTitle}`, {state: resData.lectureId});
        }
    }, [isLoading, resData, pathData]);

    const navigate = useNavigate();
    const state = useLocation().state;

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
        if (editData) {
            console.log('edit clicked!')
            const titleJson = JSON.stringify({
                titleRequest: {
                    title: value.title,
                    searchTitle: korTypeToEng(value.title)
                },
                explanationRequest: {
                    explanation: value.explanation,
                    searchExplanation: korTypeToEng(value.explanation)
                }
            })
            const inputJson = JSON.stringify({
                fileName: inputFile?.name,
                contentType: inputFile?.type,
                fileSize: inputFile?.size
            })
            const tagList = tag;
            const deleteList: string[] = editData.tagNameList.filter((value: { name: string }) => !tag.includes(value.name)).map((value: { name: string }) => value.name);
            putLecture({titleJson, inputJson, inputFile, lectureId: state, tagList, deleteList});
            setTimeout(() => navigate(-1), 1000);
        } else {
            const postJson = JSON.stringify({
                title: value.title,
                explanation: value.explanation,
                searchTitle: korTypeToEng(value.title),
                searchExplanation: korTypeToEng(value.explanation),
                tagNameList: tag,
                lectureThumbnail: {
                    fileName: inputFile?.name,
                    contentType: inputFile?.type,
                    fileSize: inputFile?.size
                }
            });
            inputFile && postLecture({postJson, inputFile});
            if (isLoading) console.log('lecture post loading....');
        }
    }

    return (
        <>
            {modal.cancel && <Modal
                title={`강의 ${isRegi}을 그만둘까요?`}
                explanation="내용을 다시 작성해야 할 수도 있어요"
                right="그만두기"
                onLeft={() => setModal({...modal, cancel: false})}
                onRight={() => navigate(-1)}
            />}{modal.delete && <Modal
            title="강의를 정말 삭제하실건가요?"
            explanation="강의를 삭제하면 되돌릴 수 없어요."
            right="삭제하기"
            onLeft={() => setModal({...modal, delete: false})}
            onRight={() => {
                deleteLecture(state);
                setTimeout(() => navigate('/'), 1000);
            }}
        />}
            <Content>
                <TextDiv>
                    <Text font="Title1" gradient>강의 {isRegi}</Text>
                    <Text font="Body2">강의를 {isRegi}해주세요</Text>
                </TextDiv>
                <MainInfo>
                    <Thumbnail>
                        <FileInput id="file" onChange={Reading} type="file"/>
                        <FileLabel htmlFor="file" url={imgUrl as string}>
                            <Icon icon="add"/>
                            <Text font="Body2">강의 썸네일</Text>
                        </FileLabel>
                    </Thumbnail>
                    <InputDiv>
                        <TextInput width={"100%"} change={change} value={value.title} max={100} name="title" placeholder="강의 제목을 입력해 주세요" Title="강의 제목"/>
                        <TextInput width={"100%"} change={change} value={value.explanation} max={100} name="explanation" placeholder="간단하고 명료한 강의 설명을 입력해 주세요" Title="강의 설명" textarea/>
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
                <RDiv flex={editData ? "space-between" : "flex-end"}>
                    {editData && <Button red onClick={() => setModal({...modal, delete: true})}>강의 삭제</Button>}
                    <div style={{display: "flex", gap: "10px"}}>
                        <Button gray onClick={() => setModal({...modal, cancel: true})}>취소</Button>
                        <Button blue onClick={() => {
                            value.title && value.explanation && tag && makeJson()
                        }}>강의 {isRegi}</Button>
                    </div>
                </RDiv>
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
  background-image: url(${props => props.url ?? "none"});
  border-radius: 8px;
  background-size: cover;
  background-position: center center;

  svg, p {
    display: ${props => props.url ? 'none' : 'block'};
  }
`
const FileInput = styled.input`
  display: none;
`
const RDiv = styled.div<{ flex: string }>`
  width: 100%;
  height: fit-content;
  padding: 80px 0 40px;
  display: flex;
  justify-content: ${props => props.flex};
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
  gap: 10px;
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