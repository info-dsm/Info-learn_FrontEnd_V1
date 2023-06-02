import React from "react";
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";
import * as _ from './style';

interface CommentProps {
  profile: string;
  name: string;
  createdAt: string;
  text: string;
}

const Comment = ({ profile, name, createdAt, text }: CommentProps) => {
  return (
    <_.CommentContainer>
      <_.FlexDiv width="160px" gap={12}>
        <_.UserProfile src={profile} alt='' />
        <_.FlexDiv direction="column" gap={4}>
          <Text font="Body1">{name}</Text>
          <Text font="Body4" color={Colors.Gray500}>{createdAt.split('T')[0].split('-').join('.')}</Text>
        </_.FlexDiv>
      </_.FlexDiv>
      <_.FlexDiv>
        {
          text[0] === '@' ?
            <>
              <Text>
                <span style={{color: Colors.FPrimary500}}>{text.split(' ')[0]}</span> {text.split(' ').slice(1).join(' ')}
              </Text>
            </>
            :
            <Text>{text}</Text>
        }
      </_.FlexDiv>
    </_.CommentContainer>
  )
}

export default Comment;