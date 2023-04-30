import styled, { keyframes } from "styled-components";
import { Colors, colorsKeyOfType } from "../../../styles/theme/color";

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

export const slideInDown = keyframes`
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

export const Containter = styled.div`
  position: absolute;
  margin: 18.5vh 0 0 0;
  & * {
    animation-duration: 0;
    animation-fill-mode: forwards;
    animation-name: slideInRight;
  }
  & > :first-child {
    animation: none;
  }
`

export const LoginBox = styled.div`
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

export const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0 56px 0;
  gap: 16px;
  & > :first-child {
    animation-duration: 0.95s;
  }
  & > :last-child {
    animation-duration: 0.8s;
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