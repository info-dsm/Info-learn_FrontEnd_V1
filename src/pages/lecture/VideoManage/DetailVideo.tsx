import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Chapter, {chapterProps} from "../../../components/Chapter/Chapter";
import axios from "axios";
import {AccessToken} from "../../Main";
import {getLDetail} from "../LectureManage/DetailLecture";
import {useQuery} from "react-query";
import {useSearchParams} from "react-router-dom";
import {Colors} from "../../../styles/theme/color";
import Icon from "../../../assets/Icon";
import {Text} from "../../../components/text";
import useChapterTimes from "../hooks/useChapterTimes";

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

interface vType {
    currentTime: number;
    isPaused: boolean;
    isFull: boolean;
    currentSound: number;
    isPnp: boolean;
    speed: number;
    maxTime: number;
}

const DetailVideo = () => {
    const [v, setV] = useState<vType>({
        currentTime: 0,
        currentSound: 100,
        maxTime: 0,
        speed: 1,
        isPaused: true,
        isFull: false,
        isPnp: false
    })
    const [chapter, setChapter] = useState<chapterProps[]>();
    const [show, setShow] = useState<boolean>(false);
    const {data: detail, remove, refetch} = useQuery(['nigrongrongrong'], () => getLDetail(state.get('lectureId') ?? ''));
    const {data: videoData, remove: removeVideo, refetch: reFetchVideo} = useQuery(['nigrongrongrongrong'], () => getVDetail(Number(state.get('videoId') ?? 0)));
    const [state] = useSearchParams();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const {cAll} = useChapterTimes(detail, setChapter);

    useEffect(() => {
        if (videoData?.videoUrl) {
            change("isPaused", true);
            change("maxTime", videoData.hour * 3600 + videoData.minute * 60 + videoData.second);
            console.log(videoRef.current?.currentTime)
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

    const change = (name: string, data: number | boolean): void => {
        setV(value => {
            return {
                ...value,
                [name]: data
            }
        });
    }

    return (
        <Container>
            <VideoBox className="vd">
                <CDiv
                    onMouseMove={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                >
                    <Video
                        onContextMenu={(e) => e.preventDefault()}
                        src={videoData?.videoUrl as string}
                        onEnded={() => videoData.status !== 'COMPLETE' && putVideoComplete(Number(state.get('videoId') ?? 0)).then(() => refetch())}
                        ref={videoRef}
                        onTimeUpdate={(e) => change("currentTime", e.currentTarget.currentTime)}
                        onClick={() => {
                            v.isPaused ? videoRef.current?.play() : videoRef.current?.pause();
                            change("isPaused", !v.isPaused);
                        }}
                    />
                    {show && <CustomVDiv>
                        <TimeBar
                            type="range"
                            value={v.currentTime * 10000 / v.maxTime}
                            onChange={(e) => change("currentTime", Number(e.target.value) * v.maxTime / 10000)}
                            max={10000}
                            onClick={()=>{if(videoRef.current?.currentTime) videoRef.current.currentTime = v.currentTime}}
                        />
                        <IDiv>
                            <PDiv>
                                <IBtn><Icon icon="back" color="White"/></IBtn>
                                <IBtn onClick={() => {
                                    v.isPaused ? videoRef.current?.play() : videoRef.current?.pause();
                                    change("isPaused", !v.isPaused);
                                }}>
                                    {v.isPaused ? <Icon icon="start" color="White"/> : <Icon icon="pause" color="White"/>}
                                </IBtn>
                                <IBtn><Icon icon="front" color="White"/></IBtn>
                                <IBtn><Icon icon="lv" color="White"/></IBtn>
                                {videoData && <Text color="White">
                                    {Math.floor(v.currentTime / 3600) !== 0 && Math.floor(v.currentTime / 3600) + ":"}
                                    {Math.floor(v.currentTime / 60) + ":" + Math.floor(v.currentTime % 60)
                                    } / {videoData.hour !== 0 && videoData + ":"}{videoData.minute}:{videoData.second}
                                </Text>}
                            </PDiv>
                            <PDiv>
                                <IBtn><Icon icon="pnp" color="White"/></IBtn>
                                <IBtn><Icon icon="setting2" color="White"/></IBtn>
                                <IBtn><Icon icon="full" color="White"/></IBtn>
                            </PDiv>
                        </IDiv>
                    </CustomVDiv>}
                </CDiv>
            </VideoBox>
            <ListBox className="lt">
                {
                    chapter?.map((v: chapterProps, i) =>
                        <Chapter key={v.chapterId} {...v} watching={Number(state.get('videoId') ?? 0)} cTime={cAll[i]}/>
                    )
                }
            </ListBox>
        </Container>
    )
}

export default DetailVideo;

const IBtn = styled.div`
  width: 24px !important;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PDiv = styled.div`
  width: fit-content !important;
  height: fit-content;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: start;
`
const IDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 12px;
`
const TimeBar = styled.input`
  input[type=range] {
    -webkit-appearance: none;
    overflow: hidden;
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 0;
  }

  &[type=range]:focus {
    outline: none;
  }

  &[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
  }

  &[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    height: 16px;
    width: 16px;
    box-shadow: 1px 1px 10px ${Colors["Black"]};
    border-radius: 100%;
  }
`
const CustomVDiv = styled.div`
  width: 100%;
  height: 120px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const CDiv = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  aspect-ratio: 16 / 9;
  position: relative;
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

const Video = styled.video`
  background-color: black;
  width: 100%;
  height: 100%;
`
