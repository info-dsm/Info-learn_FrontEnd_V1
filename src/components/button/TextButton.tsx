import React from "react";
import styled from "styled-components";
import {Colors, colorsKeyOfType} from "../../styles/theme/color";

interface ButtonProps {
    width?: string;
    height?: string;
    color?: colorsKeyOfType;
}

export const TextButton = ({width, height, children, color}: ButtonProps & { children: React.ReactNode }) => {
    return (
        <Buttons width={width} height={height} color={color}>
            {children}
        </Buttons>
    )
}

const Buttons = styled.button<ButtonProps>`
  width: ${props => props.width ?? "auto"};
  height: ${props => props.height ?? "auto"};
  background: none;
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.color ? Colors[props.color] : Colors["FPrimary500"]};
`