import React from "react";
import * as _ from './inputStyle';

interface InputProps {
    name: string;
    placeholder: string;
    change: (name: string, data: string) => void;
    keyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    value: string;
    max?: number;
    width?: string;
}

const Input = ({name, placeholder, change, keyDown, value, max, width}: InputProps) => {
    return (
        <_.MarginBox width={width}>
            <_.InputOutBox>
                <_.InputMain
                    type='text'
                    placeholder={placeholder}
                    onChange={(e) => change(name, e.target.value)}
                    value={value}
                    maxLength={max}
                    onKeyDown={(e) => keyDown && keyDown(e)}
                    width="100%"
                />
            </_.InputOutBox>
        </_.MarginBox>
    )
}

export default Input;