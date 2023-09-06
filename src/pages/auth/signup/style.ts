import styled, { keyframes } from "styled-components";
import { Colors, colorsKeyOfType } from "../../../styles/theme/color";

interface flex {
  gap?: number;
  justify?: string;
  align?: string;
  direction?: string;
  wrap?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
}

export const FlexDiv = styled.div<flex>`
  display: flex;
  justify-content: ${props => props.justify ?? "flex-start"};
  align-items: ${props => props.align ?? "flex-start"};
  flex-wrap: ${props => props.wrap ?? "nowrap"};
  flex-direction: ${props => props.direction ?? "row"};
  gap: ${props => props.gap ?? 0}px;
  width: ${props => props.width ?? "auto"};
  height: ${props => props.height ?? "auto"};
  margin: ${props => props.margin ?? "0"};
  padding: ${props => props.padding ?? "0"};
`

export const Circle = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 100%;
  position: fixed;
`

export const TopCircle = styled(Circle)`
  background-color: ${Colors.FPrimary500};
  top: -200px;
  left: -200px;
`

export const BottomCircle = styled(Circle)`
  background-color: ${Colors.SPrimary500};
  bottom: -200px;
  right: -200px;
`

export const BlurBox = styled.div`
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

export const SignBox = styled.div<{ bool: boolean, visible?: boolean, reverse?: boolean}>`
  position: absolute;
  margin: 18.5vh 0 0 0;
  z-index: ${({bool}) => bool ? 99 : 10};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-name: ${({ bool, reverse }) =>  bool ? slideIn(reverse) : slideOut(reverse)};
  visibility: ${({visible}) => visible ? 'hidden' : 'visible'};
`

export const InputOutBox = styled.div`
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

export const InputMain = styled.input`
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

export const Icon = styled.i<IconBoxProps>`
  font-size: ${(props) => props.size ?? 24}px;
  color: ${(props) => props.fill ? Colors[props.fill] : Colors.Black};
`
export const BeforeIcon = styled(Icon)<{ bool?: boolean }>`
  position: absolute;
  top: 12px;
  left: -64px;
  cursor: pointer;
`

export const BottomBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`

export const ExText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.Gray400};
`

export const MoveText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.FPrimary500};
  display: flex;
  align-items: center;
  cursor: pointer;
`

const slideIn = (bool?: boolean) => keyframes`
  0% {
    opacity: 0;
    transform: translateX(${bool ? '-470px' : '470px'});
    pointer-events: none;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    pointer-events:auto;
  }
`;

const slideOut = (bool?: boolean) => keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
    pointer-events:auto;
  }
  100% {
    opacity: 0;
    transform: translateX(${bool ? '470px' : '-470px'});
    pointer-events: none;
  }
`;

export const ImageOutBox = styled.div<{img?: string | null}>`
  width: 400px;
  height: 200px;
  background: ${({img}) => img ? `url(${img})` : Colors.Gray100};
  background-size: cover;
  background-position: center center;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
`

export const ImageBlur = styled.div`
  width: 400px;
  height: 200px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(60px);
`

export const IamgeInput = styled.input.attrs({
  type: 'file',
  id: 'file',
  accept: 'image/*'
})`
  display: none;
`

export const ImageSelectBox = styled.label.attrs({
  htmlFor: 'file'
})<{img?: string | null}>`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background: ${({img}) => img ? `url(${img})` : 'url("")'}, ${Colors.Gray100};
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const ForwardBox = styled(ImageBlur)`
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`