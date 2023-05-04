import React from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import BottomTitle from "./BottomTitle";
import ImageView from "./ImageView";
import * as _ from './style'

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
  postSignup: () => void;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  ImgString: string | ArrayBuffer | null;
  setImgString: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

const LConponent = ({ value, change, Index, setIndex, postSignup, ...Props }: ComponentsProps) => {
  const { verified, authentication, nickname } = value;
  
  return (
    <_.SignBox bool={Index === 2} visible={!(verified && authentication)}>
      <_.SignUpMain>
        <_.BeforeIcon
          className="ri-arrow-left-s-line"
          onClick={() => setIndex(1)}
        />
        <_.Title>회원가입</_.Title>
        <_.SubTitle>회원가입을 하여 서비스를 이용해보세요</_.SubTitle>
        <_.Flexbox>
          <ImageView {...Props} />
          <SignInput
            Title='닉네임'
            name='nickname'
            placeholder='별명을 입력해주세요'
            change={change}
            value={nickname}
          />
        </_.Flexbox>
        <Button onClick={() => postSignup()} width="400px" height='47px'>
          회원가입
        </Button>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.SignUpMain>
    </_.SignBox>
  )
}

export default LConponent;