import styled from "styled-components";
import {Colors} from "../../styles/theme/color";

export const Triangle = styled.img`
  height: 12px;
  width: 12px;
`
export const PlayCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 24px;
  width: 24px;
  outline: ${Colors["Gray100"]} 4px solid;
  background-color: ${Colors["FPrimary500"]};
  position: absolute;
  bottom: -12px;
  right: -12px;
`
export const UpDiv = styled.div`
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  position: relative;
  transition: 0.1s;
`
export const InfoDiv = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`
export const PostBody = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 24px;

  &:hover .upDiv {
    transform: translateX(-10px);
  }
  
  cursor: pointer;
`
