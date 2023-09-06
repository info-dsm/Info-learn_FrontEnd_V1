import styled, {keyframes} from "styled-components";
import {Colors} from "../../../styles/theme/color";

const AppearTag = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1.0);
  }
`

const barAnim = (width: number) => keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: ${width}%;
  }
`
export const HideBar = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: ${Colors["White"]};
  transition: 1s;
  animation: ease 1s ${props => barAnim(props.width)};
`
export const PBar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: ${Colors["PrimaryGradient"]};
  display: flex;
  justify-content: flex-end;
`
export const OutP = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${Colors["White"]};
  padding: 4px;
`
export const EditDiv = styled.div`
  display: flex;
  gap: 10px;
`
export const TagDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`
export const TDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const LBody = styled.div`
  width: 1000px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 120px;

  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
export const TitleImg = styled.div<{ src: string }>`
  height: 460px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(180deg, rgba(242, 246, 248, 0) 50%, #F2F6F8 100%), url(${props => props.src});
`

export const IcoBtn = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: ${Colors["Gray100"]};
  }
`
export const IDiv = styled.div`
  display: flex;
  gap: 10px;
`
export const VCell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 32px;
  justify-content: space-between;
`
export const VLChild = styled.div`
  width: 100%;
  overflow-y: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: ${Colors["White"]};
`
export const VideoList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${Colors["Gray200"]};
`
export const Sequence = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
  gap: 20px;
`
export const RemoveDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
`
export const DropCoverDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
export const AddCDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`
export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`
export const FileLabel = styled.label<{ url?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-image: url(${props => props.url ?? "none"});
  border-radius: 8px;
  background-size: cover;
  background-position: center center;

  svg, p {
    display: ${props => props.url ? 'none' : 'block'};
  }
`
export const FileInput = styled.input`
  display: none;
`
export const RBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`
export const RDiv = styled.div<{ flex: string }>`
  width: 1000px;
  height: fit-content;
  padding: 40px 0 40px;
  display: flex;
  justify-content: ${props => props.flex};

  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
export const TagInputDiv = styled.div`
  width: 100%;
  height: fit-content;
  gap: 10px;
  display: flex;
`
export const Tag = styled.div`
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  display: flex;
  padding: 6px 12px;
  gap: 8px;
  animation: ${AppearTag} 0.4s ease;
  background-color: ${Colors["Gray100"]};

  svg {
    cursor: pointer;
  }
`
export const TagDivs = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
export const TagRDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: 0.3s;
`
export const Thumbnail = styled.div`
  position: relative;
  display: flex;
  width: 120%;
  height: 1%;
  aspect-ratio: 16 / 9;
  background-color: ${Colors["Gray100"]};
  border-radius: 8px;
  transition: 0.3s;
`
export const MainInfo = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  gap: 40px;
  @media only screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`
export const TextDiv = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Content = styled.div`
  width: 1000px;
  padding: 80px 0 167px;
  gap: 40px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`