import React, { useState, useEffect } from "react";
import 'remixicon/fonts/remixicon.css';
import FConponent from "./FComponent";
import SConponent from "./SComponent";
import LConponent from "./LComponent";
import axios from 'axios';
import * as _ from './style'
import { useNavigate } from "react-router-dom";
import Message from "../../../components/Message";

type ValueType = 'id' | 'password' | 'email' | 'verified' | 'authentication' | 'nickname';

const Signup = () => {
    const navigate = useNavigate();
    const [coord, setCoord] = useState<[number, number, boolean] | undefined>();
    const [Index, setIndex] = useState(0);
    const [ImgFile, setImg] = useState<File>();
    const [ImgString, setImgString] = useState<string | ArrayBuffer | null>(null)
    const [value, setValue] = useState<{
        [key in ValueType]: string
    }>({
        id: '',
        password: '',
        email: '',
        verified: '',
        authentication: '',
        nickname: ''
    });

    const ChangeValue = (name: string, data: string): void => {
        setValue((value) => {
            return {
                ...value,
                [name]: data
            }
        })
    }

    const postSignup = () => {
        if (Object.values(value).filter((v) => v === '').length || !ImgFile) return;
        const fileName = ImgFile.name.split('.');
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/auth/sign-up/student`,
            data: {
                accountId: value.id,
                password: value.password,
                email: value.verified,
                authCode: value.authentication,
                nickname: value.nickname,
                profileImage: {
                    fileName: fileName.join('.'),
                    contentType: `image/${fileName[1]}`
                }
            }
        })
            .then((res) => {
                PutS3(res.data.url);
                alert('회원가입에 성공했습니다!');
                navigate('/');
            })
            .catch((err) => {
                alert('네트워크를 확인해주세요!');
                console.log(err);
            })
    }

    const PutS3 = (url: string) => {
        axios({
            method: 'PUT',
            url: url,
            headers: {
                "Content-Type": `${ImgFile?.name.split('.')[1]}`
            },
            data: ImgFile
        })
            .then(response => console.log(response))
            .catch(error => console.error(error));
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
        setImgString,
        postSignup,
        post: setCoord
    }

    const preventClose = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "";
    }

    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();

        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
    }, []);

    return (
        <>  
            <_.TopCircle />
            <_.BottomCircle />
            <_.BlurBox>
                <FConponent {...ComponentValue} />
                <SConponent {...ComponentValue} />
                <LConponent {...LComponentValue} />
            </_.BlurBox>
        <Message
            x={coord && coord[0]}
            y={coord && coord[1]} 
            bool={coord && coord[2]}
        >
            없어도 되는 정보입니다
        </Message>
        </>
    )
}

export default Signup;