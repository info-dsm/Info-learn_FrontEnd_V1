import styled from "styled-components";
import {Colors} from "../../styles/theme/color";

export const Container = styled.div<{ bool?: boolean }>`
  width: calc(100% - 6px);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  transition: 0.3s;
  background: ${({bool}) => bool!==undefined ? bool ? Colors.PrimaryGradient : Colors.Gray100 : Colors.White};
`

export const TitleGap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`