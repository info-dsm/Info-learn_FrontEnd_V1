import styled, { keyframes } from "styled-components";
import { Colors, colorsKeyOfType } from "../../../styles/theme/color";

export const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  gap: 20px;
  & > :first-child {
    animation-duration: 0.95s;
  }
  & > :last-child {
    animation-duration: 0.8s;
  }
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

export const SignBox = styled.div<{ bool: boolean, visible?: boolean }>`
  position: absolute;
  margin: 18.5vh 0 0 0;
  z-index: ${({bool}) => bool ? 99 : 10};
  & * {
    animation-duration: 0;
    animation-fill-mode: forwards;
    animation-name: ${({ bool }) => bool ? slideInRight : slideOutLeft};
  }
  & > :first-child {
    animation: none;
  }
  visibility: ${({visible}) => visible ? 'hidden' : 'visible'};
`

export const SignUpMain = styled.div`
  display: flex;
  flex-direction: column;
  & button {
    animation-duration: 0.65s;
  }
`

export const Title = styled.span`
  font-weight: 600;
  font-size: 40px;
  color: ${Colors.Black};
  animation-duration: 1.25s;
`

export const SubTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Gray400};
  margin: 10px 0 0 0;
  animation-duration: 1.1s;
`

export const MarginBox = styled(SignUpMain) <{ margin?: string }>`
  margin: ${(props) => props.margin ?? '20px 0'};
`

export const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
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
  color: ${(props) => Colors[props.fill!] ?? Colors.Black};
`
export const BeforeIcon = styled(Icon)<{ bool?: boolean }>`
  position: absolute;
  top: 12px;
  left: -64px;
  cursor: pointer;
  animation-duration: 1.3s;
`

export const BottomBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  animation-duration: 0.5s;
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

export const slideInRight = keyframes`
0% {
  opacity: 0;
  transform: translateY(-100px);
  pointer-events: none;
}
100% {
  opacity: 1;
  transform: translateY(0);
  pointer-events:auto;
}
`;

export const slideOutLeft = keyframes`
0% {
  opacity: 1;
  transform: translateY(0);
  pointer-events:auto;
}
100% {
  opacity: 0;
  transform: translateY(-100px);
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