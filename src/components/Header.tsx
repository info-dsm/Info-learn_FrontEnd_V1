import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {TextButton} from "./button/TextButton";
import {Link} from "react-router-dom";
import TextLogo from "../assets/img/TextLogo.png";
import {Text} from "./text";
import {Colors} from "../styles/theme/color";
import Icon from "../assets/Icon";

interface hoverType {
    [key: string]: boolean,

    isLecture: boolean;
    isCommunity: boolean;
    isSearch: boolean;
    isUser: boolean;
    isAlam: boolean;
}

const Header = () => {
    const [hover, setHover] = useState<hoverType>({
        isLecture: false,
        isCommunity: false,
        isSearch: false,
        isUser: false,
        isAlam: false
    });
    const [dropdownState, setDropdownState] = useState({
        headerColor: false,
        opacity: 0,
        padding: '0',
        height: '0',
        event: 'none'
    });
    const {headerColor, opacity, padding, height, event} = dropdownState;

    const dropDownOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.id;
        setHover({
            ...hover,
            [target]: !hover[target]
        })
        if (!hover.isSearch) {
            setDropdownState({
                headerColor: true,
                opacity: 1,
                padding: '40px 0 80px',
                height: 'fit-content',
                event: 'auto'
            })
        } else {
            dropDownClose();
        }
    }
    const dropDownClose = () => {
        if (height !== '0') {
            setHover({
                ...hover,
                isSearch: !hover.isSearch
            })
        }
        setDropdownState({
            headerColor: false,
            opacity: 0,
            padding: '0',
            height: '0',
            event: 'none'
        })
    }

    return (
        <HeadDiv BackColor={headerColor}>
            <Headers>
                <FlexDiv>
                    <Link to="/"><Image src={TextLogo}/></Link>
                    <TextButton><Link to="/lecture"><Text font="Body4">강의</Text></Link></TextButton>
                    <TextButton><Link to="/TIL"><Text font="Body4">TIL</Text></Link></TextButton>
                </FlexDiv>
                <FlexDiv style={{gap: "40px"}}>
                    <IconButton id="isAlam"><Icon icon="bell"/></IconButton>
                    <IconButton id="isSearch" onClick={dropDownOpen}><Icon icon="search"/></IconButton>
                    <IconButton id="isUser"><Icon icon="user"/></IconButton>
                </FlexDiv>
            </Headers>
            <DropInput opacity={opacity} padding={padding} height={height} isInput={hover.isSearch}/>
            <BackBlur event={event} opacity={opacity} className={hover.isSearch ? "search" : ""} onMouseEnter={dropDownClose}></BackBlur>
        </HeadDiv>
    )
}

const DropInput = ({padding, height, opacity, isInput}: InputType) => {
    const [inputData, setInputData] = useState<string>('');
    const searchInput = useRef<HTMLInputElement>(null);

    const inputClear = () => {
        setInputData('');
        searchInput.current?.focus();
    }
    useEffect(() => {
        if (isInput) {
            setTimeout(inputClear, 200);
        } else {
            searchInput.current?.blur();
        }
    }, [isInput]);

    return (
        <BgDiv opacity={opacity} padding={padding} height={height}>
            <InputDiv>
                <Icon icon="search"/>
                <Input ref={searchInput} placeholder="무엇을 검색하고 싶으신가요?" value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                <IconButton onClick={inputClear}><Icon icon="close"/></IconButton>
            </InputDiv>
        </BgDiv>
    )
}

export default Header;

interface InputType {
    padding: string;
    height: string;
    opacity: number;
    isInput?: boolean;
}

const BackBlur = styled.div<{ opacity: number; event: string; }>`
  position: absolute;
  pointer-events: ${props => props.event};
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  z-index: 4;
  opacity: ${props => props.opacity};
  transition: opacity .3s ease-in;
`
const Input = styled.input`
  width: 100%;
  font-size: 28px;
  font-weight: 500;
  border: 0;
  outline: none;

  &::placeholder {
    color: ${Colors["Gray500"]};
  }
`
const InputDiv = styled.div`
  width: 1000px;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const BgDiv = styled.div<InputType>`
  width: 100%;
  height: ${props => props.height};
  padding: ${props => props.padding};
  gap: 40px;
  position: absolute;
  opacity: ${props => props.opacity};
  top: 50px;
  left: 0;
  background-color: ${Colors["White"]};
  transition: 0.3s;
  z-index: 5;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 0;
  }
`
const IconButton = styled.button`
  height: 24px;
  width: 24px;
  border: none;
  background: none;
  cursor: pointer;
`
const Headers = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
  width: 1000px;
  z-index: 100;
  transition: 0.1s;
  @media only screen and (max-width: 1080px) {
    width: 94%;
  }
`
const HeadDiv = styled.div<{ BackColor: boolean; }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${props => props.BackColor ? Colors["White"] : "rgba(0,0,0,0)"};
`
const Image = styled.img`
  height: 30px;
  margin-right: 20px;
`
const FlexDiv = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 12px;
    color: black;
    text-decoration: none;
  }
`