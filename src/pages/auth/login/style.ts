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

export const Containter = styled.div`
  position: absolute;
  margin: 18.5vh 0 0 0;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-name: ${() => slideIn};
`

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(470px);
    pointer-events: none;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    pointer-events:auto;
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