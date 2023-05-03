import styled from "styled-components";
import { Colors } from "../../styles/theme/color";

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

export const DefaultWidth = styled.div`
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`

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

export const Container = styled.div`
  display: flex;
  gap: 10px;
`

export const Circle = styled.div<{ bool?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  font-weight: ${({bool}) => bool ? 600 : 400};
  font-size: 16px;
  color: ${({bool}) => bool ? Colors.White : Colors.Gray500};
  background: ${({bool}) => bool ? Colors.FPrimary500 : Colors.Gray100};
  transition: 0.3s;
  svg {
    transition: 0.3s;
  }
  &:hover {
    color: ${Colors.White};
    background: ${Colors.FPrimary500};
    font-weight: 600;
    svg {
      fill: ${Colors.White};
    }
  }
`

export const UpCircle = styled(Circle)<{ state: boolean }>`
  display: flex;
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10.4vw;
  bottom: 9.2vh;
  background: ${Colors.White};
  opacity: ${({state}) => state ? 1 : 0};
  transition: 0.3s;
  pointer-events: ${({state}) => state ? 'auto' : 'none'};
`