import React, {useState} from "react";
import styled from "styled-components";
import {Colors, colorsKeyOfType} from "../styles/theme/color";
import {Text} from "./text";

interface ChangeProps {
    name: string;
    data: string;
}

interface InputProps {
    Title?: string;
    name: string;
    placeholder: string;
    textarea?: boolean | undefined;
    eyes?: boolean | undefined;
    change: ({name, data}: ChangeProps) => void;
    value: string;
    max?: number;
    width?: number;
}

const Input = ({Title, name, placeholder, textarea, eyes, change, value, max, width}: InputProps) => {
    const [eye, setEye] = useState(eyes ?? false);

    return (
        <MarginBox width={width}>
            {Title && <Text>{Title}</Text>}
            {
                textarea ?
                    <TextArea
                        placeholder={placeholder}
                        onChange={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                            change({name: name, data: e.target.value})
                        }}
                        value={value}
                        maxLength={max}
                    />
                    :
                    <InputOutBox>
                        <InputMain
                            type={eye ? 'password' : 'text'}
                            placeholder={placeholder}
                            onChange={(e) => change({name: name, data: e.target.value})}
                            value={value}
                            maxLength={max}
                        />

                        {
                            eyes !== undefined ?
                                eye ?
                                    <Icon
                                        fill='Gray400'
                                        className='ri-eye-line'
                                        onClick={() => setEye(false)}
                                    />
                                    :
                                    <Icon
                                        fill='Gray400'
                                        className='ri-eye-off-line'
                                        onClick={() => setEye(true)}
                                    />
                                :
                                <></>
                        }
                    </InputOutBox>}
            {max && <RText>{value.length}/{max}</RText>}
        </MarginBox>
    )
}

export default Input;

const MarginBox = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({width}) => width ?? 400}px;
`

const InputOutBox = styled.div`
  padding: 14px 20px;
  width: 100%;
  height: 52px;
  background-color: ${Colors.Gray100};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputMain = styled.input`
  width: calc(100% - 48px);
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

const TextArea = styled.textarea`
  padding: 14px 20px;
  width: 100%;
  min-height: 120px;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
  border: none;
  outline: none;
  resize: none;
  background-color: ${Colors.Gray100};
  border-radius: 8px;

  &::placeholder {
    color: ${Colors.Gray400};
  }
`

interface IconBoxProps {
    size?: number;
    fill?: colorsKeyOfType;
}

const Icon = styled.i<IconBoxProps>`
  font-size: ${(props) => props.size ?? 24}px;
  color: ${props => props.fill ? Colors[props.fill] : Colors.Black};
`

const RText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  color: ${Colors.Black};
`