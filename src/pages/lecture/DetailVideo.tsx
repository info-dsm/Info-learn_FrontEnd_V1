import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Chapter from "../../components/Chapter/Chapter";
import axios from "axios";
import {AccessToken} from "../Main";
import {getLDetail} from "./DetailLecture";
import {useQuery} from "react-query";
import {useSearchParams} from "react-router-dom";

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

async function putVideoComplete(id: number) {
    if (id) {
        const putStatusRes = await axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/video/${id}/complete`,
            headers: {
                Authorization: `Bearer ${AccessToken}`
            }
        })
        return putStatusRes.data
    }
}

interface VideoType {
    videoId: number;
    title: string;
    hour: number;
    minute: number;
    second: number;
    sequence: number;
    status: string | null;
}

interface chapterProps {
    chapterId: number;
    title: string;
    sequence: number;
    videos?: VideoType[];
    watching?: number;
}

const DetailVideo = () => {
    const [chapter, setChapter] = useState<chapterProps[]>();
    const {data: detail, remove, refetch} = useQuery(['nigrongrongrong'], () => getLDetail(state.get('lectureId') ?? ''));
    const {data: videoData, remove: removeVideo, refetch: reFetchVideo} = useQuery(['nigrongrongrongrong'], () => getVDetail(Number(state.get('videoId') ?? 0)));
    const [state] = useSearchParams();
    // const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoData?.videoUrl) {
            console.log('video불러오고 ref됨')
        }
    }, [videoData])

    useEffect(() => {
        if (detail) {
            if (detail.lectureId !== state.get('lectureId')) {
                remove()
                refetch()
            }
            if (detail.chapters) {
                const cChapter = detail.chapters;
                cChapter.sort((a: chapterProps, b: chapterProps) => a.sequence - b.sequence);
                setChapter(cChapter);
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

    return (
        <Container>
            <VideoBox className="vd">
                <CDiv>
                    <Video
                    onContextMenu={(e) => e.preventDefault()}
                    controlsList="nodownload"
                    src={videoData?.videoUrl as string}
                    onEnded={() => videoData.status !== 'COMPLETE' && putVideoComplete(Number(state.get('videoId') ?? 0)).then(() => refetch())}></Video>
                    <CustomVDiv>
                        <TimeBar></TimeBar>
                    </CustomVDiv>
                </CDiv>
            </VideoBox>
            <ListBox className="lt">
                {
                    chapter?.map((v: chapterProps) =>
                        <Chapter key={v.chapterId} {...v} watching={Number(state.get('videoId') ?? 0)}/>
                    )
                }
            </ListBox>
        </Container>
    )
}

export default DetailVideo;

const TimeBar = styled.div`

`
const CDiv = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  aspect-ratio: 16 / 9;
  position: relative;
`
const CustomVDiv = styled.div`
  width: 100%;
  height: 60px;
  background-color: silver;
  position: absolute;
  bottom: 0;
`
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

const Video = styled.video.attrs({
    controls: true
})`
  background-color: black;
  width: 100%;
  height: 100%;
`
