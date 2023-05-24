import React from "react";
import * as _ from './style';
import {Text} from "../text";
import Icon from "../../assets/Icon";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Colors} from "../../styles/theme/color";

export interface chapterProps {
    chapterId: number;
    title: string;
    sequence: number;
    videos?: {
        videoId: number;
        title: string;
        hour: number;
        minute: number;
        second: number;
        sequence: number;
        status: string | null;
    }[];
    watching?: number;
    cTime: number;
}

const Chapter = ({title, sequence, videos, watching, cTime}: chapterProps) => {
    const sNavigate = useNavigate();
    const [state] = useSearchParams();
    const Hour = Math.floor(cTime / 3600);
    const Minute = Math.floor(cTime / 60);

    videos?.sort((a, b) => a.sequence - b.sequence);

    return (
        <_.Container>
            <_.TitleGap>
                <Text font='Body1'>섹션 {sequence}. {title}</Text>
                <Text font='Body4' color={Colors["Gray500"]}>{videos?.length}강 • {Hour !== 0 && `${Hour}시간`} {Minute}분</Text>
            </_.TitleGap>
            <_.ChapterContainer>
                <_.InContainer>
                    {videos?.map((v) => {
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
                    })}
                </_.InContainer>
            </_.ChapterContainer>
        </_.Container>
    )
}

export default Chapter;