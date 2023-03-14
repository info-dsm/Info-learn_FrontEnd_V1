import { colorsKeyOfType } from "../styles/theme/color";

export interface ButtonProps {
  width?: string;
  height?: string;
  fill?: colorsKeyOfType;
  icon?: boolean;
  text?: boolean;
}