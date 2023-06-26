import { Colors } from './../../../styles/theme/color';
import styled from "styled-components";

export const TILContainer = styled.div.attrs({
  contentEditable: true
})`
  width: 100%;
  min-height: 100%;
  padding: 0 15.6% 30vh;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
`

export const TILBlock = styled.div.attrs({
  contentEditable: true,
  spellCheck: true
})`
  &:empty::after {
    content: attr(placeholder);
    color: ${Colors.Gray500};
    cursor: text;
  }
`

export const style = {
  Text: {
    minHeight: '21px',
    fontWeight: 400,
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    margin: '1px 0'
  },
  Content: {
    maxWidth: '100%',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    caretColor: 'rgb(55, 53, 47)',
    padding: '3px 2px'
  }
}