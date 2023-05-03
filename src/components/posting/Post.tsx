import {Text} from "../text";
import {Colors} from "../../styles/theme/color";
import React, {useState} from "react";
import triangle from "../../assets/img/Triangle.png";
import Icon from "../../assets/Icon";
import * as _ from './style';
import * as s from './sStyle';
import toast from "react-hot-toast";

interface postProps {
    img: string;
    name: string;
    date: string;
    title: string;
    subTitle: string;
    tag: {
        name: string;
    }[]
    isLecture?: boolean;
    isSearch?: boolean;
}

export const Post = ({img, name, date, title, subTitle, tag, isLecture, isSearch}: postProps) => {
    const newDate = date.slice(0, 10);
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <>
            {
                isSearch ?
                    <s.PostBody>
                        <s.UpDiv className="upDiv">
                            {isLecture ? <s.PlayCircle>
                                <s.Triangle src={triangle}/>
                            </s.PlayCircle> : null}
                            <s.Img src={img}/>
                        </s.UpDiv>
                        <s.InfoDiv>
                            <Text font="Title2">{title}</Text>
                            <Text font="Body2" color={Colors["Gray500"]}>{subTitle}</Text>
                            <_.TagDiv>
                                {tag.map((data, index) => <Text key={index} color={Colors["FPrimary500"]} font="Body4">#{data.name}</Text>)}
                            </_.TagDiv>
                            <_.InfoDiv>
                                <Text font="Body4">{name}</Text>
                                <div style={{width: "1px", height: "8px", backgroundColor: Colors["Gray500"], borderRadius: "1px"}}></div>
                                <Text font="Body4">{newDate}</Text>
                            </_.InfoDiv>
                        </s.InfoDiv>
                    </s.PostBody>
                    :
                    <_.PostBody onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                        <_.UpDiv className="upDiv">
                            {isLecture ? <_.PlayCircle>
                                <_.Triangle src={triangle}/>
                            </_.PlayCircle> : null}
                            <_.Img src={img}/>
                        </_.UpDiv>
                        <_.InfoDiv>
                            <Text font="Body4">{name}</Text>
                            <div style={{width: "1px", height: "8px", backgroundColor: Colors["Gray500"], borderRadius: "1px"}}></div>
                            <Text font="Body4">{newDate}</Text>
                        </_.InfoDiv>
                        <_.TitleDiv>
                            <Text font="Body1">{title}</Text>
                            <Text font="Body4" color={Colors["Gray500"]}>{subTitle}</Text>
                        </_.TitleDiv>
                        <_.BottomDiv>
                            <_.TagDiv>
                                {tag.map((data, index) => <Text key={index} color={Colors["FPrimary500"]} font="Body4">#{data.name}</Text>)}
                            </_.TagDiv>
                            {isHover && <Icon icon="heart-fill" color="Gray300" size={16}/>}
                            <div style={{height: "16px", width: "0"}}></div>
                        </_.BottomDiv>
                    </_.PostBody>
            }
        </>
    )
}

