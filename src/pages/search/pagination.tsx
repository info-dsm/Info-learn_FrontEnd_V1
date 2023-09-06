import React from "react";
import Icon from "../../assets/Icon";
import * as _ from './style';

interface PageProps {
    value: number;
    change: React.Dispatch<React.SetStateAction<number>>;
    end?: number
}

const Pagination = ({value, change, end = 1}: PageProps) => {
    const list = Array.from({length: Math.min(end <= 1 ? 1 : end, 5)}, (v, i) => {
        if(value <= 2) {
            return i + 1;
        }
        else if(value >= end - 1) {
            return end - 4 + i;
        }
        else {
            return value - 2 + i;
        }
    });
    return (
        <_.Container>
            <_.Circle onClick={() => value > 1 && change(value - 1)}>
                <Icon icon="left" color="FPrimary500"/>
            </_.Circle>
            {
                list.map((v) => 
                    <_.Circle key={v} bool={v === value} onClick={() => change(v)}>{v}</_.Circle>
                )
            }
            <_.Circle onClick={() => end - value > 0 && change(value + 1)}>
                <Icon icon="right" color="FPrimary500"/>
            </_.Circle>
        </_.Container>
    )
}

export default Pagination;