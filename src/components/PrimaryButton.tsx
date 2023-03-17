import React from "react";
import styled from "styled-components";
import { ButtonProps } from "./buttonType";
import { Colors } from "../styles/theme/color";

export const PrimaryButton = ({width, height, children}: ButtonProps & {children:React.ReactNode}) => {
  const Buttons = styled.button`
    width: ${width ?? "auto"};
    height: ${height ?? "auto"};
    border: none;
    background: ${Colors.PrimaryGradient};
    color: ${Colors.White};
    border-radius: 8px;
    padding: 14px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: ${Colors.FPrimary400};
    }
    &:active {
      background-color: ${Colors.FPrimary700};
    }
  `
  return(
    <Buttons>
      {children}
    </Buttons>
  )
}