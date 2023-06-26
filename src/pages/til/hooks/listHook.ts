import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useEnterHook } from "./enterHook";
import { useNodeIdxHook } from "./nodeIdxHook";
import useNodeSet from "./nodeSet";
import useRangeData from "./rangeData";

interface BodyType {
    contents: string;
    placeholder: boolean;
    id: string;
    type: string;
    css: string;
}

interface PastBodyType {
    data: BodyType[];
    startIdx: number;
    startNodeIdx: number;
    startCursorIdx: number;
    endIdx: number;
    endNodeIdx: number;
    endCursorIdx: number;
    direction: boolean;
}

export const useListHook = () => {
    const timer = useRef<NodeJS.Timer | null>(null);
    const $Container = useRef<HTMLDivElement | null>(null);
    const cursorIdx = useRef<number>(-2)
    const curosrState = useRef<string>('outside');
    const [pastBodyData, setPastBodyData] = useState<PastBodyType[]>([])
    const TmpBodyData = useRef<PastBodyType>({
        data: [],
        startIdx: 0,
        startNodeIdx: 0,
        startCursorIdx: 0,
        endIdx: 0,
        endNodeIdx: 0,
        endCursorIdx: 0,
        direction: false
    });
    const [BodyData, setBodyData] = useState<BodyType[]>([
        {
            contents: '여기는 DIV<span className="tmp" data-text-idx=1>이거는 span임</span>글글',
            placeholder: false,
            id: '0',
            type: 'Text',
            css: '',
        },
        {
            contents: '<span data-text-idx=0>이거는 span임</span>',
            placeholder: false,
            id: '1',
            type: 'Text',
            css: '',
        },
        {
            contents: '',
            placeholder: false,
            id: '2',
            type: 'Text',
            css: '',
        }
    ])
    const [ViewBodyData, setViewBodyData] = useState<BodyType[]>([
        {
            contents: '여기는 DIV<span className="tmp" data-text-idx=1>이거는 span임</span>글글',
            placeholder: false,
            id: '0',
            type: 'Text',
            css: '',
        },
        {
            contents: '<span data-text-idx=0>이거는 span임</span>',
            placeholder: false,
            id: '1',
            type: 'Text',
            css: '',
        },
        {
            contents: '',
            placeholder: false,
            id: '2',
            type: 'Text',
            css: '',
        }
    ]);
    const [keySet, setKeySet] = useState<{ [key: string]: boolean }>({});

    const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setKeySet(keySet => {
            return {
                ...keySet,
                [e.key]: true
            }
        })

        if (keySet['Shift'] && e.key === 'Enter') {
            e.preventDefault();
            // 이걸 했을시 커서부분에 \n 넣기
        }
        else if (!keySet['Shift'] && e.key === 'Enter') {
            e.preventDefault();
            const rangeData: PastBodyType = JSON.parse(JSON.stringify(TmpBodyData.current));
            const pastData: PastBodyType[] = [{
                ...rangeData,
                data: BodyData,
            }];

            if (timer.current) {
                clearInterval(timer.current)
                timer.current = null;
                pastData.push({
                    ...useRangeData(),
                    data: rangeData.data,
                });
            }

            cursorIdx.current = useEnterHook(TmpBodyData)
            
            setPastBodyData(pastBodyData => [
                TmpBodyData.current,
                ...pastData.reverse(),
                ...pastBodyData
            ])
            setViewBodyData((TmpBodyData.current as PastBodyType).data)
            setBodyData((TmpBodyData.current as PastBodyType).data)

            curosrState.current = 'cursorRedefine';
        }
        else if (keySet['Shift'] && e.key === 'Tab') {
            e.preventDefault();
        }
        else if (keySet['Control'] && keySet['Shift'] && e.key === 'z') {
            e.preventDefault();
        }
        else if (keySet['Control'] && e.key === 'z') {
            e.preventDefault();
            if (curosrState.current === 'write' && timer.current) {
                curosrState.current = 'before';

                clearInterval(timer.current)
                timer.current = null;
                setPastBodyData([{
                    ...TmpBodyData.current,
                    data: BodyData
                },
                ...pastBodyData
                ])

                setViewBodyData((TmpBodyData.current as PastBodyType).data)
                TmpBodyData.current = {
                    ...TmpBodyData.current,
                    data: BodyData
                }
            }
            else if (pastBodyData.length) {
                console.log(BodyData)
                setBodyData(pastBodyData[0].data)
                if (JSON.stringify(BodyData) === JSON.stringify(ViewBodyData)) {
                    curosrState.current = 'cursorRedefine';
                    setViewBodyData(pastBodyData[0].data);
                } else {
                    curosrState.current = 'before';
                    setViewBodyData(BodyData);
                }
                TmpBodyData.current = {
                    ...TmpBodyData.current,
                    data: pastBodyData[0].data
                }
            }
            else {
                toast.error('더 이상 되돌릴 수 없습니다!');
            }
        }
        else if (e.key === 'Backspace') {
            const element = document.getSelection();
            const range = useRangeData()
            if (range.startIdx === 0 && element?.anchorOffset === 0 && range.startNodeIdx === 0) {
                e.preventDefault()
            }
            else if (element?.isCollapsed && element.anchorOffset === 0 && range.startNodeIdx === 0) {
                e.preventDefault();
                
                const node = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx}"] div div div`)
                let data: BodyType[];
                if (node?.innerHTML === '') {
                    data = [
                        ...BodyData.slice(0, range.startIdx),
                        ...BodyData.slice(range.startIdx + 1)
                    ];
                    setPastBodyData([{
                        data,
                        startIdx: range.startIdx - 1,
                        startNodeIdx: 0,
                        startCursorIdx: 0,
                        endIdx: range.startIdx - 1,
                        endNodeIdx: 0,
                        endCursorIdx: 0,
                        direction: false
                    },
                    {
                        data: BodyData,
                        ...range
                    },
                    ...pastBodyData
                    ])
                    curosrState.current = 'cursorRedefine';
                } else {
                    const node = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx - 1}"] div div div`)

                    const DIV = document.createElement('div');
                    DIV.innerHTML = BodyData[range.startIdx - 1].contents + BodyData[range.startIdx].contents

                    let cnt = 0;
                    for (const value of Object.entries(DIV.childNodes)) {
                        if (value[1].textContent === '') {
                            cnt += 1;
                            DIV.removeChild(value[1])
                        }
                        else {
                            if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                                value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                            }
                        }
                    }
                    
                    data = [
                        ...BodyData.slice(0, range.startIdx - 1),
                        {
                            ...BodyData[range.startIdx - 1],
                            contents: DIV.innerHTML
                        },
                        ...BodyData.slice(range.startIdx + 1)
                    ];
                    setPastBodyData([
                        {
                            data: data,
                            startIdx: range.startIdx - 1,
                            startNodeIdx: (node?.childNodes.length ?? 1) - 1,
                            startCursorIdx: node?.childNodes.length !== 0 ? node?.childNodes[node?.childNodes.length - 1].textContent?.length ?? 0 : 0,
                            endIdx: range.startIdx - 1,
                            endNodeIdx: (node?.childNodes.length ?? 1) - 1,
                            endCursorIdx: node?.childNodes.length !== 0 ? node?.childNodes[node?.childNodes.length - 1].textContent?.length ?? 0 : 0,
                            direction: false
                        },
                        {
                            data: BodyData,
                            ...range
                        },
                        ...pastBodyData
                    ])
                    curosrState.current = 'cursorRedefine'
                }
                setBodyData(data);
                setViewBodyData(data);
                cursorIdx.current = range.startIdx - 1;
            }
            else if (!element?.isCollapsed) {
                ''// 우선 마우스 범위설정부터 해야함 select에서 하셈
            }
        }
    }

    const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setKeySet(keySet => {
            return {
                ...keySet,
                [e.key]: false
            }
        })
    }

    const select = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        const element = document.getSelection()
        const Idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);

        // 노드를 연속으로 삭제하면 문제가 있음
        // 클릭했을 경우 timer가 작동중이면 멈추고 새로 해야함
        // 방향키를 누르는 경우도 마찬가지이고,
        // 스페이스 키를 누르는 경우도 포함

        if (!element?.isCollapsed && curosrState.current !== 'cursorSet') {
            const newRange = document.createRange();
            const range = useRangeData();
            const direction = range.direction;
            let { startIdx, startNodeIdx, startCursorIdx, endIdx, endNodeIdx, endCursorIdx } = range;
            let startNode = document.querySelector<HTMLElement>(`div[data-idx="${startIdx}"] div div div`)
            let endNode = document.querySelector<HTMLElement>(`div[data-idx="${endIdx}"] div div div`)

            while (startIdx !== endIdx && endNodeIdx === 0 && endCursorIdx === 0) {
                endNode = document.querySelector<HTMLElement>(`div[data-idx="${--endIdx}"] div div div`)
                endNodeIdx = endNode?.childNodes.length === 0 ? 0 : (endNode?.childNodes.length ?? 1) - 1;
                endCursorIdx = endNode?.childNodes[endNodeIdx]?.textContent?.length ?? 0;
            }
            while (!startNode?.textContent && startIdx !== endIdx) {
                startNode = document.querySelector<HTMLElement>(`div[data-idx="${++startIdx}"] div div div`)
                startNodeIdx = 0;
                startCursorIdx = 0;
            }
            
            const setStartNode = startNode?.childNodes[startNodeIdx]?.nodeName === 'SPAN' ? startNode?.childNodes[startNodeIdx].childNodes[0] : startNode?.childNodes[startNodeIdx];
            const setEndNode = endNode?.childNodes[endNodeIdx]?.nodeName === 'SPAN' ? endNode?.childNodes[endNodeIdx].childNodes[0] : endNode?.childNodes[endNodeIdx];

            newRange?.setStart(setStartNode as ChildNode ?? startNode, startCursorIdx);
            newRange?.setEnd(setEndNode as ChildNode ?? endNode, endCursorIdx);

            element?.removeAllRanges();
            element?.addRange(newRange as Range);
            if (!element?.isCollapsed && direction) {
                element?.setBaseAndExtent(setEndNode as ChildNode ?? endNode, endCursorIdx, setStartNode as ChildNode ?? startNode, startCursorIdx);
            } else {
                element?.setBaseAndExtent(setStartNode as ChildNode ?? startNode, startCursorIdx, setEndNode as ChildNode ?? endNode, endCursorIdx);
            }
            curosrState.current = 'cursorSet'
        }
        
        if (cursorIdx.current !== Idx || curosrState.current === 'cursorSet') {
            if (timer.current) {
                const TmpData = JSON.parse(JSON.stringify(TmpBodyData.current));

                setPastBodyData(pastBodyData => [
                    {
                        ...TmpData,
                        data: BodyData,
                    },
                    ...pastBodyData
                ]);
                setBodyData(TmpData.data);
                clearInterval(timer.current as NodeJS.Timer);
                timer.current = null;
            }


            setViewBodyData(ViewBodyData => ViewBodyData.map((v, i) => {
                return {
                    ...v,
                    placeholder: i === Idx
                }
            }))
            
            curosrState.current = 'standBy';
        }
        cursorIdx.current = Idx;
        if (curosrState.current === 'outside') curosrState.current = 'standBy';

        if (curosrState.current !== 'write' && timer.current === null) {
            TmpBodyData.current = {
                data: TmpBodyData.current?.data.length ? TmpBodyData.current.data : ViewBodyData,
                ...useRangeData()
            }
        }
    }

    const InputEvent = (e: React.FormEvent<HTMLDivElement>) => {
        const element = document.getSelection();
        const idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);
        const content = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)
        
        if (element?.isCollapsed) {
            if (content && content.childNodes) {
                let cnt = 0;
                for (const value of Object.entries(content.childNodes)) {
                    if (value[1].textContent === '') {
                        cnt += 1;
                        content.removeChild(value[1])
                    }
                    else {
                        if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                            value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                        }
                    }
                }
            }
            if (content?.textContent === '') {
                content.innerHTML = ''
            }
        }

        TmpBodyData.current = {
            ...TmpBodyData.current,
            data: timer.current ?
                [
                    ...TmpBodyData.current.data.slice(0, idx),
                    {
                        ...TmpBodyData.current.data[idx],
                        contents: content?.innerHTML ?? ''
                    },
                    ...TmpBodyData.current.data.slice(idx + 1)
                ]
                :
                [
                    ...ViewBodyData.slice(0, idx),
                    {
                        ...ViewBodyData[idx],
                        contents: content?.innerHTML ?? ''
                    },
                    ...ViewBodyData.slice(idx + 1)
                ]
        };
        // 입력중인상태 일때 일정 초마다 저장되게 로직을 바꿔야함
        // 그러면 중간에 같은 idx일때도 바꿔도 아무 문제 없을 거임
        if (JSON.stringify(TmpBodyData.current.data) !== JSON.stringify(BodyData) && !keySet['Control']) {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }

            curosrState.current = 'write';
            timer.current = setInterval(() => {
                const range = JSON.parse(JSON.stringify(TmpBodyData.current));

                setPastBodyData(pastBodyData => [
                    {
                        ...range,
                        data: BodyData,
                    },
                    ...pastBodyData
                ]);

                clearInterval(timer.current as NodeJS.Timer);
                timer.current = null;
                setBodyData((TmpBodyData.current as PastBodyType).data)
                TmpBodyData.current = {
                    data: TmpBodyData.current.data,
                    ...useRangeData()
                };
                console.log((TmpBodyData.current as PastBodyType).data)

                curosrState.current = 'standBy';
            }, 1000)
        }
    }

    const onBlur = () => {
        setKeySet({})
        curosrState.current = 'outside';
    }

    const callback = (mutationsList: any, observer: any) => {
        // 이전으로 돌리는 로직은 컨트롤 z만들고 나서 만들어야할 듯
        // 이제 개발자 모드에서 했는지 알 수 있게 되었지만
        // 강제로 변경되기 이전 상태로 돌리기 위해서 필요함

        // console.log(1, mutationsList)
        // console.log(cursorIdx.current);
        for (const mutation of mutationsList) {
            if (curosrState.current === undefined) {
                // mutation.oldValue
                // console.log('??????????')
            }
        }
    };

    // 3. 옵저버 인스턴스 생성
    const observer = new MutationObserver(callback); // 타겟에 변화가 일어나면 콜백함수를 실행하게 된다.

    // 4. DOM의 어떤 부분을 감시할지를 옵션 설정
    const config = {
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
    };

    useEffect(() => {
        // 5. 감지 시작
        observer.observe($Container.current as Element, config);

        // 6. 감지 중지
        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        if (curosrState.current === 'cursorRedefine' && pastBodyData.length) {
            const element = document.getSelection();
            const newRange = document.createRange();
            const { startIdx, startNodeIdx, startCursorIdx, endIdx, endNodeIdx, endCursorIdx, direction } = pastBodyData[0];
            const startNode = document.querySelector<HTMLElement>(`div[data-idx="${startIdx}"] div div div`);
            const endNode = document.querySelector<HTMLElement>(`div[data-idx="${endIdx}"] div div div`);
            const setStartNode = startNode?.childNodes[startNodeIdx]?.nodeName === 'SPAN' ? startNode?.childNodes[startNodeIdx].childNodes[0] : startNode?.childNodes[startNodeIdx];
            const setEndNode = endNode?.childNodes[endNodeIdx]?.nodeName === 'SPAN' ? endNode?.childNodes[endNodeIdx].childNodes[0] : endNode?.childNodes[endNodeIdx];
            console.log(pastBodyData[0])
            newRange?.setStart(setStartNode as ChildNode ?? startNode, startCursorIdx);
            newRange?.setEnd(setEndNode as ChildNode ?? endNode, endCursorIdx);

            element?.removeAllRanges();
            element?.addRange(newRange as Range);
            direction && element?.setBaseAndExtent(setEndNode as ChildNode ?? endNode, endCursorIdx, setStartNode as ChildNode ?? startNode, startCursorIdx);

            newRange?.detach();
            setPastBodyData(pastBodyData.slice(1));
            setViewBodyData(ViewBodyData => ViewBodyData.map((v, i) => {
                return {
                    ...v,
                    placeholder: i === startIdx
                }
            }))
            curosrState.current = 'standBy'
        }
        else if (curosrState.current === 'before') {
            setViewBodyData(BodyData);
            curosrState.current = 'cursorRedefine'
        }
    }, [ViewBodyData])

    return { keyDown, select, keyUp, $Container, onBlur, ViewBodyData, InputEvent }
}