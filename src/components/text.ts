import styled from "styled-components";
import {Fonts, fontsKeyOfType} from "../styles/theme/font";

interface text {
    color?: string;
    gradient?: boolean;
    font?: fontsKeyOfType;
}

export const Text = styled.p<text>`
  font-size: ${props => props.font ? Fonts[props.font].size : Fonts["Default"].size};
  font-weight: ${props => props.font ? Fonts[props.font].weight : Fonts["Default"].weight};
  color: ${props => props.color ?? "black"};
  background: ${props => props.gradient ? "linear-gradient(90deg, #0080FF 0%, #B800FF 100%)" : "none"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${props => props.gradient ? "transparent" : "none"};
  word-break: keep-all;
`