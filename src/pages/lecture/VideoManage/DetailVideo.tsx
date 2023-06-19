import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Chapter, {chapterProps, videosType} from "../../../components/Chapter/Chapter";
import axios from "axios";
import {AccessToken} from "../../Main";
import {getLDetail} from "../LectureManage/DetailLecture";
import {useQuery} from "react-query";
import {useSearchParams} from "react-router-dom";
import useChapterTimes from "../hooks/useChapterTimes";
import useChapterSort from "../hooks/useChapterSort";
import CustomVideo from "./CustomVideoManage/CustomVideo";

async function getVDetail(id: number) {
    if (id) {
        const VideoRes = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/video/${id}`,
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })
        return VideoRes.data
    }
}

const DetailVideo = () => {
    const [chapter, setChapter] = useState<chapterProps[]>();
    const {data: detail, remove, refetch} = useQuery(['getLDetail', 'lectureId'], () => getLDetail(state.get('lectureId') ?? ''));
    const {
        data: videoData,
        remove: removeVideo,
        refetch: reFetchVideo
    } = useQuery(['getVDetail'], () => getVDetail(Number(videoId ?? 0)));
    const [state] = useSearchParams();
    const {cAll} = useChapterTimes(detail, setChapter);
    const videoId = state.get('videoId');

    useEffect(() => {
        if (detail) {
            if (detail.lectureId !== state.get('lectureId')) {
                remove()
                refetch()
            }
            if (detail.chapters) {
                const {sorted} = useChapterSort(detail.chapters);
                setChapter(sorted);
            }
        }
        if (videoData) {
            if (detail && detail.lectureId !== state.get('lectureId')) {
                remove()
                refetch()
            }
            removeVideo()
            reFetchVideo()
        }
    }, [detail, state]);

    const idList = chapter?.flatMap((v: chapterProps) => v.videos?.map((c: videosType) => c.videoId));
    console.log(idList);

    return (
        <Container>
            <VideoBox className="vd">
                <CustomVideo videoData={videoData} videoId={Number(videoId)} idList={idList}/>
            </VideoBox>
            <ListBox className="lt">
                {chapter?.map((v: chapterProps, i) =>
                    <Chapter key={v.chapterId} {...v} watching={Number(state.get('videoId') ?? 0)} cTime={cAll[i]}/>
                )}
            </ListBox>
        </Container>
    )
}

export default DetailVideo;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1080px) {
    flex-direction: column;
    div {
      width: 100%;
      overflow: hidden;
    }

    .vd {
      padding: 0;
      width: 94%;
    }

    .lt {
      padding: 40px 0;
      width: 94%;
    }

    height: fit-content;
    padding: 40px 0 120px;
  }
`
const VideoBox = styled.div`
  width: 77%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
`
const ListBox = styled.div`
  width: 23%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 40px;
  overflow-y: scroll;
`
