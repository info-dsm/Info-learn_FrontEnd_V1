import React, {PropsWithChildren} from "react";
import styled from "styled-components";
import {ButtonProps} from "./buttonType";
import {Colors} from "../styles/theme/color";

interface ButtonPropsOnclick extends ButtonProps {
    onClick: () => void;
}

export const PrimaryButton = ({children, ...props}: PropsWithChildren<ButtonPropsOnclick>) => {

    return (
        <Buttons {...props}>
            {children}
        </Buttons>
    )
}
const Buttons = styled.button<ButtonProps>`
  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  border: none;
  background: ${Colors.PrimaryGradient};
  color: ${Colors.White};
  border-radius: 8px;
  padding: 14px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.FPrimary400};
  }

  &:active {
    background-color: ${Colors.FPrimary700};
  }

  cursor: pointer;
`