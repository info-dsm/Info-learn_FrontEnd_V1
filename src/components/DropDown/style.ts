import styled, { keyframes } from "styled-components";
import { Colors, colorsKeyOfType } from "../../styles/theme/color";

export const Container = styled.div`
    width: 120px;
    height: 29px;
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    background: ${Colors.White};
    border-radius: 4px;
`

export const BigContainer = styled.div`
  width: 426px;
  height: 52px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  background: ${Colors.Gray100};
  border-radius: 8px;
`

interface IconBoxProps {
    size?: number;
    fill?: colorsKeyOfType;
}

export const Icon = styled.i<IconBoxProps>`
    font-size: ${(props) => props.size ?? 16}px;
    color: ${(props) => props.fill ? Colors[props.fill] : Colors.Black};
`

export const Backgorund = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
`

export const Contents = styled.div<{bool?: boolean}>`
    display: ${({bool}) => bool ? 'flex' : 'none'};
    width: 120px;
    max-height: 145px;
    position: absolute;
    background: ${Colors.White};
    flex-direction: column;
    padding: 6px 12px;
    border-radius: 4px;
    gap: 12px;
    margin: 29px 0 0 -12px;
    animation-duration: 0.1s;
    animation-fill-mode: forwards;
    animation-name: ${({ bool }) => bool !== undefined ? bool ? slideInDown : slideOutUp : undefined};
    overflow-y: scroll;

    p {
      cursor: pointer;
    }
    
    &::-webkit-scrollbar {
        width: 10px;
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

export const BigContents = styled(Contents)`
  width: 426px;
  height: 260px;
  padding: 14px 20px;
  border-radius: 8px;
  gap: 20px;
  margin: 52px 0 0 -20px;
  background: ${Colors.Gray100};

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
    pointer-events:auto;
  }
`;

export const slideOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
    pointer-events:auto;
  }
  100% {
    opacity: 0;
    transform: translateY(-29px);
    pointer-events: none;
  }
`;