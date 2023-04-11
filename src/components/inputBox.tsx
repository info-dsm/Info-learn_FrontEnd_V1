import React, { useState } from "react";
import styled from "styled-components";
import { Colors, colorsKeyOfType } from "../styles/theme/color";
import { Text } from "./text";

type ValueType = 'id' | 'password' | 'email' | 'authentication' | 'nickname';
interface ValueProps {
  name: ValueType;
  data: string;
}

interface InputProps {
  Title: string;
  name: string;
  placeholder: string;
  eyes?: boolean | undefined;
  change: ({ name, data }: ValueProps) => void;
  value: string;
}

const InputBox = ({ Title, name, placeholder, eyes, change, value }: InputProps) => {
  const [eye, setEye] = useState(false);
  return (
    <MarginBox>
      <Text>{Title}</Text>
      <InputOutBox>
        <InputMain
          type={eye ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={(e) => change({ name: name as ValueType, data: e.target.value })}
          value={value}
        />
        {
          eyes !== undefined ?
            eye ?
              <Icon
                fill='Gray400'
                className='ri-eye-off-line'
                onClick={() => setEye(false)}
              />
              :
              <Icon
                fill='Gray400'
                className='ri-eye-line'
                onClick={() => setEye(true)}
              />
            :
            <></>
        }
      </InputOutBox>
    </MarginBox>
  )
}

export default InputBox;

const MarginBox = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.margin ?? '20px 0'};
`

const InputOutBox = styled.div`
  margin-top: 10px;
  padding: 14px 20px;
  width: 400px;
  height: 52px;
  background-color: ${Colors.Gray100};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputMain = styled.input`
  width: 316px;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
  border: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
   color: ${Colors.Gray400};
  }
`

interface IconBoxProps {
  size?: number;
  fill?: colorsKeyOfType;
}

export const Icon = styled.i<IconBoxProps>`
  font-size: ${(props) => props.size ?? 24}px;
  color: ${(props) => Colors[props.fill!] ?? Colors.Black};
`