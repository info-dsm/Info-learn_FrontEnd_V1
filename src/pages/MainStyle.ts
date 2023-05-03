import styled from "styled-components";

interface flexProps {
    flex?: boolean;
}
export const DefaultWidth = styled.div<flexProps>`
  width: 1000px;
  display: ${props => props.flex ? "flex" : "block"};
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
