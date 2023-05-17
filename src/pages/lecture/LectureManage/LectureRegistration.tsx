import React, {useEffect, useState} from "react";
import {Text} from "../../../components/text";
import Icon from "../../../assets/Icon";
import {Colors} from "../../../styles/theme/color";
import TextInput from "../../../components/input/TextInput";
import Input from "../../../components/input/Input";
import {Button} from "../../../components/button/Button";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../../components/Modal";
import {DeleteLecture, PostLecture, PutLecture} from "../api";
import {useMutation} from "react-query";
import {korTypeToEng} from "../../../K2E";
import * as _ from "./LectureManageStyle";

type ValueType = 'title' | 'explanation' | 'tag';
type modalType = 'cancel' | 'delete';

export const Reading = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | undefined>>, setImgUrl: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
    const fileReader = new FileReader();

    const selectedFile = (e.target.files as FileList)[0];
    if (selectedFile !== undefined) {
        fileReader.readAsDataURL(selectedFile);
        setFile(selectedFile);
    }

    fileReader.onload = () => {
        setImgUrl(fileReader.result);
    };
}

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

    useEffect(() => {
        if (state) {
            setValue({
                title: state.title,
                explanation: state.explanation,
                tag: ''
            });
            setTag(state.tagNameList.map((value: { name: string }) => value.name));
            setImgUrl(state.lectureThumbnailUrl);
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
    }, [])


    useEffect(() => {
        if (!isLoading && resData !== undefined) {
            console.log('enter navigate code!');
            const navTitle = value.title.replaceAll(" ", "_").trim();
            navigate(`/lecture/niger/${navTitle}`, {state: resData.lectureId});
        }
    }, [isLoading, resData]);

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
        } else toast.error('중복된 태그입니다!');
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

    const makeJson = () => {
        if (state) {
            console.log('edit clicked!')
            const titleRequest = state.title !== value.title ? {
                title: value.title,
                searchTitle: korTypeToEng(value.title)
            } : null;
            const explanationRequest = state.explanation !== value.explanation ? {
                explanation: value.explanation,
                searchExplanation: korTypeToEng(value.explanation)
            } : null;
            const titleJson = JSON.stringify({
                titleRequest,
                explanationRequest
            })
            const inputJson = JSON.stringify({
                fileName: inputFile?.name,
                contentType: inputFile?.type,
                fileSize: inputFile?.size
            })
            const stayList = state.tagNameList.filter((value: { name: string }) => tag.includes(value.name)).map((value: { name: string }) => value.name);
            const tagList = tag.filter((value: string) => !stayList.includes(value)).map((value: string) => ({"tagId": value}));
            const deleteList = state.tagNameList.filter((value: { name: string }) => !tag.includes(value.name)).map((value: { name: string }) => ({"tagId": value.name}));
            putLecture({titleJson, inputJson, inputFile, lectureId: state.lectureId, tagList, deleteList});
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
                deleteLecture(state.lectureId);
                setTimeout(() => navigate('/'), 1000);
            }}
        />}
            <_.Content>
                <_.TextDiv>
                    <Text font="Title1" gradient>강의 {isRegi}</Text>
                    <Text>강의를 {isRegi}해주세요</Text>
                </_.TextDiv>
                <_.MainInfo>
                    <_.Thumbnail>
                        <_.FileInput id="file" onChange={(e) => Reading(e, setFile, setImgUrl)} type="file"/>
                        <_.FileLabel htmlFor="file" url={imgUrl as string}>
                            <Icon icon="add"/>
                            <Text>강의 썸네일</Text>
                        </_.FileLabel>
                    </_.Thumbnail>
                    <_.InputDiv>
                        <TextInput width={"100%"} change={change} value={value.title} max={100} name="title" placeholder="강의 제목을 입력해주세요" Title="강의 제목"/>
                        <TextInput width={"100%"} change={change} value={value.explanation} max={100} name="explanation" placeholder="간단하고 명료한 강의 설명을 입력해주세요" Title="강의 설명" textarea/>
                    </_.InputDiv>
                </_.MainInfo>
                <_.TagRDiv>
                    <Text font="Body1">태그</Text>
                    <_.TagInputDiv>
                        <Input name="tag" placeholder="태그를 입력해주세요" value={value.tag} change={change} width="100%" keyDown={(e) =>
                            e.key === 'Enter' && !e.nativeEvent.isComposing && tagAdd()
                        }/>
                        <Button gray onClick={() => tagAdd()}>태그 등록</Button>
                    </_.TagInputDiv>
                    <_.TagDiv>
                        {tag.map((value, index) =>
                            <_.Tag key={index}>
                                <Text color={Colors["FPrimary500"]}>#{value}</Text>
                                <Icon icon="close" size={16} color="FPrimary500" clicked={() =>
                                    setTag(tag.filter((data, i) => i !== index))
                                }/>
                            </_.Tag>
                        )}
                    </_.TagDiv>
                </_.TagRDiv>
                <_.Sequence></_.Sequence>
                <_.RBack>
                    <_.RDiv flex={state ? "space-between" : "flex-end"}>
                        {state && <Button red onClick={() => setModal({...modal, delete: true})}>강의 삭제</Button>}
                        <div style={{display: "flex", gap: "10px"}}>
                            <Button gray onClick={() => setModal({...modal, cancel: true})}>취소</Button>
                            <Button blue onClick={() => {
                                value.title && value.explanation && tag && makeJson()
                            }}>강의 {isRegi}</Button>
                        </div>
                    </_.RDiv>
                </_.RBack>
            </_.Content>
        </>
    )
}

export default LectureRegistration
