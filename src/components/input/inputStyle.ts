import styled from "styled-components";
import { Colors, colorsKeyOfType } from "../../styles/theme/color";

export const MarginBox = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${({ width }) => width ?? "400px"};
`

export const SignContainer = styled(MarginBox)`
  height: 105px;
`

export const InputOutBox = styled.div`
  padding: 14px 20px;
  width: 100%;
  height: 52px;
  background-color: ${Colors.Gray100};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InputMain = styled.input`
  width: calc(100% - 48px);
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

export const TextArea = styled.textarea`
  padding: 14px 20px;
  width: 100%;
  min-height: 120px;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
  border: none;
  outline: none;
  resize: none;
  background-color: ${Colors.Gray100};
  border-radius: 8px;

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
  color: ${props => props.fill ? Colors[props.fill] : Colors.Black};
`

export const RText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  color: ${Colors.Black};
`

export const BetweenBox = styled.div<{bool?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({bool}) => bool ? '-5px' : '0'};
`

export const EmailGapBox = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
`

export const Progress = styled.progress.attrs({
  max: 100
})`
  width: 360px;
  height: 8px;
  appearance: none;
  &::-webkit-progress-bar {
    border-radius: 8px;
    background: ${Colors.Gray100};
  }

  &::-webkit-progress-value {
    border-radius: 8px;
    background: ${Colors.PrimaryGradient};
    transition: 0.3s;
  }
`