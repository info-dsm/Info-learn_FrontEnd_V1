import React, { useRef, useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import BottomTitle from "./BottomTitle";
import axios from 'axios'
import * as _ from './style'
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
}

const SConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password, email, verified, authentication } = value;
  const [EState, setEState] = useState<boolean | undefined>();
  const [AState, setAState] = useState<boolean | undefined>();
  const [time, setTime] = useState<number>(0);
  const Interval = useRef<NodeJS.Timer | undefined>();
  const tmpTime = useRef<number>(0);

  const PostEmail = () => {
    const chk = email.match(/[a-zA-Z\d+_.]+@dsm.hs.kr$/);
    if (email === '' || !chk) return;
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/email`,
      params: {
        email: email
      }
    })
      .then(() => {
        setTime(300);
        tmpTime.current = 300;
        setEState(true);
        change('verified', email);
        change('authentication', '');
        setAState(undefined);
        if (Interval.current) {
          clearInterval(Interval.current);
          Interval.current = undefined;
        }
        Interval.current = setInterval(() => {
          if (tmpTime.current-- > 0) {
            setTime(time => time - 1);
          } else {
            setAState(false);
            clearInterval(Interval.current);
            Interval.current = undefined;
          }
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
        setEState(false);
      })
  }

  const codeCheck = () => {
    setIndex(2);
    return;
    if (!EState || authentication.length < 6) return;
    else if (time <= 0) {
      setAState(false);
      return;
    }
    else if (AState) {
      change('email', verified);
      setIndex(2);
    }
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/check/code`,
      headers: {
        'ngrok-skip-browser-warning': '69420'
      },
      params: {
        email: verified,
        code: authentication
      }
    })
      .then(() => {
        setAState(true);
        clearInterval(Interval.current);
        Interval.current = undefined;
        change('email', verified);
        setIndex(2);
      })
      .catch((err) => {
        console.log(err);
        setAState(false);
      })
  }

  const EmailCheck = (name: string, data: string) => {
    change(name, data);
    if (data === '') setEState(undefined);
    else if (!data.match(/[a-zA-Z\d+_.]+@dsm.hs.kr$/)) {
      setEState(false);
    } else {
      setEState(undefined);
    }
  }

  const authenticationCheck = (name: string, data: string) => {
    change(name, data.replace(/[^0-9]/, '').slice(0, 6));
  }

  return (
    <_.SignBox bool={Index === 1} visible={!(id && password)}>
      <_.FlexDiv direction='column'>
        <_.BeforeIcon
          className="ri-arrow-left-s-line"
          onClick={() => setIndex(0)}
        />
        <_.FlexDiv direction='column' gap={10}>
        <Text font="Title1">회원가입</Text>
        <Text font="Body2" color={Colors.Gray400}>회원가입을 하여 서비스를 이용해보세요</Text>
        </_.FlexDiv>
        <_.FlexDiv direction='column' margin="80px 0 56px 0" gap={16}>
          <SignInput
            Title='이메일'
            name='email'
            placeholder='이메일을 입력해주세요'
            change={EmailCheck}
            value={email}
            email={PostEmail}
            state={EState}
            message={EState ? '이메일 인증번호가 발송되었습니다' : '이메일 형식이 잘못되었습니다'}
          />
          <SignInput
            Title='인증번호'
            name='authentication'
            placeholder='인증번호를 입력해주세요'
            change={authenticationCheck}
            value={authentication}
            time={time <= 0 ? 0 : time}
            state={AState !== undefined ? AState && (time > 0) : undefined}
            message={time <= 0 ? '시간초과입니다' : AState ? '인증번호가 일치합니다' : '인증번호가 일치하지 않습니다'}
            readOnly={EState !== true || AState || time <= 0}
          />
        </_.FlexDiv>
        <Button onClick={() => codeCheck()} width="400px" height='47px'>
          다음
        </Button>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.FlexDiv>
    </_.SignBox>
  )
}

export default SConponent;