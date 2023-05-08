import React, { useState } from "react";
import * as _ from './inputStyle';
import { Colors } from "../../styles/theme/color";
import { Text } from "../text";

interface InputProps {
    Title: string;
    name: string;
    placeholder: string;
    eyes?: boolean | undefined;
    change: (name: string, data: string) => void;
    value: string;
    max?: number;
    email?: () => void;
    time?: number;
    state?: boolean;
    message?: string;
    readOnly?: boolean;
    post?: React.Dispatch<React.SetStateAction<[number, number, boolean] | undefined>>;
}

const SignInput = ({ Title, name, placeholder, eyes, change, value, max, email, time, state, message, readOnly, post }: InputProps) => {
    const [eye, setEye] = useState(eyes ?? false);

    return (
        <>
            <_.SignContainer>
                <_.BetweenBox>
                    <Text
                        onMouseMove={(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => post && post([e.clientX, e.clientY, true])}
                        onMouseLeave={() => post && post((v) => {if(v) return [v[0], v[1], false]})}
                    >
                        {Title}
                    </Text>
                    {email &&
                        <_.EmailGapBox onClick={() => email()}>
                            <Text color={Colors.FPrimary500}>이메일 인증</Text>
                            <_.Icon
                                fill='FPrimary500'
                                className='ri-check-line'
                            />
                        </_.EmailGapBox>
                    }
                    {(time !== undefined && time >= 0) &&
                        <Text
                            color={Colors.FPrimary500}
                        >
                            {`${Math.floor(time / 60)}:${('00' + (time % 60)).slice(-2)}`}
                        </Text>
                    }
                </_.BetweenBox>
                <_.InputOutBox>
                    <_.InputMain
                        type={eye ? 'password' : 'text'}
                        placeholder={placeholder}
                        onChange={(e) => change(name, e.currentTarget.value)}
                        value={value}
                        maxLength={max}
                        readOnly={readOnly}
                    />

                    {
                        eyes !== undefined && (
                            eye ?
                                <_.Icon
                                    fill='Gray400'
                                    className='ri-eye-line'
                                    onClick={() => setEye(false)}
                                />
                                :
                                <_.Icon
                                    fill='Gray400'
                                    className='ri-eye-off-line'
                                    onClick={() => setEye(true)}
                                />
                        )
                    }
                </_.InputOutBox>
                {
                    state !== undefined && (
                        state ?
                            <Text color={Colors.Success500}>{message}</Text>
                            :
                            <Text color={Colors.Danger500}>{message}</Text>)
                }
            </_.SignContainer>
        </>
    )
}

export default SignInput;