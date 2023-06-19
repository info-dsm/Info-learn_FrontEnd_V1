import {iconName, IconSet} from "./constants";
import {Colors, colorsKeyOfType} from "../styles/theme/color";
import React from "react";
import styled from "styled-components";

interface IconProps {
    icon: iconName;
    size?: number;
    color?: colorsKeyOfType;
    clicked?: () => void;
}

const Icon = ({icon, size, color, clicked}: IconProps) => (
    <Svg
        height={size ?? 24}
        viewBox={IconSet[icon].viewBox}
        fill={color && Colors[color]}
        xmlns="http://www.w3.org/2000/svg"
        onClick={clicked}
        point={!!clicked}
    >
        <path d={IconSet[icon].path}/>
    </Svg>
)

export default Icon

const Svg = styled.svg<{ point: boolean }>`
  cursor: ${props => props.point ? "pointer" : "default"};
`
