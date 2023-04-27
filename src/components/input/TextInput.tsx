import React from "react";
import * as _ from './input';
import { Text } from "../text";

interface InputProps {
    Title: string;
    name: string;
    placeholder: string;
    textarea?: boolean | undefined;
    change: (name: string, data: string) => void;
    value: string;
    max: number;
    width?: number;
}

const TextInput = ({ Title, name, placeholder, textarea, change, value, max, width }: InputProps) => {
    return (
        <_.MarginBox width={width}>
            <Text>{Title}</Text>
            {
                textarea ?
                    <_.TextArea
                        placeholder={placeholder}
                        onChange={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                            change(name, e.target.value)
                        }}
                        value={value}
                        maxLength={max}
                    />
                    :
                    <_.InputOutBox>
                        <_.InputMain
                            type='text'
                            placeholder={placeholder}
                            onChange={(e) => change(name, e.target.value)}
                            value={value}
                            maxLength={max}
                        />
                    </_.InputOutBox>
            }
            <_.RText>{value.length}/{max}</_.RText>
        </_.MarginBox>
    )
}

export default TextInput;