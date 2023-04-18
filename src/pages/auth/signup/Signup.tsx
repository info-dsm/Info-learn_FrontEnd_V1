import React, { useState } from "react";
import 'remixicon/fonts/remixicon.css';
import FConponent from "./FComponent";
import SConponent from "./SComponent";
import LConponent from "./LComponent";
import * as _ from './style'

type ValueType = 'id' | 'password' | 'email' | 'authentication' | 'nickname';
interface ValueProps {
  name: string;
  data: string;
}

const Signup = () => {
  const [Index, setIndex] = useState(0);
  const [ImgFile, setImg] = useState<File>();
  const [ImgString, setImgString] = useState<string | ArrayBuffer | null>(null)
  const [value, setValue] = useState<{
    [key in ValueType]: string
  }>({
    id: '',
    password: '',
    email: '',
    authentication: '',
    nickname: ''
  });

  const ChangeValue = ({ name, data }: ValueProps): void => {
    setValue((value)=>{return{
      ...value,
      [name]: data
    }})
  }

  const ComponentValue = {
    value,
    change: ChangeValue,
    Index,
    setIndex
  }

  const LComponentValue = {
    ...ComponentValue,
    setImg,
    ImgString,
    setImgString
  }

  return (
    <>
      <_.TopCircle />
      <_.BottomCircle />
      <_.BlurBox>
        <FConponent {...ComponentValue} />
        <SConponent {...ComponentValue} />
        <LConponent {...LComponentValue} />
      </_.BlurBox>
    </>
  )
}

export default Signup;