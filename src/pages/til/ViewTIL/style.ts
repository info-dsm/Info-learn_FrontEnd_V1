import { Colors } from '../../../styles/theme/color';
import styled from "styled-components";
import { Fonts, fontsKeyOfType } from '../../../styles/theme/font';

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

export const DefaultWidth = styled.div`
  width: 720px;
  @media only screen and (max-width: 740px) {
    width: 94%;
  }
`

export const Evaluation = styled.div`
  width: 100%;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  gap: 40px;
  background: ${Colors.White};
`

export const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  gap: 12px;
  background: ${Colors.White};
`

export const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  object-fit: center;
  object-position: center center;
`

export const CommentInput = styled.input`
  width: calc(100% - 110px);
  min-width: 200px;
  padding: 14px 12px;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.Black};
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${Colors.White};
  display: flex;
  align-items: center;

  &::placeholder {
    color: ${Colors.Gray500};
  }
`

interface textProps {
  font?: fontsKeyOfType;
}

export const TILDiv = styled.div.attrs({
  spellCheck: true,
  contentEditable: true
})<textProps>`
  width: 100%;
  background: white;
  border: none;
  outline: none;
  font-size: ${props => props.font ? Fonts[props.font].size : Fonts["Default"].size};
  font-weight: ${props => props.font ? Fonts[props.font].weight : Fonts["Default"].weight};
`

export const TILContainer = styled.div.attrs({
  contentEditable: true
})`
  width: 100%;
`