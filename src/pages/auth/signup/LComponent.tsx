import React from "react";
import InputBox from "../../../components/inputBox";
import { PrimaryButton } from "../../../components/PrimaryButton";
import BottomTitle from "./BottomTitle";
import ImageView from "./ImageView";
import * as _ from './style'

type ValueType = 'id' | 'password' | 'email' | 'authentication' | 'nickname';
interface ValueProps {
  name: ValueType;
  data: string;
}

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: ({ name, data }: ValueProps) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  ImgString: string | ArrayBuffer | null;
  setImgString: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

const LConponent = ({ value, change, Index, setIndex, ...Props }: ComponentsProps) => {
    const {email, authentication, nickname } = value;
    return (
      <_.SignBox bool={Index === 2} visible={!(email && authentication)}>
        <_.SignUpMain>
        <_.BeforeIcon
            className="ri-arrow-left-s-line"
            onClick={() => setIndex(Index - 1)}
          />
          <_.Title>회원가입</_.Title>
          <_.SubTitle>회원가입을 하여 서비스를 이용해보세요</_.SubTitle>
          <_.Flexbox>
            <ImageView {...Props}/>
            <InputBox
              Title='닉네임'
              name='nickname'
              placeholder='별명을 입력해주세요'
              eyes={false}
              change={change}
              value={nickname}
            />
          </_.Flexbox>
          <PrimaryButton onClick={() => {alert('a')}} width="400px" height='47px'>
            회원가입
          </PrimaryButton>
          <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
        </_.SignUpMain>
      </_.SignBox>
    )
  }

export default LConponent;