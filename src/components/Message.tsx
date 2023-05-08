import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Colors } from "../styles/theme/color";
import { Text } from "./text";

interface MessageProps {
    x?: number;
    y?: number;
    bool?: boolean;
}

const Message = ({children, x, y, bool}:  PropsWithChildren<MessageProps>) => {
    return (
        <Container style={{
            top: `${y ?? 0}px`,
            left: `${x ?? 0}px`,
            opacity: `${bool ? 1 : 0}`
        }}>
            <Text font="Body3" color={Colors.White}>{children}</Text>
            <Triangle />
        </Container>
    )
}

export default Message

const Container = styled.div`
    position: fixed;
    padding: 6px 12px;
    background: ${Colors.PrimaryGradient};
    border-radius: 8px;
    z-index: 100;
    transition: opacity 0.5s; 
    transform: translate(-17px, calc(-100% - 20px));
`

const Triangle = styled.div`
    position: fixed;
    width: 0;
    height: 0;
    border-top: 10px solid ${Colors.FPrimary900};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    bottom: -10px;
    left: 16px;
`