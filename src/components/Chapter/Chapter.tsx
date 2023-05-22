import React from "react";
import * as _ from './style';
import {Text} from "../text";
import Icon from "../../assets/Icon";
import {useNavigate, useSearchParams} from "react-router-dom";

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

const Chapter = ({chapterId, title, sequence, videos, watching}: chapterProps) => {
    const sNavigate = useNavigate();
    const [state] = useSearchParams();
    const time = videos?.reduce((accumulator, currentValue) => accumulator + (currentValue.hour * 60) + currentValue.minute, 0);
    const Hour = Math.floor((time ?? 0) / 60);
    const Minute = Math.floor((time ?? 0) % 60);

    console.log(chapterId)

    videos?.sort((a, b) => a.sequence - b.sequence);

    return (
        <_.Container>
            <_.TitleGap>
                <Text font='Body1'>섹션 {sequence}. {title}</Text>
                <Text font='Body4' color='Gray500'>{videos?.length}강 • {Hour !== 0 && `${Hour}시간`} {Minute}분</Text>
            </_.TitleGap>
            <_.ChapterContainer>
                <_.InContainer>
                    {
                        videos?.map((v) => {
                                const style = watching === v.videoId ? 'White' : v.status === 'comCOMPLETE' ? 'Gray500' : 'Black';

                                return (
                                    <_.VideoContainer
                                        key={v.videoId}
                                        watch={watching === v.videoId}
                                        bool={v.status === 'COMPLETE'}
                                        onClick={() => sNavigate({
                                            pathname: "/video/about",
                                            search: `?lectureId=${state.get('lectureId')}&videoId=${v.videoId}`,
                                        })}
                                    >
                                        <_.TitleGap>
                                            <Icon icon='play' size={16} color={style}/>
                                            <Text font='Body3' color={style}>{v.title}</Text>
                                            {v.status === 'COMPLETE' && <Icon icon='check' size={16} color={style}/>}
                                        </_.TitleGap>
                                        <Text font='Body4' color={style}>{v.hour ? ('00' + v.hour).slice(-2) + ':' : ''}{('00' + v.minute).slice(-2)}:{('00' + v.second).slice(-2)}</Text>
                                    </_.VideoContainer>
                                )
                            }
                        )
                    }
                </_.InContainer>
            </_.ChapterContainer>
        </_.Container>
    )
}

export default Chapter;