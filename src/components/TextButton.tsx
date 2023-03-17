import React from "react";
import styled from "styled-components";
import { ButtonProps } from "./buttonType";

export const TextButton = ({width, height, children}: ButtonProps & {children:React.ReactNode}) => {
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
  `
  return(
    <Buttons>
      {children}
    </Buttons>
  )
}