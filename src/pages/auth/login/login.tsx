import React, { useEffect, useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { Button } from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Text } from "../../../components/text";
import { Colors } from "../../../styles/theme/color";
import { toast } from "react-hot-toast";
import BottomTitle from "./BottomTitle";
import axios from 'axios';
import * as _ from './style';

type ValueType = 'accountId' | 'password';

const Login = () => {
  const navigate = useNavigate()
  const [cookies, setCookie,] = useCookies();
  const [PState, setPState] = useState<boolean | undefined>();
  const [value, setValue] = useState<{
    [key in ValueType]: string
  }>({
    accountId: '',
    password: ''
  });

  const ChangeValue = (name: string, data: string): void => {
    setValue((value) => {
      return {
        ...value,
        [name]: data
      }
    })
  }

  const passwordCheck = (name: string, data: string) => {
    ChangeValue(name, data);
    if (!data) setPState(undefined)
    else if (data.match(/^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)) {
      setPState(true);
    }
    else {
      setPState(false)
    }
  }

  const postLogin = () => {
    if (!(value.accountId)) {
      toast.error('아이디를 입력해주세요')
      return
    };
    if(!PState) {
      toast.error('비밀번호가 잘못됐습니다');
      return;
    }
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/sign-in`,
      data: value
    })
      .then((res) => {
        toast.success('로그인에 성공했습니다');
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
        navigate('/')
      })
      .catch((err) => {
        if(err.request) {
          toast.error('네트워크를 확인해주세요!');
        } else {
          toast.error('아이디와 비번을 확인해주세요!');
        }
        console.log(err);
      })
  }

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      navigate('/');
    }
  }, [])

  return (
    <>
      <_.TopCircle />
      <_.BottomCircle />
      <_.BlurBox>
        <_.Containter>
          <_.FlexDiv direction='column'>
            <_.FlexDiv direction='column' gap={10}>
              <Text font="Title1">로그인</Text>
              <Text font="Body2" color={Colors.Gray400}>로그인을 하여 서비스를 이용해 보세요</Text>
            </_.FlexDiv>
            <_.FlexDiv direction='column' margin="80px 0 56px 0" gap={16}>
              <SignInput
                Title='아이디'
                name='accountId'
                placeholder='아이디를 입력해주세요'
                change={ChangeValue}
                value={value.accountId}
              />
              <SignInput
                Title='비밀번호'
                name='password'
                placeholder='비밀번를 입력해주세요'
                change={passwordCheck}
                value={value.password}
                eyes={true}
                />
            </_.FlexDiv>
            <Button onClick={() => postLogin()} width="400px" height='47px'>
              로그인
            </Button>
            <BottomTitle LText='회원이 아니신가요?' RText='회원가입' />
          </_.FlexDiv>
        </_.Containter>
      </_.BlurBox>
    </>
  )
}

export default Login;