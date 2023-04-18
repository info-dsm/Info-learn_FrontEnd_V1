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

const SConponent = ({ value, change, Index, setIndex }: ComponentsProps) => {
  const { id, password, email, authentication } = value;
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
          <InputBox
            Title='이메일'
            name='email'
            placeholder='이메일을 입력해주세요'
            change={change}
            value={email}
          />
          <InputBox
            Title='인증번호'
            name='authentication'
            placeholder='인증번호를 입력해주세요'
            change={change}
            value={authentication}
          />
        </_.Flexbox>
        <PrimaryButton onClick={() => setIndex(Index + 1)} width="400px" height='47px'>
          다음
        </PrimaryButton>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.SignUpMain>
    </_.SignBox>
  )
}

export default SConponent;