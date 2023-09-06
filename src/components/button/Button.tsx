import React, {PropsWithChildren} from "react";
import styled from "styled-components";
import { Colors } from "../../styles/theme/color";
import { Text } from "../text";
import { fontsKeyOfType } from "../../styles/theme/font";
import Icon from "../../assets/Icon";

interface ButtonProps {
  font?: fontsKeyOfType;
  width?: string;
  height?: string;
  padding?: string;
  onClick?: () => void;
  primary?: boolean;
  gray?: boolean;
  red?: boolean;
  blue?: boolean;
  white?: boolean;
  like?: boolean;
  share?: boolean;
}

export const Button = ({ children, font = 'Body1', like, share, ...props }: PropsWithChildren<ButtonProps>) => {
  const { gray, white } = props;
  return (
    <Buttons {...props}>
      {
        like !== undefined &&
        <Text font={font} color={gray || white ? Colors.Black : Colors.White}>좋아요</Text>
      }
      <Text font={font} color={gray || white ? Colors.Black : Colors.White}>{children}</Text>
      {
        like !== undefined && (
          like ?
          <Icon icon='heart-fill' size={16} color={gray || white ? 'Black' : 'White'} />
          :
          <Icon icon='heart' size={16} color={gray || white ? 'Black' : 'White'} />
        )
      }
      {
        share !== undefined &&
        <Icon icon='share' size={16} color={gray || white ? 'Black' : 'White'} />
      }
    </Buttons>
  )
}

const Buttons = styled.button<ButtonProps>`
  width: ${(props) => props.width ?? "auto"};
  height: ${(props) => props.height ?? "auto"};
  border: none;
  border-radius: 8px;
  padding: ${({ padding }) => padding ?? '14px 20px'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  transition: 0.3s;
  background: ${(props) =>
          props.primary ? Colors.PrimaryGradient
                  : props.gray ? Colors.Gray200
                          : props.red ? Colors.Danger500
                                  : props.blue ? Colors.FPrimary500
                                          : props.white ? Colors.White
                                                  : Colors.PrimaryGradient
  };

  &:hover {
    transform: scale(1.05);
  }
  
  p {
    white-space: nowrap;
  }
`