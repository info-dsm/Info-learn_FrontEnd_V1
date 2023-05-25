import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
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
    // currentTime: number;
    // currentSound: number;
    // speed: number;
    maxTime: number;
    lastVolume: number;
    // mute: false,
    isFull: boolean;
    isPnp: boolean;
    isClick: boolean;
    isMute: boolean;
    resume: number;
}

const DetailVideo = () => {
    const [v, setV] = useState<vType>({
        // currentTime: 0,
        // currentSound: 100,
        // speed: 1,
        maxTime: 0,
        lastVolume: 1,
        isMute: false,
        isFull: false,
        isPnp: false,
        isClick: false,
        resume: 0
    })
    const [chapter, setChapter] = useState<chapterProps[]>();
    const [show, setShow] = useState<boolean>(false);
    const [volumeHover, setVolumeHover] = useState<boolean>(false);
    const {data: detail, remove, refetch} = useQuery(['getLDetail'], () => getLDetail(state.get('lectureId') ?? ''));
    const {
        data: videoData,
        remove: removeVideo,
        refetch: reFetchVideo
    } = useQuery(['getVDetail'], () => getVDetail(Number(state.get('videoId') ?? 0)));
    const [state] = useSearchParams();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fullRef = useRef<HTMLDivElement | null>(null);
    const {cAll} = useChapterTimes(detail, setChapter);

    useEffect(() => {
        if (videoData?.videoUrl) {
            change("maxTime", videoData.hour * 3600 + videoData.minute * 60 + videoData.second);
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

    const changeVideo = (func: (video: HTMLVideoElement) => void) => {
        if (videoRef && videoRef.current) func(videoRef.current);
    }
    const zero = (data: number) => data < 10 ? `0${Math.floor(data)}` : `${Math.floor(data)}`;
    const time = (data: number, hour: number) => hour ? `${(data / 3600).toFixed()}:${zero(data / 60)}:${zero(data % 60)}` : `${zero(data / 60)}:${zero(data % 60)}`;
    const time2 = (hour: number, minute: number, second: number) => hour ? `${hour}:${zero(minute)}:${zero(second)}` : `${zero(minute)}:${zero(second)}`;
    const isPlaying = () => videoRef && videoRef.current && videoRef.current.currentTime > 0 && !videoRef.current?.paused && !videoRef.current?.ended;
    const getPlayTime = () => videoRef.current ? videoRef.current?.currentTime : 0;
    const resume = () => {
        change("resume", Date.now() + 1000);
        isPlaying() ? videoRef.current?.pause() : videoRef.current?.play();
    }
    const full = () => {
        if (v.isFull) document.exitFullscreen();
        else fullRef.current?.requestFullscreen();
        change("isFull", !v.isFull);
    }
    const isMuted = () => v.isMute || videoRef.current && (videoRef.current?.muted || !videoRef.current?.volume);
    const mute = () => {
        if(!isPlaying() || v.isMute) {
            changeVideo(video => video.muted = !v.isMute);
            change("isMute", !v.isMute);
        } else changeVideo(video => video.muted = !video.muted);
        if(isPlaying()) (document.getElementById('volume') as HTMLInputElement).value = `${getVolume()}`
    }
    const getVolume = () => !v.isClick && v.isMute || isMuted() ? 0 : videoRef.current?.volume ?? 1;

    document.onkeydown = (event) => {
        console.log(event.key);
        event.key === ' ' || event.key.toLowerCase() === 'k' ? resume() : undefined;
        event.key === 'ArrowLeft' ? changeVideo(video => video.currentTime += 5) : undefined;
        event.key === 'ArrowRight' ? changeVideo(video => video.currentTime += 5) : undefined;
        event.key.toLowerCase() === 'f' ? full() : undefined;
        event.key.toLowerCase() === 'm' ? mute() : undefined;
    }

    return (
        <Container>
            <VideoBox className="vd">
                <CDiv
                    ref={fullRef}
                    onMouseMove={() => setShow(true)}
                    onMouseLeave={() => {
                        setShow(false);
                        setVolumeHover(false);
                    }}
                >
                    <Video
                        muted={v.isMute}
                        onContextMenu={(e) => e.preventDefault()}
                        src={videoData?.videoUrl as string}
                        onEnded={() => videoData.status !== 'COMPLETE' && putVideoComplete(Number(state.get('videoId') ?? 0)).then(() => refetch())}
                        ref={videoRef}
                        onTimeUpdate={(e) => {
                            if (videoRef?.current?.readyState === 4)
                                change("currentTime", e.currentTarget.currentTime);
                        }}
                        onDoubleClick={full}
                        onClick={resume}
                    />
                    {v.resume > Date.now() ? <ShowIcon>
                        <Icon size={40} icon={!isPlaying() ? "yt-play" : "yt-pause"} color={"White"}/>
                    </ShowIcon> : undefined}
                    {show && <CustomVDiv>
                        <TimeBar
                            type="range"
                            value={v.isClick ? undefined : getPlayTime()}
                            onChange={(e) => changeVideo(video => video.currentTime = +e.target.value)}
                            min={0}
                            max={v.maxTime}
                            step={'any'}
                            // onMouseMove={update}
                            onMouseDown={() => {
                                change("isClick", true);
                                if (isPlaying()) videoRef.current?.pause();
                                console.log("down");
                            }}
                            onMouseUp={() => {
                                change("isClick", false);
                                if (!isPlaying()) videoRef.current?.play();
                                console.log("up");
                            }}
                        />
                        <IDiv>
                            <PDiv>
                                <IBtn><Icon icon="back" color="White"/></IBtn>
                                <IBtn
                                    onClick={resume}>
                                    <Icon icon={isPlaying() ? 'pause' : 'start'} color="White"/>
                                </IBtn>
                                <IBtn><Icon icon="front" color="White"/></IBtn>
                                <PDiv onMouseEnter={() => setVolumeHover(true)}>
                                    <IBtn onClick={mute}>
                                        <Icon
                                            icon={isMuted() ? 'nv' : videoRef.current && videoRef.current?.volume < 0.5 ? 'sv' : 'lv'}
                                            color="White"/>
                                    </IBtn>
                                    {volumeHover ? <VolumeBar
                                        id={'volume'}
                                        data={getVolume() * 100}
                                        type={"range"}
                                        value={isPlaying() ? undefined : isMuted() ? 0 : 1}
                                        defaultValue={videoRef.current?.volume}
                                        min={0}
                                        max={1}
                                        step={'any'}
                                        // onMouseDown={() => {
                                        //     change("isClick", true);
                                        // }}
                                        // onMouseUp={() => {
                                        //     change("isClick", false);
                                        // }}
                                        onChange={(e) => {
                                            changeVideo(video => video.volume = +e.target.value);
                                            e.target.style.background = `linear-gradient(to right, white ${getVolume() * 100}%, gray ${getVolume() * 100}%)`
                                        }}
                                    /> : undefined}
                                </PDiv>
                                {videoData && <Text color="White">
                                    {time(getPlayTime(), videoData.hour)} / {time2(videoData.hour, videoData.minute, videoData.second)}
                                </Text>}
                            </PDiv>
                            <PDiv>
                                <IBtn><Icon icon="pnp" color="White"/></IBtn>
                                <IBtn><Icon icon="setting2" color="White"/></IBtn>
                                <IBtn onClick={full}><Icon icon="full" color="White"/></IBtn>
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

const IconShow = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 100%;
  }
  80% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
`
const ShowIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${IconShow} 1.25s;
  padding: 6px;
  opacity: 0;
`
const VolumeShow = keyframes`
  0% {
    width: 15px;
  }
  100% {
    width: 70px;
  }
`
const VolumeBar = styled.input<{ data: number }>`
  width: 70px;
  height: 5px;
  margin-left: -10px;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  background: linear-gradient(to right, white ${props => props.data}%, gray ${props => props.data}%);
  animation: ${VolumeShow} 200ms ease-out;

  //input[type=range] {
  //  -webkit-appearance: none;
  //  overflow: hidden;
  //  width: 100%;
  //  height: 4px;
  //  cursor: pointer;
  //  border-radius: 0;
  //}

  &[type=range]:focus {
    outline: none;
  }

  &[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: none;
  }

  &[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    cursor: pointer;
    height: 14px;
    width: 14px;
    //backdrop-filter: blur(10px);
      //box-shadow: 1px 1px 10px ${Colors["Black"]};
    border-radius: 100%;
  }

  &[type=range]::-webkit-slider-thumb::before {
    content: '';
    width: 70px;
    height: 5px;
    background: white;
  }

  &[type=range]::-webkit-slider-thumb::after {
    content: '';
    width: 70px;
    height: 5px;
    background: rgba(255, 255, 255, .2);
  }
`
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
