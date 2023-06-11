import React, {useEffect, useState} from "react";
import {Text} from "../../../components/text";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AccessToken} from "../../Main";
import axios from "axios";
import {useQuery} from "react-query";
import {Colors} from "../../../styles/theme/color";
import {Button} from "../../../components/button/Button";
import Chapter, {chapterProps} from "../../../components/Chapter/Chapter";
import * as _ from '../../../components/Chapter/style';
import * as a from './LectureManageStyle';
import useChapterTimes from "../hooks/useChapterTimes";

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
    const [progress, setProgress] = useState<number>(100);
    const {data: detail, remove, refetch} = useQuery(['nigrongrong'], () => getLDetail(state.get('lectureId') ?? ''));
    const [state] = useSearchParams();
    const sNavigate = useNavigate();
    const {lNum, lTime, cNum, cTime, cAll} = useChapterTimes(detail, setChapter);
    console.log(lNum);

    useEffect(() => {
        console.log('change');
        if (detail && detail.lectureId !== state.get('lectureId')) {
            remove()
            refetch()
        }
    }, [detail]);

    useEffect(() => {
        if (detail && detail.chapters && lNum) {
            console.log('progress set!')
            let watched = 0;
            detail.chapters.map((v: chapterProps) => {
                v.videos?.map((v) => {
                    if (v.status === "COMPLETE") watched++;
                })
            })
            setProgress(100 - (watched / lNum * 100));
        }
    }, [lNum]);

    return (
        <>
            {detail ?
                <>
                    <a.TitleImg src={detail.lectureThumbnailUrl}/>
                    <a.LBody>
                        <a.TDiv>
                            <Text font="Title1">{detail.title}</Text>
                            <Text font="Body3">{detail.explanation}</Text>
                            <a.TagDiv>
                                {detail.tagNameList.map((dat: { name: string }, index: number) =>
                                    <Text color={Colors["FPrimary500"]} key={index}>#{dat.name}</Text>
                                )}
                            </a.TagDiv>
                        </a.TDiv>
                        {/*만약 선생님이라면 강의 상호작용 버튼 생성*/}
                        <a.EditDiv>
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
                        </a.EditDiv>
                        <_.Container>
                            <_.TitleGap>
                                <Text font="Body1">커리큘럼</Text>
                                <Text font="Body4" color={Colors["Gray500"]}>
                                    {lNum}강 • {lTime[0] !== 0 && `${lTime[0]}시간`} {lTime[1]}분
                                </Text>
                            </_.TitleGap>
                            <_.ChapterContainer>
                                <_.InContainer>
                                    {chapter && chapter.map((v, i) =>
                                        <a key={i} href={"#" + v.title}>
                                            <_.VideoContainer>
                                                <_.TitleGap>
                                                    <Text font="Body3">{`섹션 ${i + 1}. ${v.title}`}</Text>
                                                </_.TitleGap>
                                                <Text font="Body4" color={Colors["Gray500"]}>
                                                    {`${cNum[i]}강 • ${cTime[i][0] !== 0 ? (cTime[i][0] + "시간") : ""} ${cTime[i][1]}분`}
                                                </Text>
                                            </_.VideoContainer>
                                        </a>
                                    )}
                                </_.InContainer>
                            </_.ChapterContainer>
                        </_.Container>
                        <_.Container>
                            <_.TitleGap>
                                <Text font="Body1">수강 진행도</Text>
                                <Text font="Body1" gradient>{100 - Math.floor(progress)}%</Text>
                            </_.TitleGap>
                            <a.OutP><a.PBar><a.HideBar width={progress}></a.HideBar></a.PBar></a.OutP>
                        </_.Container>
                        {chapter && chapter.map((v: chapterProps, index) =>
                            <Chapter key={index} chapterId={v.chapterId} sequence={v.sequence} title={v.title} videos={v.videos} cTime={cAll[index]}/>
                        )}
                    </a.LBody>
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
