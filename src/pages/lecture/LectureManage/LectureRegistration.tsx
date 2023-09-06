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
import {DeleteLecture, DeleteVideo, PostLecture, PutLecture} from "../api";
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
            setTag(state.tag_name_list.map((value: { name: string }) => value.name));
            setImgUrl(state.lecture_thumbnail_url);
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
            navigate(`/lecture/detail?lectureId=${resData.lecture_id}`);
        }
    }, [isLoading, resData]);

    const navigate = useNavigate();
    const state = useLocation().state;

    const tagAdd = () => {
        const checkTag = value.tag.replaceAll(' ', '').trim();
        if (checkTag === '') return
        if (tag.every((data) => data !== checkTag)) {
            if (tag.length >= 10) {
                toast.error('태그는 최대 10개까지만 추가할 수 있습니다!');
                change('tag', '');
                return
            } else {
                setTag([
                    ...tag,
                    checkTag
                ]);
                toast.success(`'${value.tag.replaceAll(' ', '')}'태그가 등록되었습니다!`);
            }
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
            const title_request = state.title !== value.title ? {
                title: value.title,
                search_title: korTypeToEng(value.title)
            } : null;
            const explanation_request = state.explanation !== value.explanation ? {
                explanation: value.explanation,
                search_explanation: korTypeToEng(value.explanation)
            } : null;
            const titleJson = JSON.stringify({
                title_request,
                explanation_request
            })
            const inputJson = JSON.stringify({
                file_name: inputFile?.name,
                content_type: inputFile?.type,
                file_size: inputFile?.size
            })
            const stayList = state.tag_name_list.filter((value: { name: string }) => tag.includes(value.name)).map((value: { name: string }) => value.name);
            const tagList = tag.filter((value: string) => !stayList.includes(value)).map((value: string) => ({"tag_id": value}));
            const deleteList = state.tag_name_list.filter((value: { name: string }) => !tag.includes(value.name)).map((value: { name: string }) => ({"tag_id": value.name}));
            putLecture({titleJson, inputJson, inputFile, lectureId: state.lecture_id, tagList, deleteList});
            setTimeout(() => navigate(-1), 1000);
        } else {
            const postJson = JSON.stringify({
                title: value.title,
                explanation: value.explanation,
                search_title: korTypeToEng(value.title),
                search_explanation: korTypeToEng(value.explanation),
                tag_name_list: tag,
                lecture_thumbnail: {
                    file_name: inputFile?.name,
                    content_type: inputFile?.type,
                    file_size: inputFile?.size
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
                deleteLecture(state.lecture_id);
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
                    <_.TagDivs>
                        {tag.map((value, index) =>
                            <_.Tag key={index}>
                                <Text color={Colors["FPrimary500"]}>#{value}</Text>
                                <Icon icon="close" size={16} color="FPrimary500" clicked={() =>
                                    setTag(tag.filter((data, i) => i !== index))
                                }/>
                            </_.Tag>
                        )}
                    </_.TagDivs>
                </_.TagRDiv>
                {state && state.chapters && state.chapters.map((value: chapterProps, index: number) =>
                    <_.Sequence key={index}>
                        <Text font="Body1">섹션 {value.sequence}. {value.title}</Text>
                        <_.VideoList>
                            <_.VLChild>
                                {value.videos[0] ? value.videos.map((v, index) =>
                                    <_.VCell key={index}>{v.title}
                                        <_.IDiv>
                                            <_.IcoBtn>
                                                <Icon icon="pencil" size={16} clicked={() => navigate('/lecture/videoRegistration', {
                                                    state: {
                                                        lectureId: state.lecture_id,
                                                        chapters: state.chapters,
                                                        editChapter: value.title,
                                                        editVideo: v
                                                    }
                                                })}/>
                                            </_.IcoBtn>
                                            <_.IcoBtn>
                                                <Icon icon="trash" size={16} clicked={() => DeleteVideo(v.video_id)}/>
                                            </_.IcoBtn>
                                        </_.IDiv>
                                    </_.VCell>
                                ) : <_.VCell>아직 강의 영상이 없어요</_.VCell>}
                            </_.VLChild>
                        </_.VideoList>
                        <Button gray>강의 영상 등록</Button>
                    </_.Sequence>
                )}
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
