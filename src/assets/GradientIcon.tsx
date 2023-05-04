import {iconName, IconSet} from "./constants";
import {Colors} from "../styles/theme/color";
import React from "react";

interface IconProps {
    icon: iconName;
    size?: number;
}

const GradientIcon = ({icon, size}: IconProps) => (
    <svg
        height={size ?? 24}
        viewBox={IconSet[icon].viewBox}
        fill="url(#Gradient)"
        xmlns="http://www.w3.org/2000/svg"
    >
    <linearGradient id="Gradient">
      <stop offset="0%" stopColor={Colors.FPrimary500}></stop>
      <stop offset="100%" stopColor={Colors.SPrimary500}></stop>
    </linearGradient>
        <path d={IconSet[icon].path}/>
    </svg>
)

export default GradientIcon;
