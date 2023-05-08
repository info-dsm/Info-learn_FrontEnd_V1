import React, { useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import BottomTitle from "./BottomTitle";
import axios from 'axios';
import * as _ from './style';
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
}

const FConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password } = value;
  const [IState, setIState] = useState<boolean | undefined>();
  const [PState, setPState] = useState<boolean | undefined>();

  const idCheck = () => {
    setIndex(1);
    return;
    if (!id) return;
    if (IState) {
      if (PState) {
        setIndex(1);
      }
      return;
    }
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/check/account`,
      headers: {
        'ngrok-skip-browser-warning': '69420'
      },
      params: {
        accountId: id
      }
    })
      .then(() => {
        setIState(true);
        if (PState) {
          setIndex(1);
        }
      })
      .catch((err) => {
        console.log(err);
        setIState(false);
      })
  }

  const IdChange = (name: string, data: string) => {
    change(name, data);
    setIState(undefined);
  }

  const passwordCheck = (name: string, data: string) => {
    change(name, data);
    if (!data) setPState(undefined)
    else if (data.match(/^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)) {
      setPState(true);
    }
    else {
      setPState(false)
    }
    
  }

  return (
    <_.SignBox bool={Index === 0}>
      <_.FlexDiv direction='column'>
        <_.FlexDiv direction='column' gap={10}>
        <Text font="Title1">회원가입</Text>
        <Text font="Body2" color={Colors.Gray400}>회원가입을 하여 서비스를 이용해보세요</Text>
        </_.FlexDiv>
        <_.FlexDiv direction='column' margin="80px 0 56px 0" gap={16}>
          <SignInput
            Title='아이디'
            name='id'
            placeholder='아이디를 입력해주세요'
            change={IdChange}
            value={id}
            state={IState}
            message={IState ? '사용할 수 있는 아이디입니다' : '이미 사용중인 아이디입니다'}
            readOnly={IState}
          />
          <SignInput
            Title='비밀번호'
            name='password'
            placeholder='영•숫자•기호 포함 8자 이상'
            eyes={true}
            change={passwordCheck}
            value={password}
            state={PState}
            message={PState ? '사용할 수 있는 비밀번호입니다' : '비밀번호 형식에 맞지 않습니다'}
          />
        </_.FlexDiv>
        <Button onClick={() => idCheck()} width="400px" height='47px'>
          다음
        </Button>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.FlexDiv>
    </_.SignBox>
  )
}

export default FConponent;