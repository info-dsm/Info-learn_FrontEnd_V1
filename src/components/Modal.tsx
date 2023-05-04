import React from "react";
import {Colors} from "../styles/theme/color";
import styled, {keyframes} from "styled-components";
import {Text} from "./text";
import {Button} from "./button/Button";

interface modalProps {
    title: string;
    explanation?: string;
    blue?: boolean;
    left?: string;
    right?: string;
    onLeft?: () => void;
    onRight?: () => void;
}

const Modal = ({...p}: modalProps) => {
    return (
        <BackBlur>
            <ModalDiv>
                <TextDiv>
                    <Text font="Title2">{p.title}</Text>
                    <Text font="Body2">{p.explanation}</Text>
                </TextDiv>
                <ButtonDiv>
                    <Button onClick={p.onLeft} gray width="100%">{p.left ?? "취소"}</Button>
                    <Button onClick={p.onRight} blue={p.blue} red={!p.blue} width="100%">{p.right ?? "확인"}</Button>
                </ButtonDiv>
            </ModalDiv>
        </BackBlur>
    )
}

export default Modal

const TextDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  height: fit-content;
`
const ModalDiv = styled.div`
  width: 400px;
  height: fit-content;
  padding: 40px;
  background-color: ${Colors["White"]};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  p {
    text-align: center;
    line-height: 160%;
  }
`
const blur = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const BackBlur = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  animation: ${blur} 0.3s ease;
`
