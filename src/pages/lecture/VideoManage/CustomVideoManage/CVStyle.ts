import {Colors} from "../../../../styles/theme/color";
import styled, {keyframes} from "styled-components";

const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`
const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const IconShow = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 100%;
  }
  80% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
`
const SpeedShow = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 100%;
  }
  79% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 100%;
  }
  80% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
`
const VolumeShow = keyframes`
  0% {
    width: 15px;
  }
  100% {
    width: 70px;
  }
`

export const SliceDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: fit-content;
`
export const SDiv = styled.div<{ isH: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  cursor: ${props => props.isH ? "default" : "pointer"};
  background: none;

  &:hover {
    background: ${props => props.isH ? "none" : Colors.Gray900};
  }
`
export const ShowIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${IconShow} 1.25s;
  padding: 6px;
  opacity: 0;
`
export const SettingDiv = styled.div`
  bottom: 75px;
  right: 25px;
  position: absolute;
  width: 200px;
  height: fit-content;
  border-radius: 8px;
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to right, rgba(0, 128, 255, 1), rgba(184, 0, 255, 1));
`
export const ShowSpeed = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${SpeedShow} 1.25s;
  color: white;
  font-size: 26px;
  width: 80px;
  padding: 4px;
  opacity: 0;
`
export const VolumeBar = styled.input<{ data: number }>`
  width: 70px;
  height: 5px;
  margin-left: -10px;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  background: linear-gradient(to right, white ${props => props.data}%, gray ${props => props.data}%);
  animation: ${VolumeShow} 200ms ease-out;

  &[type=range]:focus {
    outline: none;
  }

  &[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: none;
  }

  &[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: white;
    cursor: pointer;
    height: 14px;
    width: 14px;
    border-radius: 100%;
  }

  &[type=range]::-webkit-slider-thumb::before {
    content: '';
    width: 70px;
    height: 5px;
    background: white;
  }

  &[type=range]::-webkit-slider-thumb::after {
    content: '';
    width: 70px;
    height: 5px;
    background: rgba(255, 255, 255, .2);
  }
`
export const PDiv = styled.div`
  width: fit-content !important;
  height: fit-content;
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: start;
`
export const IDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 12px;
`
export const TimeBar = styled.input`
  background: white;
  height: 4px;
  -webkit-appearance: none;
  transition: 0.1s;

  &:hover {
    transform: translateY(4px);
    height: 12px;
  }

  input[type=range] {
    -webkit-appearance: none;
    overflow: hidden;
    width: 100%;
    height: 6px;
    cursor: pointer;
    border-radius: 0;
  }

  &[type=range]:focus {
    outline: none;
  }

  &[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
  }

  &[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${Colors["FPrimary500"]};
    cursor: pointer;
    height: 12px;
    width: 12px;
    border-radius: 100%;
  }
`
export const CustomVDiv = styled.div<{ fade: boolean }>`
  width: 100%;
  height: 120px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: ${props => props.fade ? FadeOut : FadeIn} 625ms;
`
export const CDiv = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  aspect-ratio: 16 / 9;
  position: relative;
`
export const Video = styled.video`
  background-color: black;
  width: 100%;
  height: 100%;
`
