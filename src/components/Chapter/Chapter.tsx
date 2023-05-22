import React from "react";
import * as _ from './style';
import {Text} from "../text";
import Icon from "../../assets/Icon";

interface VideoType {
    videoId: number;
    title: string;
    time: number;
    state?: boolean;
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
        <_.Container bool={state}>
            <_.TitleGap>
                <Icon icon='play' size={16} color={state!==undefined ? state ? 'Black' : 'Gray500' : 'White'}/>
                <Text font='Body3' color={state!==undefined ? state ? 'Black' : 'Gray500' : 'White'}>{title}</Text>
                {state === false && <Icon icon='check' size={16} color='Gray500'/>}
            </_.TitleGap>
            <Text font='Body4' color={state!==undefined ? state ? 'Black' : 'Gray500' : 'White'}>{Hour ? Hour + ':' : ''}{Minute}:{Second}</Text>
        </_.Container>
    )
}

export default Chapter;