import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Text} from "../../components/text";
import {useLocation, useNavigate} from "react-router-dom";
import {AccessToken} from "../Main";
import axios from "axios";
import {useQuery} from "react-query";
import {Colors} from "../../styles/theme/color";
import {Button} from "../../components/button/Button";
import Chapter from "../../components/Chapter/Chapter";

interface chapterProps {
    chapterId: number;
    title: string;
    sequence: number;
    videos: { videoId: number, title: string, hour: number, minute: number, second: number, sequence: number, status: string | null }[];
}

export async function getLDetail(state: string) {
    if (state) {
        const lecturesRes = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${state}`,
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })
        return lecturesRes.data
    }
}

const DetailLecture = () => {
    const [chapter, setChapter] = useState<chapterProps[]>();
    const {data: detail, remove, refetch} = useQuery(['nigrongrong'], () => getLDetail(state.get('lectureId') ?? ''));
    const [state] = useSearchParams();
    const sNavigate = useNavigate();

    useEffect(() => {
        if (detail && detail.lectureId !== state) {
            remove()
            refetch()
        }
        if (detail && detail.chapters) {
            const cChapter = detail.chapters;
            cChapter.sort((a: chapterProps, b: chapterProps) => a.sequence - b.sequence);
            setChapter(cChapter);
        }
    }, [detail]);

    return (
        <>
            {detail ?
                <>
                    <TitleImg src={detail.lectureThumbnailUrl}/>
                    <LBody>
                        <TDiv>
                            <Text font="Title1">{detail.title}</Text>
                            <Text font="Body3">{detail.explanation}</Text>
                            <TagDiv>
                                {detail.tagNameList.map((dat: { name: string }, index: number) =>
                                    <Text color={Colors["FPrimary500"]} key={index}>#{dat.name}</Text>
                                )}
                            </TagDiv>
                        </TDiv>
                        {/*만약 선생님이라면 강의 상호작용 버튼 생성*/}
                        <EditDiv>
                            <Button gray onClick={() => sNavigate('/lecture/registration', {
                                state: {
                                    lectureId: detail.lectureId,
                                    title: detail.title,
                                    explanation: detail.explanation,
                                    lectureThumbnailUrl: detail.lectureThumbnailUrl,
                                    tagNameList: detail.tagNameList,
                                    chapters: chapter
                                }
                            })}>강의 수정</Button>
                            <Button blue onClick={() => sNavigate('/lecture/videoRegistration', {
                                state: {
                                    lectureId: detail.lectureId,
                                    chapters: chapter
                                }
                            })}>강의 영상 등록</Button>
                        </EditDiv>
                        {chapter && chapter.map((v: chapterProps, index) =>
                            <Chapter key={index} chapterId={v.chapterId} sequence={v.sequence} title={v.title} videos={v.videos}/>
                        )}
                    </LBody>
                </> :
                <>
                    <div style={{width: "100%", height: "460px"}}></div>
                    <div style={{width: "1000px", height: "fit-content", display: "flex", flexDirection: "column", gap: "120px"}}>
                        <div style={{width: "100%", height: "fit-content", display: "flex", flexDirection: "column", gap: "20px"}}>
                            <div style={{height: "48px", width: "40%", backgroundColor: "white"}}></div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DetailLecture

const EditDiv = styled.div`
  display: flex;
  gap: 10px;
`
const TagDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`
const TDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const LBody = styled.div`
  width: 1000px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 120px;

  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const TitleImg = styled.div<{ src: string }>`
  height: 460px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(180deg, rgba(242, 246, 248, 0) 50%, #F2F6F8 100%), url(${props => props.src});
`
