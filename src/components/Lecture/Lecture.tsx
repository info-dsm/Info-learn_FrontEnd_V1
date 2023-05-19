import React from "react";
import * as _ from './style';
import {Text} from "../text";
import Icon from "../../assets/Icon";

interface LectureProps {
    title: string;
    time: number;
    state?: boolean;
}

const Lecture = ({title, time, state}: LectureProps) => {
    const Hour = ('00' + Math.floor(time / 3600)).slice(-2);
    const Minute = ('00' + Math.floor(time / 60)).slice(-2);
    const Second = ('00' + Math.floor(time % 60)).slice(-2);

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

export default Lecture;