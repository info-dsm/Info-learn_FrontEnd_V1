import React, { useRef, useState } from "react";
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

const SConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password, email, authentication } = value;
  const [EState, setEState] = useState<boolean | undefined>();
  const [AState, setAState] = useState<boolean | undefined>();
  const [time, setTime] = useState<number>(0);
  const Interval = useRef<NodeJS.Timer | undefined>();

  const PostEmail = () => {
    console.log('대충 이메일 전송');
    const chk = email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
    if (!!email && !chk) return;
    setTime(180);
    setEState(true);
    if (Interval.current) {
      clearInterval(Interval.current);
      Interval.current = undefined;
    }
    Interval.current = setInterval(() => {
      if (time >= 0) {
        setTime(time => time - 1);
      } else {
        clearInterval(Interval.current);
        Interval.current = undefined;
      }
    }, 1000)
  }

  const EmailCheck = (name: string, data: string) => {
    change(name, data);
    if (data === '') setEState(undefined);
    else if (!data.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
      setEState(false);
    } else {
      setEState(undefined);
    }
  }

  const moveCheck = (num: number) => {
    if (EState && email && authentication) setIndex(num);
  }

  return (
    <_.SignBox bool={Index === 1} visible={!(id && password)}>
      <_.SignUpMain>
        <_.BeforeIcon
          className="ri-arrow-left-s-line"
          onClick={() => setIndex(Index - 1)}
        />
        <_.Title>회원가입</_.Title>
        <_.SubTitle>회원가입을 하여 서비스를 이용해보세요</_.SubTitle>
        <_.Flexbox>
          <SignInput
            Title='이메일'
            name='email'
            placeholder='이메일을 입력해주세요'
            change={EmailCheck}
            value={email}
            email={PostEmail}
            state={EState}
          />
          <SignInput
            Title='인증번호'
            name='authentication'
            placeholder='인증번호를 입력해주세요'
            change={change}
            value={authentication}
            time={time <= 0 ? 0 : time}
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

export default SConponent;