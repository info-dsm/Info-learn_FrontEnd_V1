import React, {useState} from "react";
import Icon from "../../assets/Icon";
import {Text} from "../text";
import * as _ from './style';
import {Colors, colorsKeyOfType} from "../../styles/theme/color";
import {arrProps} from "../../pages/lecture/VideoManage/VideoRegistration";

interface DropProps {
    arr: arrProps[];
    value: string;
    change: React.Dispatch<React.SetStateAction<string>>;
    color?: colorsKeyOfType;
    width?: string;
    noneMsg: string;
}

const BigDropDown = ({arr, value, change, color, width, noneMsg}: DropProps) => {
    const [state, setState] = useState<boolean | undefined>(undefined);

    const setData = (v: string) => {
        if (v !== value) {
            change(v);
        }
    }

    return (
        <>
            {state && <_.Background onClick={() => setState(false)}/>}
            <_.BigContainer width={width} color={color} onClick={() => setState(!state)}>
                <Text font="Body2">{value}</Text>
                <Icon icon={state ? "up" : "down"}/>
                {state && <_.BigContents width={width} bool={state}>
                    {arr[0] ? arr.map((v, index) =>
                        <_.InContent key={index} onClick={() => setData(`섹션 ${v.sequence}. ${v.title}`)}>
                            <Text font="Body2">{`섹션 ${v.sequence}. ${v.title}`}</Text>
                        </_.InContent>
                    ) : <Text color={Colors["Gray400"]}>아직 {noneMsg} 없습니다.</Text>}
                </_.BigContents>}
            </_.BigContainer>
        </>
    )
}

export default BigDropDown;