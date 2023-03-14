import React from "react";
import styled from "styled-components";
import { ButtonProps } from "./buttonType";
import { Colors } from "../styles/theme/color";

export const Button = ({width, height, fill, icon, text}: ButtonProps & {children:React.ReactNode}) => {
  const Buttons = styled.button`
    width: ${width ?? "auto"};
    height: ${height ?? "auto"};
    border: none;
    height: 1;
    background-color: ${Colors[fill!] ?? "#111111"};
    border-radius: 8px;
    padding: 14px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    transition: 0.3s;
    &:hover{
      
    }
  `
  return(
    <Buttons>
      {icon??(
        <img/>
      )}
      {text??(
        <p>This is Button</p>
      )}
    </Buttons>
  )
}