import styled from "styled-components";
import {Colors} from "../../styles/theme/color";

export const Container = styled.div<{ bool?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
`

export const ChapterContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background: ${Colors.White};
  border-radius: 8px;
`

export const VideoContainer = styled.div<{ watch?: boolean, bool?: boolean }>`
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
  background: ${({watch, bool}) => watch ? Colors.PrimaryGradient : bool ? Colors.Gray100 : Colors.White};

  &:hover {
    background: ${({watch}) => watch ? Colors.PrimaryGradient: Colors.Gray100};
  }
`

export const TitleGap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`