import React from "react";
import styled from "styled-components";
import {Text} from "../../../../components/text";
import {Colors} from "../../../../styles/theme/color";

const CSetting = ({sStatus, sOpen}: { sStatus:  React.Dispatch<React.SetStateAction<number>>, sOpen:  React.Dispatch<React.SetStateAction<boolean>> }) => {
    const speed: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    const statusChange = (value: number) => {
        sStatus(value);
        sOpen(false);
    }

    return (
        <SADiv>
            {speed.map((value, index) =>
                <Atr key={index} onClick={() => statusChange(value)}>
                    <Text color={Colors.White}>{value === 1 ? '보통' : value}</Text>
                </Atr>
            )}
        </SADiv>
    )
}

export default CSetting

const Atr = styled.div`
  width: 100%;
  padding: 8px 18px;

  &:hover {
    background: ${Colors.Gray800};
  }
`
const SADiv = styled.div`
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
`
