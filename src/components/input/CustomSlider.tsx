import React, {useState} from "react";
import styled from "styled-components";

interface CustomSliderProps {
    width?: string,
    height?: string,
    backColor?: string,
    beforeColor?: string,
    afterColor?: string,
    border?: string,
    thumbWidth?: string,
    thumbHeight?: string,
    thumbColor?: string,
    onChange?: (value: number) => void
}

const CustomSlider = (props: CustomSliderProps) => {
    const [click, setClick] = useState(false);

    return <>
        <CenterDiv
            onMouseDown={() => setClick(true)}
            onMouseUp={() => setClick(true)}
        >
            <OutDiv
                height={props.height ?? '8px'}
                width={props.width ?? '100px'}
                border={props.border ?? '0'}
                color={props.backColor ?? 'white'}>
            </OutDiv>
            <Circle
                draggable={true}
                height={props.height ?? '8px'}
                width={props.width ?? '100px'}
                beforeColor={props.beforeColor ?? 'white'}
                afterColor={props.afterColor ?? 'black'}
                thumbHeight={props.thumbHeight ?? '16px'}
                thumbWidth={props.thumbWidth ?? '16px'}
                color={props.thumbColor ?? 'blue'}
                onMouseMove={event => click && props.onChange && props.onChange(+event.currentTarget.style.left.replace('px', ''))}
            />
        </CenterDiv>
    </>;
};

const CenterDiv = styled.div`
  height: fit-content;
  //display: flex;
  //align-items: center;
  cursor: pointer;
`
const OutDiv = styled.div<{
    height: string, width: string, border: string
}>`
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.color};
  border-radius: ${props => props.border};
`
const Circle = styled.div<{
    height: string, width: string, thumbWidth: string, thumbHeight: string, color: string, afterColor: string, beforeColor: string
}>`
  position: absolute;
  height: ${props => props.thumbHeight};
  width: ${props => props.thumbWidth};
  background-color: ${props => props.color};
  border-radius: 100%;

  :after {
    content: '';
    height: ${props => props.height};
    width: ${props => props.width};
    background-color: ${props => props.afterColor};
  }

  :before {
    content: '';
    height: ${props => props.height};
    width: ${props => props.width};
    background-color: ${props => props.afterColor};
  }
`

export default CustomSlider;