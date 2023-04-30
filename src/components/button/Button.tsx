import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/theme/color";
import 'remixicon/fonts/remixicon.css';
import { Text } from "../text";

interface ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  primary?: boolean;
  gray?: boolean;
  red?: boolean;
  blue?: boolean;
  like?: boolean;
}

export const Button = ({ children, like, ...props }: PropsWithChildren<ButtonProps>) => {
  const { gray } = props;
  return (
    <Buttons {...props}>
      {
        like !== undefined ?
          <>
            <Text font="Body1" color={gray ? Colors.Black : Colors.White}>좋아요</Text>
            <Text font="Body1" color={gray ? Colors.Black : Colors.White}>{children}</Text>
            {
              like ?
                <Icon className="ri-heart-fill" fill={gray} />
                :
                <Icon className="ri-heart-line" fill={gray} />
            }
          </>
          :
          <Text font="Body1" color={gray ? Colors.Black : Colors.White}>{children}</Text>
      }
    </Buttons>
  )
}

const Buttons = styled.button<ButtonProps>`
  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  border: none;
  border-radius: 8px;
  padding: 14px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  transition: 0.3s;
  color: ${(props) => props.gray ? Colors.Black : Colors.White};
  background: ${(props) =>
    props.primary ? Colors.PrimaryGradient
      : props.gray ? Colors.Gray200
      : props.red ? Colors.Danger500
      : props.blue ? Colors.FPrimary500
      : Colors.PrimaryGradient
  };

  &:hover {
    transform: scale(1.05);
  }
`

export const Icon = styled.i<{ fill?: boolean }>`
  font-size: 16px;
  color: ${({ fill }) => fill ? Colors.Black : Colors.White};
`