import React, { useState } from "react";
import { Text } from "../../../components/text";
import { Button } from "../../../components/button/Button";
import { Colors } from "../../../styles/theme/color";
import * as _ from './style';
import Comment from "./Comment";

const TIL = () => {
  const [value, setValue] = useState<string>('');

  return (
    <>
      <_.DefaultWidth>
        { }
      </_.DefaultWidth>
      <_.Evaluation>
        <_.FlexDiv align='center' direction='column' gap={10}>
          <Text gradient={true} font='Title2'>글이 마음에 드셨나요?</Text>
          <Text color={Colors.Gray500}>의견을 들려주세요</Text>
        </_.FlexDiv>
        <_.FlexDiv gap={10}>
          <Button font="Body1" gray={true} like={true}>12</Button>
          <Button font="Body1" gray={true}>구독</Button>
          <Button font="Body1" gray={true} share={true}>공유</Button>
        </_.FlexDiv>
      </_.Evaluation>
      <_.DefaultWidth>
        <_.FlexDiv align='center' direction='column' padding='120px 0' gap={24}>
          <_.FlexDiv gap={10} width='100%'>
            <Text font='Title2'>댓글</Text>
            <Text gradient={true} font='Title2'>3</Text>
          </_.FlexDiv>
          <_.FlexDiv gap={10} width='100%'>
            <_.CommentInput
              placeholder='댓글 입력'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
              value={value}
            />
            <Button font="Body1" blue={true}>댓글 등록</Button>
          </_.FlexDiv>
          <_.FlexDiv direction='column' gap={12} width="100%">
            <Comment 
              profile=''
              name='이이름'
              createdAt={new Date().toISOString()}
              text='@누군가 결국 이렇게 되었나...'
            />
          </_.FlexDiv>
        </_.FlexDiv>
      </_.DefaultWidth>
    </>
  )
}

export default TIL;