import React, {useRef, useState} from "react";
import * as _ from "../LectureManage/LectureManageStyle";
import {Text} from "../../../components/text";
import Icon from "../../../assets/Icon";
import {Reading} from "../LectureManage/LectureRegistration";
import TextInput from "../../../components/input/TextInput";
import {useLocation, useNavigate} from "react-router-dom";
import BigDropDown from "../../../components/DropDown/Big";
import {Button} from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import GradientIcon from "../../../assets/GradientIcon";
import Modal from "../../../components/Modal";
import axios from "axios";
import {AccessToken} from "../../Main";
import {toast} from "react-hot-toast";
import {useQuery} from "react-query";
import {DeleteLecture} from "../api";

type ValueType = 'title' | 'chapter';
type modalType = 'cancel' | 'delete';

export interface arrProps {
    sequence: number;
    title: string;
}

interface chapterProps {
    chapterId: number;
    title: string;
    sequence: number;
}

export async function getChapter(lectureId: string) {
    if (lectureId) {
        const lecturesRes = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/chapter/${lectureId}`,
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })
        return lecturesRes.data
    }
}

const VideoRegistration = () => {
    const [value, setValue] = useState<{
        [key in ValueType]: string
    }>({
        title: '',
        chapter: ''
    });
    const [inputFile, setFile] = useState<File>();
    const [videoUrl, setVideoUrl] = useState<string | ArrayBuffer | null>('');
    const [chapterFocus, setChapterFocus] = useState<string>('강의 챕터 선택');
    const [isRegi, setIsRegi] = useState<string>('등록');
    const [modal, setModal] = useState<{ [key in modalType]: boolean }>({cancel: false, delete: false});
    const state = useLocation().state;
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const {data: chapter, refetch: chapterRefetch} = useQuery(['chapterGet'], () => getChapter(state.lectureId));

    console.log(state);

    const change = (name: string, data: string): void => {
        setValue(value => {
            return {
                ...value,
                [name]: data
            }
        });
    }

    const chapterAdd = () => {
        const sequenceJson = JSON.stringify({
            lectureId: state.lectureId,
            title: value.chapter,
            sequence: chapter.chapters.length + 1
        });
        const sequencePost = async () => {
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/chapter`,
                data: sequenceJson,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AccessToken}`
                }
            })
        }
        sequencePost().then(() => {
            toast.success(value.chapter + ' 챕터가 등록되었습니다!');
            setValue({...value, chapter: ''});
            chapterRefetch();
        });
    }

    const makeJson = () => {
        if (chapterFocus === '강의 챕터 선택') {
            toast.error('챕터를 선택해주세요!');
            return
        } else if (!value.title) {
            toast.error('영상 제목을 입력해주세요!');
            return
        } else if (!videoUrl) {
            toast.error('영상을 올려주세요!');
            return
        }
        const sequences = chapter.chapters.filter((v: chapterProps) => chapterFocus.slice(5,).trim() === v.title)
        console.log(sequences);
        const videoJson = JSON.stringify({
            title: value.title,
            playTime: videoRef.current?.duration,
            sequence: state.chapters[sequences[0].sequence - 1].videos.length + 1,
            videoUrl: {
                fileName: inputFile?.name,
                contentType: inputFile?.type,
                fileSize: inputFile?.size
            }
        });
        const videoPost = async () => {
            const s3Put = async ({url}: { url: string }) => {
                await axios({
                    method: 'PUT',
                    url: url,
                    data: inputFile,
                    headers: {
                        "Content-Type": inputFile?.type,
                        "Content-Disposition": "inline"
                    }
                }).then(() => {
                    console.log('s3 put 성공');
                }).catch((error) => {
                    console.log(error);
                })
            }
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/video/${sequences[0].chapterId}`,
                data: videoJson,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AccessToken}`
                }
            }).then((response) => {
                return s3Put({url: response.data.url})
            }).catch((error) => {
                console.log(error);
            })
        }
        videoPost().then(() => {
            toast.success('영상이 등록되었습니다!');
            navigate(-1);
        }).catch((error) => {
            toast.error(error);
        })
    }

    return (
        <>
            {modal.cancel && <Modal
                title={`영상 ${isRegi}을 그만둘까요?`}
                explanation="내용을 다시 작성해야 할 수도 있어요"
                right="그만두기"
                onLeft={() => setModal({...modal, cancel: false})}
                onRight={() => navigate(-1)}
            />}{modal.delete && <Modal
            title="영상을 정말 삭제하실건가요?"
            explanation="영상을 삭제하면 되돌릴 수 없어요."
            right="삭제하기"
            onLeft={() => setModal({...modal, delete: false})}
            onRight={() => {
                DeleteLecture(state.lectureId);
                setTimeout(() => navigate('/'), 1000);
            }}
        />}
            <_.Content>
                <_.TextDiv>
                    <Text font="Title1" gradient>강의 영상 등록</Text>
                    <Text>강의에 들어갈 영상들을 등록해주세요</Text>
                </_.TextDiv>
                <_.MainInfo>
                    <_.Thumbnail>
                        <_.FileInput id="file" onChange={(e) => Reading(e, setFile, setVideoUrl)} type="file"/>
                        <_.FileLabel htmlFor="file">
                            {!videoUrl && <>
                                <Icon icon="add"/>
                                <Text>강의 영상</Text>
                            </>}
                            {videoUrl && <_.Video controls ref={videoRef} src={videoUrl as string}/>}
                        </_.FileLabel>
                        {videoUrl && <_.RemoveDiv onClick={() => {
                            setVideoUrl('');
                            setFile(undefined);
                        }}><GradientIcon icon="close"/></_.RemoveDiv>}
                    </_.Thumbnail>
                    <_.InputDiv>
                        <TextInput width="100%" change={change} value={value.title} max={100} name="title" placeholder="강의 영상 제목을 입력해 주세요" Title="영상 제목"/>
                        <_.DropCoverDiv>
                            <Text>챕터</Text>
                            <BigDropDown change={setChapterFocus} value={chapterFocus} arr={chapter && chapter.chapters} width="100%" noneMsg="챕터가"/>
                        </_.DropCoverDiv>
                        <_.AddCDiv>
                            <Input width="100%" value={value.chapter} name="chapter" change={change} placeholder="추가 할 강의 챕터를 입력해주세요" keyDown={(e) =>
                                e.key === 'Enter' && !e.nativeEvent.isComposing && chapterAdd()
                            }/>
                            <Button blue onClick={() => value.chapter && chapterAdd()}>챕터 추가</Button>
                        </_.AddCDiv>
                    </_.InputDiv>
                </_.MainInfo>
                <_.RBack>
                    <_.RDiv flex={state.title ? "space-between" : "flex-end"}>
                        {state.title && <Button red onClick={() => setModal({...modal, delete: true})}>강의 삭제</Button>}
                        <div style={{display: "flex", gap: "10px"}}>
                            <Button gray onClick={() => setModal({...modal, cancel: true})}>취소</Button>
                            <Button blue onClick={() => makeJson()}>강의 {isRegi}</Button>
                        </div>
                    </_.RDiv>
                </_.RBack>
            </_.Content>
        </>
    )
}

export default VideoRegistration
