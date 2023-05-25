import {Colors} from "../../styles/theme/color";
import React from "react";
import * as _ from './style';
import styled, {keyframes} from "styled-components";
import {Fonts, fontsKeyOfType} from "../../styles/theme/font";

export const SkeletonTag = () => {
    return (
        <>
            <PrettyDiv height={`29.3px`} width={`${Math.random() * 150 + 40}px`} round={4}/>
        </>
    )
}

const Anim = keyframes`
  0% {
    background-position-x: 100%;
  }

  40%, 100% {
    background-position-x: 0;
  }
`
const PrettyDiv = styled.div<{ height?: string, font?: fontsKeyOfType, width: string, round?: number }>`
  height: ${props => props.font ? Fonts[props.font].size : props.height || 'auto'};
  width: ${props => props.width};
  border-radius: ${props => (props.round ?? 0) + 'px'};
  background-color: ${Colors.Gray500};
  background-size: 300% 100%;
  background-image: -webkit-linear-gradient(left, #e0e0e0 30%, #f5f5f5 50%, #e0e0e0 70%);
  background-image: -o-linear-gradient(left, #e0e0e0 30%, #f5f5f5 50%, #e0e0e0 70%);
  background-image: linear-gradient(-90deg, #e0e0e0 30%, #f5f5f5 50%, #e0e0e0 70%);
  -webkit-animation: ${Anim} 2.5s infinite ease-out;
  animation: ${Anim} 2.5s infinite ease-out;
`;