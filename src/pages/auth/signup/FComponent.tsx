import React, { useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { PrimaryButton } from "../../../components/PrimaryButton";
import BottomTitle from "./BottomTitle";
import * as _ from './style'

type ValueType = 'id' | 'password' | 'email' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
}

const FConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password } = value;
  const [state, setState] = useState<boolean | undefined>();

  const passwordCheck = (name: string, data: string) => {
    change(name, data);
    if(!data) setState(undefined)
    else if(data.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/)){
      setState(true);
    }
    else {
      setState(false)
    }
  }

  const moveCheck = (num: number) => {
    if(state && id && password) setIndex(num);
  }

  return (
    <_.SignBox bool={Index === 0}>
      <_.SignUpMain>
        <_.Title>회원가입</_.Title>
        <_.SubTitle>회원가입을 하여 서비스를 이용해보세요</_.SubTitle>
        <_.Flexbox>
          <SignInput
            Title='아이디'
            name='id'
            placeholder='아이디를 입력해주세요'
            change={change}
            value={id}
          />
          <SignInput
            Title='비밀번호'
            name='password'
            placeholder='영•숫자•기호 포함 8자 이상'
            eyes={true}
            change={passwordCheck}
            value={password}
            state={state}
          />
        </_.Flexbox>
        <PrimaryButton onClick={() => moveCheck(Index + 1)} width="400px" height='47px'>
          다음
        </PrimaryButton>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.SignUpMain>
    </_.SignBox>
  )
}

export default FConponent;