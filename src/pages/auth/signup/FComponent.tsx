import React from "react";
import InputBox from "../../../components/Input";
import { PrimaryButton } from "../../../components/PrimaryButton";
import BottomTitle from "./BottomTitle";
import * as _ from './style'

type ValueType = 'id' | 'password' | 'email' | 'authentication' | 'nickname';
interface ChangeProps {
  name: string;
  data: string;
}

interface ComponentsProps {
    value: { [key in ValueType]: string };
    change: ({ name, data }: ChangeProps) => void;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    Index: number;
  }

const FConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
    const {id, password} = value;
    return (
      <_.SignBox bool={Index === 0}>
        <_.SignUpMain>
          <_.Title>회원가입</_.Title>
          <_.SubTitle>회원가입을 하여 서비스를 이용해보세요</_.SubTitle>
          <_.Flexbox>
            <InputBox
              Title='아이디'
              name='id'
              placeholder='아이디를 입력해주세요'
              change={change}
              value={id}
              textarea={true}
            />
            <InputBox
              Title='비밀번호'
              name='password'
              placeholder='영•숫자•기호 포함 8자 이상'
              eyes={true}
              change={change}
              value={password}
            />
          </_.Flexbox>
          <PrimaryButton onClick={() => id && password  && setIndex(Index + 1)} width="400px" height='47px'>
            다음
          </PrimaryButton>
          <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
        </_.SignUpMain>
      </_.SignBox>
    )
  }

  export default FConponent;