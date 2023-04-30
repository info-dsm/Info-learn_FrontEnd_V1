import styled from "styled-components";
import { Colors } from "../../styles/theme/color";

export const Container = styled.div`
    display: flex;
    margin-top: 80px;
    flex-direction: column;
    gap: 40px;
`

interface flex {
    gap?: number;
    justify?: string;
    align?: string;
    direction?: string;
    wrap?: string;
    width?: string;
    height?: string;
    margin?: string;
    isTitle?: boolean;
}

export const Tag = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: white;
  cursor: pointer;
`
export const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  margin: 40px 0;
`
export const PostDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 40px;
  height: fit-content;
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`
export const DefaultWidth = styled.div`
  width: 1000px;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
export const Image = styled.img`
  width: 80px;
  height: 80px;
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

  p {
    ${props => props.isTitle ? `font-size:40px;font-weight:600;color:${Colors["Gray600"]}` : null};
  }
`