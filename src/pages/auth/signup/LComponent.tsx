import React from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import BottomTitle from "./BottomTitle";
import ImageView from "./ImageView";
import * as _ from './style'
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

interface ComponentsProps {
  value: { [key in ValueType]: string };
  change: (name: string, data: string) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  Index: number;
  postSignup: () => void;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  ImgString: string | ArrayBuffer | null;
  setImgString: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  post: React.Dispatch<React.SetStateAction<[number, number, boolean] | undefined>>;
}

const LConponent = ({ value, change, Index, setIndex, postSignup, post, ...Props }: ComponentsProps) => {
  const { verified, authentication, nickname } = value;
  
  return (
    <_.SignBox bool={Index === 2} visible={!!(verified && authentication)}>
      <_.FlexDiv direction='column'>
        <_.BeforeIcon
          className="ri-arrow-left-s-line"
          onClick={() => setIndex(1)}
        />
        <_.FlexDiv direction='column' gap={10}>
        <Text font="Title1">회원가입</Text>
        <Text font="Body2" color={Colors.Gray400}>회원가입을 하여 서비스를 이용해보세요</Text>
        </_.FlexDiv>
        <_.FlexDiv direction='column' margin="80px 0 56px 0" gap={40}>
          <ImageView {...Props} post={post} />
          <SignInput
            Title='닉네임*'
            name='nickname'
            placeholder='별명을 입력해주세요'
            change={change}
            value={nickname}
            post={post}
          />
        </_.FlexDiv>
        <Button onClick={() => postSignup()} width="400px" height='47px'>
          회원가입
        </Button>
        <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
      </_.FlexDiv>
    </_.SignBox>
  )
}

export default LConponent;