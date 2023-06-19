import React from "react";
import styled, {keyframes} from "styled-components";
import {Colors} from "../../styles/theme/color";
import {Text} from "../../components/text";
import Icon from "../../assets/Icon";

const ChapterManage = () => {
    return (
        <BackBlur>
            <BackDiv>
                <TitleDiv>
                    <Text font="Title2" gradient>챕터 관리</Text>
                    <Icon icon="close" clicked={()=>console.log('asdf')}/>
                </TitleDiv>
            </BackDiv>
        </BackBlur>
    )
}
export default ChapterManage

const OpacityA = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
`
const BackDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 32px;
  border-radius: 8px;
  background-color: ${Colors["Gray100"]};
`
const BackBlur = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  z-index: 2;
  transition: opacity .3s ease-in;
  animation: ease 0.2s ${OpacityA};
  display: flex;
  align-items: center;
  justify-content: center;
`
