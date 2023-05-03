import React from "react";
import * as _ from './inputStyle';

interface InputProps {
    name: string;
    placeholder: string;
    change: (name: string, data: string) => void;
    value: string;
    max?: number;
    width?: string;
}

const Input = ({ name, placeholder, change, value, max, width }: InputProps) => {
    return (
        <_.MarginBox width={width}>
            <_.InputOutBox>
                <_.InputMain
                    type='text'
                    placeholder={placeholder}
                    onChange={(e) => change(name, e.target.value)}
                    value={value}
                    maxLength={max}
                />
            </_.InputOutBox>
        </_.MarginBox>
    )
}

export default Input;