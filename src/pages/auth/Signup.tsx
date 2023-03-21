import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Colors, colorsKeyOfType } from "../../styles/theme/color";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router-dom";

interface ValueProps {
  name: string;
  data: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [Index, setIndex] = useState(0);
  const [value, setValue] = useState({
    id: '',
    password: '',
    email: '',
    authentication: '',
    image: '',
    nickname: ''
  });

  const ChangeValue = ({ name, data }: ValueProps): void => {
    setValue({
      ...value,
      [name]: data
    })
  }

  return (
    <>
      <TopCircle />
      <BottomCircle />
      <BlurBox>
        <SignUpMain>
          {!!Index &&
            <BeforeIcon
              fill='Gray400'
              className="ri-arrow-left-s-line"
              onClick={() => setIndex(Index - 1)}
            />
          }
          <Title>회원가입</Title>
          <SubTitle>회원가입을 하여 서비스를 이용해보세요</SubTitle>
          <Flexbox>
            <FirstConponent
              bool={Index === 0}
              change={ChangeValue}
              Fvalue={value.id}
              Svalue={value.password}
            />
            <FirstConponent
              bool={Index === 1}
              change={ChangeValue}
              Fvalue={value.id}
              Svalue={value.password}
            />
            <FirstConponent
              bool={Index === 2}
              change={ChangeValue}
              Fvalue={value.id}
              Svalue={value.password}
            />
          </Flexbox>
          <PrimaryButton onClick={() => setIndex(Index + 1)} width="400px" height='47px'>
            다음
          </PrimaryButton>
          <BottomTitle LText='이미 회원이신가요?' RText='로그인' />
        </SignUpMain>
      </BlurBox>
    </>
  )
}

export default Signup;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
`

interface ComponentProps {
  bool?: boolean | undefined
  Fvalue: string;
  Svalue: string;
  change: ({ name, data }: ValueProps) => void;
}

const FirstConponent = ({ bool, Fvalue, Svalue, change }: ComponentProps) => {
  return (
    <MainBox bool={bool}>
      <InputBox
        Title='Id'
        placeholder='아이디를 입력해주세요'
        change={change}
        value={Fvalue}
      />
      <InputBox
        Title='Password'
        placeholder='영•숫자•기호 포함 8자 이상'
        eyes={false}
        change={change}
        value={Svalue}
      />
    </MainBox>
  )
}

const Circle = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 100%;
  position: fixed;
`

const TopCircle = styled(Circle)`
  background-color: ${Colors.FPrimary500};
  top: -200px;
  left: -200px;
`

const BottomCircle = styled(Circle)`
  background-color: ${Colors.SPrimary500};
  bottom: -200px;
  right: -200px;
`

const BlurBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(240px);
  display: flex;
  justify-content: center;
`

const SignUpMain = styled.div`
  display: flex;
  flex-direction: column;
  margin: 18.5vh 0 0 0;
`

const Title = styled.span`
  font-weight: 600;
  font-size: 40px;
  color: ${Colors.Black};
`

const SubTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Gray400};
  margin: 10px 0 0 0;
`

interface InputProps {
  Title: string;
  placeholder: string;
  eyes?: boolean | undefined;
  change: ({ name, data }: ValueProps) => void;
  value: string;
}

const InputBox = ({ Title, placeholder, eyes, change, value }: InputProps) => {
  const [eye, setEye] = useState(false);
  return (
    <MarginBox>
      <Text>{Title}</Text>
      <InputOutBox>
        <InputMain
          type={eye ? 'password' : 'text'}
          placeholder={placeholder}
          onChange={(e) => change({ name: Title.toLowerCase(), data: e.target.value })}
          value={value}
        />
        {
          eyes !== undefined ?
            eye ?
              <Icon
                fill='Gray400'
                className='ri-eye-off-line'
                onClick={() => setEye(false)}
              />
              :
              <Icon
                fill='Gray400'
                className='ri-eye-line'
                onClick={() => setEye(true)}
              />
            :
            <></>
        }
      </InputOutBox>
    </MarginBox>
  )
}

const MarginBox = styled(SignUpMain) <{ margin?: string }>`
  margin: ${(props) => props.margin ?? '20px 0'};
`

const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
`

const InputOutBox = styled.div`
  margin-top: 10px;
  padding: 14px 20px;
  width: 400px;
  height: 52px;
  background-color: ${Colors.Gray100};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputMain = styled.input`
  width: 316px;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
  border: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
   color: ${Colors.Gray400};
  }
`

interface IconBoxProps {
  size?: number;
  fill?: colorsKeyOfType;
}

const Icon = styled.i<IconBoxProps>`
  font-size: ${(props) => props.size ?? 24}px;
  color: ${(props) => Colors[props.fill!] ?? Colors.Black};
`
const BeforeIcon = styled(Icon)`
  position: absolute;
  transform: translate(-64px, 12px);
  cursor: pointer;
`

interface BottomProps {
  LText: string;
  RText: string;
}

const BottomTitle = ({ LText, RText }: BottomProps) => {
  const navigate = useNavigate();
  return (
    <BottomBox>
      <ExText>{LText}</ExText>
      <MoveText onClick={() => navigate('/login')}>
        <p>{RText}</p>
        <i className="ri-arrow-right-s-line"></i>
      </MoveText>
    </BottomBox>
  )
}

const BottomBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`

const ExText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.Gray400};
`

const MoveText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.FPrimary500};
  display: flex;
  align-items: center;
  cursor: pointer;
`

const MainBox = styled.div<{ bool?: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-name: ${(props) => props.bool === undefined ? '' : props.bool ? slideInRight : slideOutLeft};
`

const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
    height: 0px;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOutLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
    height: 0px;
  }
`;