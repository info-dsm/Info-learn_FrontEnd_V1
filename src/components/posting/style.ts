import {Colors} from "../../styles/theme/color";
import styled from "styled-components";

export const UpDiv = styled.div`
  border-radius: 8px;
  width: 100%;
  position: relative;
  transition: 0.2s;
  aspect-ratio: 16 / 9;
`
export const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
`
export const BottomDiv = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
`
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
  right: 20px;
`
export const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
export const InfoDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`

interface imgProps {
    url: string;
}

export const Img = styled.div<imgProps>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.url});
  background-color: ${Colors["Gray200"]};
  border-radius: 8px;
  background-size: 106%;
  background-position: center center;
  background-repeat: no-repeat;
  transition: 0.3s;

  &:hover {
    background-size: 120%;
  }
`
export const PostBody = styled.div`
  width: 244px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  cursor: pointer;

  &:hover .upDiv {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.12) 0 16px 16px;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`