import React, { useState } from "react";
import * as _ from './input';
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
}

const SignInput = ({ Title, name, placeholder, eyes, change, value, max, email, time, state }: InputProps) => {
    const [eye, setEye] = useState(eyes ?? false);

    return (
        <_.SignContainer>
            <_.BetweenBox>
                <Text>{Title}</Text>
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
                    name === 'password' ?
                        state ?
                            <Text color={Colors.Success500}>사용할 수 있는 비밀번호입니다.</Text>
                            :
                            <Text color={Colors.Danger500}>비밀번호 형식에 맞지 않습니다.</Text>
                        :
                        email ?
                            state ?
                                <Text color={Colors.Success500}>이메일 인증번호가 발송되었습니다</Text>
                                :
                                <Text color={Colors.Danger500}>이메일 형식이 잘못되었습니다</Text>
                            :
                            state ?
                                <Text color={Colors.Success500}>인증번호가 일치합니다</Text>
                                :
                                <Text color={Colors.Danger500}>인증번호가 일치하지 않습니다.</Text>
                )
            }
        </_.SignContainer>
    )
}

export default SignInput;