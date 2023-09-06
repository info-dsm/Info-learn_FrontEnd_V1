import React, {useEffect, useRef, useState} from "react";
import Icon from "../../../../assets/Icon";
import {Text} from "../../../../components/text";
import {AccessToken} from "../../../Main";
import axios from "axios";
import * as _ from "./CVStyle";
import CenterIcon from "./CenterIcon";
import {Colors} from "../../../../styles/theme/color";
import CSetting from "./CSetting";
import {useNavigate, useSearchParams} from "react-router-dom";

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

export let movementTime = 0;

const CustomVideo = ({videoData, videoId, idList}: { videoData: vDataProps, videoId: number | null, idList?: (number | undefined)[] | undefined }) => {
    const [v, setV] = useState<vType>({
        maxTime: 0,
        lastVolume: 1,
        isFull: false,
        isPnp: false,
        isClick: false,
        resume: 0,
        speed: {
            count: 0,
            before: 0,
            news: 0
        },
        shown: false,
    })
    const [sOpen, setSOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [volumeHover, setVolumeHover] = useState<boolean>(false);
    const [sClick, setSClick] = useState<boolean>(false);
    const [sStatus, setSStatus] = useState<number>(1);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fullRef = useRef<HTMLDivElement | null>(null);
    const {count, before, news} = v.speed;
    const vNavigate = useNavigate();
    const [state] = useSearchParams();

    useEffect(() => {
        spd(video => video.playbackRate = sStatus);
    }, [sStatus])

    useEffect(() => {
        if (videoData?.video_url) {
            change("maxTime", videoData.hour * 3600 + videoData.minute * 60 + videoData.second);
        }
    }, [videoData])

    const change = (name: string, data: vSpeed | number | boolean): void => {
        setV(value => ({
            ...value,
            [name]: data
        }));
    }

    const changeVideo = (func: (video: HTMLVideoElement) => void) => {
        if (videoRef && videoRef.current) func(videoRef.current);
    }
    const f = (data: number) => data < 10 ? '0' + Math.floor(data) : Math.floor(data);
    const time = (data: number, hour: number) => (hour ? `${(data / 3600).toFixed()}:` : '') + `${f(data / 60)}:${f(data % 60)}`;
    const time2 = (hour: number, minute: number, second: number) => (hour ? `${hour}:` : '') + `${f(minute)}:${f(second)}`;
    const isPlaying = () => videoRef && videoRef.current && videoRef.current.currentTime > 0 && !videoRef.current?.paused && !videoRef.current?.ended;
    const getPlayTime = () => videoRef.current ? videoRef.current?.currentTime : 0;
    const resume = () => {
        change('resume', v.resume + 1);
        showVideo();
        isPlaying() ? videoRef.current?.pause() : videoRef.current?.play();
        movement();
    }
    const full = () => {
        v.isFull ? document.exitFullscreen() : fullRef.current?.requestFullscreen();
        change("isFull", !v.isFull);
    }
    const isMuted = () => !getVolume();
    const mute = () => {
        changeVideo(video => {
            if (video.volume) {
                change("lastVolume", video.volume);
                video.volume = +!video.volume;
            } else {
                change("lastVolume", 0);
                video.volume = v.lastVolume;
            }
        });
        const volume = document.getElementById('volume') as HTMLInputElement;
        volume.value = `${getVolume()}`
        volume.style.background = `linear-gradient(to right, white ${getVolume() * 100}%, gray ${getVolume() * 100}%)`
    }
    const getVolume = () => videoRef.current?.volume ?? 1;
    const movement = () => {
        movementTime = Date.now() + 3000;
        setTimeout(() => movementTime <= Date.now() ? hideVideo() : undefined, 3000);
    }
    const hideVideo = () => {
        if (!isPlaying()) return;
        change('shown', true);
        setTimeout(() => {
            setShow(false);
            setSClick(false);
            setSOpen(false);
        }, 500);
    }
    const showVideo = () => {
        if (!isPlaying()) return;
        change('shown', false);
        setShow(true);
    }
    const spd = (func: (video: HTMLVideoElement) => number) => {
        changeVideo(video => {
            const data = func(video);
            change("speed", {
                count: v.speed.count + 1,
                before: video.playbackRate,
                news: data
            });
            video.playbackRate = data;
        })
    }

    const currentIdx = () => idList?.findIndex((v) => v === videoId);
    const beforeVideo = () => {
        const c = currentIdx();
        if (c && c > 0) {
            vNavigate({
                pathname: "/video/about",
                search: `?lectureId=${state.get('lectureId')}&videoId=${(idList && idList[c - 1])}`,
            })
        }
    }
    const afterVideo = () => {
        const c = currentIdx();
        if (c && idList && c < idList?.length - 1 || (idList && c === 0 && idList?.length > 1)) {
            vNavigate({
                pathname: "/video/about",
                search: `?lectureId=${state.get('lectureId')}&videoId=${(idList && idList[c + 1])}`,
            })
        }
    }

    document.onkeydown = (event) => {
        if (/^\+?\d+$/.test(event.key)) changeVideo(video => video.currentTime = v.maxTime * (+event.key / 10));
        else if (event.key === ' ' || event.key.toLowerCase() === 'k') resume();
        else if (event.key === 'ArrowLeft') changeVideo(video => video.currentTime -= 5);
        else if (event.key === 'ArrowRight') changeVideo(video => video.currentTime += 5);
        else if (event.key.toLowerCase() === 'j') changeVideo(video => video.currentTime = Math.max(0, video.currentTime - 10));
        else if (event.key.toLowerCase() === 'l') changeVideo(video => video.currentTime = Math.min(v.maxTime, video.currentTime + 10));
        else if (event.key === '<') sStatus - 0.25 <= 0 ? setSStatus(0.25) : setSStatus(prev => prev - 0.25);
        else if (event.key === '>') sStatus + 0.25 >= 16 ? setSStatus(16) : setSStatus(prev => prev + 0.25);
        else if (event.key.toLowerCase() === 'f') full();
        else if (event.key.toLowerCase() === 'm') mute();
    }

    return (
        <_.CDiv
            ref={fullRef}
            onMouseMove={() => {
                showVideo();
                movement();
            }}
            onMouseLeave={() => {
                hideVideo();
                setVolumeHover(false);
            }}
        >
            <_.Video
                onContextMenu={(e) => e.preventDefault()}
                src={videoData?.video_url as string}
                onEnded={() => videoData.status !== 'COMPLETE' && putVideoComplete(Number(videoId ?? 0))}
                ref={videoRef}
                onTimeUpdate={(e) => {
                    if (videoRef?.current?.readyState === 4)
                        change("currentTime", e.currentTarget.currentTime);
                }}
                onDoubleClick={full}
                onClick={resume}
            />
            {count % 2 || count !== 0 ? <_.ShowSpeed key={count}>x{news}</_.ShowSpeed> : undefined}
            {news > before ? <CenterIcon iKey={v.speed.news} icon="spd-up"/> : news < before ? <CenterIcon iKey={news} icon="spd-down"/> : undefined}
            {v.resume % 2 ? <CenterIcon iKey={v.resume} icon="yt-pause"/> : v.resume !== 0 ? <CenterIcon iKey={v.resume} icon="yt-play"/> : undefined}
            {(!isPlaying() || show) && <_.CustomVDiv fade={!!isPlaying() && v.shown}>
                <_.TimeBar
                    type="range"
                    value={getPlayTime()}
                    onChange={(e) => changeVideo(video => video.currentTime = +e.target.value)}
                    min={0}
                    max={v.maxTime}
                    step={'any'}
                    style={{background: `linear-gradient(to right, ${Colors["FPrimary500"]} ${videoRef.current?.currentTime && Number(videoRef.current?.currentTime / v.maxTime * 100)}%, rgba(255, 255, 255, 0.2) ${videoRef.current?.currentTime && Number(videoRef.current?.currentTime / v.maxTime * 100)}%)`}}
                    onMouseDown={() => {
                        change("isClick", true);
                        if (isPlaying()) videoRef.current?.pause();
                    }}
                    onMouseUp={() => {
                        change("isClick", false);
                        if (!isPlaying()) videoRef.current?.play();
                    }}
                />
                <_.IDiv>
                    <_.PDiv>
                        <Icon icon="back" color="White" clicked={beforeVideo}/>
                        <Icon icon={isPlaying() ? 'pause' : 'start'} color="White" clicked={resume}/>
                        <Icon icon="front" color="White" clicked={afterVideo}/>
                        <_.PDiv onMouseEnter={() => setVolumeHover(true)}>
                            <Icon
                                icon={isMuted() ? 'nv' : videoRef.current && videoRef.current?.volume < 0.5 ? 'sv' : 'lv'}
                                color="White"
                                clicked={mute}
                            />
                            {volumeHover ? <_.VolumeBar
                                id={'volume'}
                                data={getVolume() * 100}
                                type={"range"}
                                defaultValue={videoRef.current?.volume}
                                min={0}
                                max={1}
                                step={'any'}
                                onMouseDown={e => change("lastVolume", +e.currentTarget.value)}
                                onMouseUp={e => change("lastVolume", +e.currentTarget.value)}
                                onChange={(e) => {
                                    changeVideo(video => video.volume = +e.target.value);
                                    e.target.style.background = `linear-gradient(to right, white ${getVolume() * 100}%, gray ${getVolume() * 100}%)`
                                }}
                            /> : undefined}
                        </_.PDiv>
                        {videoData && <Text color="White">
                            {time(getPlayTime(), videoData.hour)} / {time2(videoData.hour, videoData.minute, videoData.second)}
                        </Text>}
                    </_.PDiv>
                    <_.PDiv>
                        {/*<Icon icon="pnp" color="White"/>*/}
                        {sOpen && <_.SettingDiv>
                            <_.SDiv onClick={() => !sClick && setSClick(true)} isH={sClick}>
                                <_.SliceDiv>
                                    {sClick ? <Icon icon="left" color="White" clicked={() => setSClick(false)}/> : <Icon icon="speed" color="White"/>}
                                    <Text font="Body1" color={Colors.White}>재생속도</Text>
                                </_.SliceDiv>
                                <_.SliceDiv>
                                    <Text font="Body3" color={Colors.Gray400}>{sStatus === 1 ? '보통' : sStatus}</Text>
                                    {sClick ? <div style={{width: "24px", height: "24px"}}></div> : <Icon icon="right" color="White"/>}
                                </_.SliceDiv>
                            </_.SDiv>
                            {sClick && <CSetting sStatus={setSStatus} sOpen={setSClick}/>}
                        </_.SettingDiv>}
                        <Icon icon="setting2" color="White" clicked={() => {
                            setSOpen(c => !c);
                            setSClick(false);
                        }}/>
                        <Icon icon="full" color="White" clicked={full}/>
                    </_.PDiv>
                </_.IDiv>
            </_.CustomVDiv>}
        </_.CDiv>
    )
}

export default CustomVideo
