import React, { useEffect, useState } from "react";
import SignInput from "../../../components/input/SignInput";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
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
    if (!(value.accountId && PState)) return;
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/sign-in`,
      data: value
    })
      .then((res) => {
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
        navigate('/')
      })
      .catch((err) => {
        alert('네트워크나 아이디와 비번을 확인해주세요!');
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
          <_.LoginBox>
            <_.Title>로그인</_.Title>
            <_.SubTitle>로그인을 하여 서비스를 이용해 보세요.</_.SubTitle>
            <_.Flexbox>
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
                state={PState}
                message={PState ? undefined : '비밀번호 형식에 맞지 않습니다'}
              />
            </_.Flexbox>
            <PrimaryButton onClick={() => postLogin()} width="400px" height='47px'>
              로그인
            </PrimaryButton>
            <BottomTitle LText='회원이 아니신가요?' RText='회원가입' />
          </_.LoginBox>
        </_.Containter>
      </_.BlurBox>
    </>
  )
}

export default Login;