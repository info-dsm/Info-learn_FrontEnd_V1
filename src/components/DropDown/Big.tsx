import React, { useState } from "react";
import Icon from "../../assets/Icon";
import { Text } from "../text";
import * as _ from './style';

interface DropProps {
    arr: string[];
    value: string;
    change: React.Dispatch<React.SetStateAction<string>>;
}

const BigDropDown = ({ arr, value, change }: DropProps) => {
    const [state, setState] = useState<boolean | undefined>();

    const setData = (v: string) => {
        if(v !== value) {
            change(v);
        }
    }

    return (
        <>
            {state && <_.Backgorund onClick={() => setState(false)} />}
            <_.BigContainer onClick={() => setState(!state)}>
                <Text font="Body2">{value}</Text>
                <Icon icon={state ? "up" : "down"}/>
                <_.BigContents bool={state}>
                    {
                        arr.map((v, index) =>
                            <Text key={index} font="Body2" onClick={() => setData(v)}>{v}</Text>
                        )
                    }
                </_.BigContents>
            </_.BigContainer>
        </>
    )
}

export default BigDropDown;