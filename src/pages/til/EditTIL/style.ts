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

export const style = {
  Text: {
    minHeight: '21px',
    fontWeight: 400,
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    margin: '1px 0'
  }
}