import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/theme/color";
import { ButtonProps } from "./buttonType";

export const TextButton = ({width, height, children, color}: ButtonProps & {children:React.ReactNode}) => {
  const Buttons = styled.button`
    width: ${width ?? "auto"};
    height: ${height ?? "auto"};
    background: none;
    border: none;
    border-radius: 8px;
    padding: 14px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${Colors[color!] ?? Colors["FPrimary500"]};
  `
  return(
    <Buttons>
      {children}
    </Buttons>
  )
}