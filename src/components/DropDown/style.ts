import styled, {keyframes} from "styled-components";
import {Colors, colorsKeyOfType} from "../../styles/theme/color";

export const InContent = styled.div`
  width: 100%;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  &:hover{
    background-color: ${Colors.Gray200};
  }
`

export const Container = styled.div<{ color?: colorsKeyOfType }>`
  width: 120px;
  height: 29px;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  background: ${props => props.color ?? Colors.White};
  border-radius: 4px;
`

export const BigContainer = styled.div<{ color?: colorsKeyOfType, width?: string }>`
  width: ${props => props.width ?? "426px"};
  height: 52px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.color ?? Colors["Gray100"]};
  border-radius: 8px;
  position: relative;
`

interface IconBoxProps {
    size?: number;
    fill?: colorsKeyOfType;
}

export const Icon = styled.i<IconBoxProps>`
  font-size: ${(props) => props.size ?? 16}px;
  color: ${(props) => props.fill ? Colors[props.fill] : Colors.Black};
`

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Contents = styled.div<{ bool?: boolean }>`
  display: ${({bool}) => bool ? 'flex' : 'none'};
  width: 120px;
  max-height: 145px;
  position: absolute;
  background: ${Colors.White};
  flex-direction: column;
  padding: 6px 12px;
  border-radius: 4px;
  gap: 12px;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-name: ${({bool}) => bool !== undefined ? bool ? slideInDown : slideOutUp : undefined};
  overflow-y: scroll;

  p {
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Colors.PrimaryGradient};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${Colors.White};
    border-radius: 4px;
  }
`

export const BigContents = styled(Contents)<{ width?: string }>`
  width: ${props => props.width ?? "426px"};
  min-height: 52px;
  max-height: 260px;
  padding: 8px;
  border-radius: 8px;
  gap: 0;
  top: 62px;
  left: 0;
  background: ${Colors.Gray100};
  box-shadow: ${Colors.Gray400} 0 10px 100px;

  &::-webkit-scrollbar-track {
    background: ${Colors.Gray100};
    border-radius: 8px;
  }
`

export const slideInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-29px);
    pointer-events: none;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export const slideOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
  100% {
    opacity: 0;
    transform: translateY(-29px);
    pointer-events: none;
  }
`;