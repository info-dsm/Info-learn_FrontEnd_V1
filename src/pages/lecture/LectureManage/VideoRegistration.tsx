import React, {useEffect, useState} from "react";
import * as _ from "./LectureManageStyle";
import {Text} from "../../../components/text";
import Icon from "../../../assets/Icon";
import {Reading} from "./LectureRegistration";
import TextInput from "../../../components/input/TextInput";
import {useLocation} from "react-router-dom";
import BigDropDown from "../../../components/DropDown/Big";
import {Button} from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import GradientIcon from "../../../assets/GradientIcon";

type ValueType = 'title' | 'chapter';

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
    const [chapterArray, setChapterArray] = useState<string[]>([]);
    const [isCAdd, setIsCAdd] = useState<boolean>(false);
    const state = useLocation().state;
    useEffect(() => {
        state.chapters.map((value: { title: string }) => setChapterArray([...chapterArray, value.title]));
    }, [])

    const change = (name: string, data: string): void => {
        setValue(value => {
            return {
                ...value,
                [name]: data
            }
        });
    }
    return (
        <>
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
                            {videoUrl && <_.Video controls src={videoUrl as string}/>}
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
                            <BigDropDown change={setChapterFocus} value={"강의 챕터 선택"} arr={chapterArray} width="100%" noneMsg="챕터가"/>
                        </_.DropCoverDiv>
                        {!isCAdd && <Button gray font="Body1" onClick={() => setIsCAdd(true)}>강의 챕터 추가</Button>}
                        {isCAdd && <_.AddCDiv>
                            <Input width="100%" value={value.chapter} name="chapter" change={change} placeholder="추가 할 강의 챕터를 입력해주세요"/>
                            <Button blue>챕터 추가</Button>
                        </_.AddCDiv>}
                    </_.InputDiv>
                </_.MainInfo>
            </_.Content>
        </>
    )
}

export default VideoRegistration
