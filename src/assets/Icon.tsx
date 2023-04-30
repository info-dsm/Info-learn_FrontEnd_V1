import {iconName, IconSet} from "./constants";
import {Colors, colorsKeyOfType} from "../styles/theme/color";
import React from "react";

interface IconProps {
    icon: iconName;
    size?: number;
    color?: colorsKeyOfType;
}

const Icon = ({icon, size, color}: IconProps) => (
    <svg
        height={size ?? 24}
        viewBox={IconSet[icon].viewBox}
        fill={color && Colors[color]}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={IconSet[icon].path}/>
    </svg>
)

export default Icon
