import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import GradientIcon from "../../assets/GradientIcon";
import { Button } from "../../components/button/Button";
import DropDown from "../../components/DropDown/small";
import { Post } from "../../components/posting/Post";
import { Text } from "../../components/text";
import { korTypeToEng } from "../../K2E";
import Pagination from "./pagination";
import * as _ from './style'

interface postType {
    id: number;
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

interface DataType {
    lectureId: number;
    title: string;
    explanation: string;
    lectureThumbnailUrl: string;
    tagNameList: {
        name: string;
    }[]
    createdAt: string;
    createdBy: string;
}

interface resProps {
    titleResults: {
        size: number;
        content: DataType[];
    }
    explanationResults: {
        size: number;
        content: DataType[];
    }
}

interface postProps {
    titleResults: postType[];
    explanationResults: postType[];
}

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const query = Object.fromEntries(decodeURI(location.search).replace('?', '').split('&').map((v) => v.split('=')));
    const [cookies, ,] = useCookies();
    const [position, setPosition] = useState<boolean>(false);
    const time = useRef<NodeJS.Timer | undefined>()
    const [state, setState] = useState<boolean>(true);
    const [idx, setIdx] = useState<number>(1);
    const [max, setMax] = useState([[0, 0], [0, 0]])
    const [value, setValue] = useState<string>('제목 기준');
    const arr = ['제목 기준', '내용 기준']

    // 기본이 TIL이여서 버튼 설정은 TIL 만들어진 후에 추후 API 다시 설정 예정
    const { data, refetch, error } = useQuery<postProps>(['search', state], () => GetLecture(), {
        enabled: !!cookies.accessToken,
        refetchOnMount: false,
        retry: false
    })

    if (error) toast.error('인터넷 상태를 확인해주세요!');

    const GetLecture = async (): Promise<postProps> => {
        const { data } = await axios.get<resProps>(`${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/search`, {
            headers: {
                "Authorization": `Bearer ${cookies.accessToken}`,
                'ngrok-skip-browser-warning': '69420'
            },
            params: {
                q: korTypeToEng(query.q),
                idx: idx - 1,
                size: 10
            }
        });
        setMax([
            max[0],
            [
                data.titleResults.size,
                data.explanationResults.size
            ]
        ])
        return {
            titleResults: data.titleResults.content.map((v: DataType): postType => {
                return {
                    id: v.lectureId,
                    img: v.lectureThumbnailUrl,
                    name: v.createdBy,
                    date: v.createdAt,
                    title: v.title,
                    subTitle: v.explanation,
                    tag: v.tagNameList,
                    isLecture: true,
                    isSearch: true
                }
            }),
            explanationResults: data.explanationResults.content.map((v: DataType): postType => {
                return {
                    id: v.lectureId,
                    img: v.lectureThumbnailUrl,
                    name: v.createdBy,
                    date: v.createdAt,
                    title: v.title,
                    subTitle: v.explanation,
                    tag: v.tagNameList,
                    isLecture: true,
                    isSearch: true
                }
            })
        }
    };

    useEffect(() => {
        if (query.q === undefined || query.q === '' || !!cookies.accessToken) {
            navigate(-1);
        }
        if (!state) {
            refetch()
        }
    }, [state])

    const onScroll = useCallback(() => {
        const { innerHeight } = window;
        const { scrollTop } = document.documentElement;
        if(time.current) {
            clearInterval(time.current);
            time.current = undefined;
        }

        time.current = setInterval(() => {
            if(scrollTop > innerHeight) {
                setPosition(true);
            } else {
                setPosition(false);
            }
            clearInterval(time.current);
            time.current = undefined;
        }, 100)
    }, [position])

    useEffect(() => {
        window.addEventListener("scroll", onScroll, true);
        return () => {
            window.removeEventListener("scroll", onScroll, true);
        };
    }, []);

    return (
        <>
            <_.DefaultWidth>
                <_.FlexDiv direction='column' gap={10} margin='60px 0 40px 0'>
                    <Text font="Title1" gradient={true}>{query.q}</Text>
                    <Text>검색 결과</Text>
                </_.FlexDiv>
                <_.FlexDiv justify='space-between' align="center">
                    <_.FlexDiv gap={10}>
                        <Button
                            primary={state}
                            white={!state}
                            font='Body3'
                            padding="6px 12px"
                            onClick={() => setState(true)}
                        >
                            TIL
                        </Button>
                        <Button
                            primary={!state}
                            white={state}
                            font='Body3'
                            padding="6px 12px"
                            onClick={() => setState(false)}
                        >
                            강의
                        </Button>
                    </_.FlexDiv>
                    <DropDown arr={arr} value={value} change={setValue} />
                </_.FlexDiv>
                <_.FlexDiv direction='column' gap={40} margin='40px 0 160px 0'>
                    {
                        value === '제목 기준' ?
                            data?.titleResults.map((value: postType) => {
                                const { id, ...data } = value;
                                return <Post lectureId={id} {...data} key={id} />
                            })
                            :
                            data?.explanationResults.map((value: postType) => {
                                const { id, ...data } = value;
                                return <Post lectureId={id} {...data} key={id} />
                            })
                    }
                </_.FlexDiv>
            </_.DefaultWidth>
            <Pagination value={idx} change={setIdx} end={max[Number(!state)][Number(value === '내용 기준')]} />
            <_.UpCircle 
                state={position}
                onClick={() => window.scrollTo({top:0, left: 0, behavior:'smooth'})}>
                <GradientIcon icon="up" />
            </_.UpCircle>
        </>
    )
}

export default Search;