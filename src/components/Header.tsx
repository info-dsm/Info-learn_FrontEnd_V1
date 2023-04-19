import React, {useRef, useState} from "react";
import styled from "styled-components";
import {TextButton} from "./TextButton";
import {Link} from "react-router-dom";
import TextLogo from "../assets/textLogo.png";
import BellIco from "../assets/Bell.png";
import SearchIco from "../assets/Magnifier.png";
import AccountIco from "../assets/account.png";
import {Text} from "./text";
import {Colors} from "../styles/theme/color";

interface hoverType {
    [key: string]: boolean,

    isLecture: boolean;
    isCommunity: boolean;
    isSearch: boolean;
    isUser: boolean;
    isAlam: boolean;
}

interface IconButtonProps {
    src: string;
    id: string;
    onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Header = () => {
    const [hover, setHover] = useState<hoverType>({
        isLecture: false,
        isCommunity: false,
        isSearch: false,
        isUser: false,
        isAlam: false
    });
    const [headerColor, setHeaderColor] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(0);
    const [padding, setPadding] = useState<string>('0 24%');
    const [height, setHeight] = useState<string>('0');
    const [event, setEvent] = useState<string>('none');

    const dropDownOpen = (e: React.MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        setHover({
            ...hover,
            [target.id]: !hover[target.id]
        })
        if (!hover.isSearch) {
            setHeaderColor(true);
            setOpacity(1);
            setPadding('40px 24% 80px');
            setHeight('fit-content');
            setEvent('auto');
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
        setHeaderColor(false);
        setOpacity(0);
        setPadding('0 24%');
        setHeight('0');
        setEvent('none');
    }

    const IconBtn = ({src, id, onClick}: IconButtonProps) => {
        return <IconButton src={src} id={id} onClick={onClick}/>;
    }

    return (
        <HeadDiv BackColor={headerColor}>
            <Headers>
                <FlexDiv>
                    <Link to="/"><Image src={TextLogo}/></Link>
                    <TextButton><Link to="/le"><Text font="Body4">강의</Text></Link></TextButton>
                    <TextButton><Link to="/community"><Text font="Body4">커뮤니티</Text></Link></TextButton>
                </FlexDiv>
                <FlexDiv style={{gap: "40px"}}>
                    <IconBtn id="isAlam" src={BellIco}/>
                    <IconBtn id="isSearch" onClick={dropDownOpen} src={SearchIco}/>
                    <IconBtn id="isUser" src={AccountIco}/>
                </FlexDiv>
            </Headers>
            <DropInput opacity={opacity} padding={padding} height={height}/>
            <BackBlur event={event} opacity={opacity} className={hover.isSearch ? "search" : ""} onMouseEnter={dropDownClose}></BackBlur>
        </HeadDiv>
    )
}

const DropInput = ({padding, height, opacity}: InputType) => {
    const [inputData, setInputData] = useState<string>('');
    const searchInput = useRef<HTMLInputElement>(null);
    const inputClear = () => {
        setInputData('');
        searchInput.current?.focus();
    }
    return (
        <BgDiv opacity={opacity} padding={padding} height={height}>
            <InputDiv>
                <Icon src={SearchIco}/>
                <Input ref={searchInput} placeholder="검색하기" value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                <IconButton onClick={inputClear}></IconButton>
            </InputDiv>
        </BgDiv>
    )
}

export default Header;

interface HeaderColor {
    BackColor: boolean;
}

interface Blur {
    opacity: number;
    event: string;
}

interface InputType {
    padding: string;
    height: string;
    opacity: number;
}

const BackBlur = styled.div<Blur>`
  position: absolute;
  pointer-events: ${props => props.event};
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  z-index: 2;
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
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
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
  z-index: 3;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`
const IconButton = styled.img`
  height: 24px;
  width: 24px;
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
const HeadDiv = styled.div<HeaderColor>`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${props => props.BackColor ? Colors["White"] : Colors["Gray100"]};
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