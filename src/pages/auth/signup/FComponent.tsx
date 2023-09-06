import React, { useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import BottomTitle from "./BottomTitle";
import axios from 'axios';
import * as _ from './style';
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";
import { toast } from "react-hot-toast";

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<[number, number]>>;
  Index: [number, number];
}

const FConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password } = value;
  const [IState, setIState] = useState<boolean | undefined>();
  const [PState, setPState] = useState<number>(0);

  const idCheck = () => {
    if (!id) return;
    if (IState) {
      if (PState === 100) {
        setIndex([1, 0]);
      } else {
        toast.error('비밀번호가 불완전합니다');
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
        if (PState === 100) {
          setIndex([1, 0]);
        } else {
          toast.error('비밀번호가 불완전합니다');
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
    change(name, data.replace(/[ㄱ-힣]/g, '').slice(0, 30));
    if (data.match(/(?=.*[ㄱ-힣])/)) {
      toast.error('비밀번호에 한글은 포함될 수 없습니다.');
    }

    setPState(0);
    if (!data) return;
    if (data.match(/(?=.*?[A-z])/)) {
      setPState((v) => v + 25);
    }
    if (data.match(/(?=.*?[0-9])/)) {
      setPState((v) => v + 25);

    }
    if (data.match(/(?=.*?[#?!@$%^&*-])/)) {
      setPState((v) => v + 25);
    }
    if (data.match(/.{8,}/)) {
      setPState((v) => v + 25);
    }
  }

  return (
    <_.SignBox bool={Index[0] === 0} reverse={Index[1] === 1 && (Index[0] - Index[1]) < 0}>
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
            percent={PState}
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