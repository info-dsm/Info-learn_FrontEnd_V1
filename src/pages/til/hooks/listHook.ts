import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useEnterHook } from "./enterHook";
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
    const TimeData = useRef<number>(0);
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
                pastData.unshift({
                    ...useRangeData(),
                    data: rangeData.data,
                });
            }

            cursorIdx.current = useEnterHook(TmpBodyData)
            
            setPastBodyData(pastBodyData => [
                TmpBodyData.current,
                ...pastData,
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
                console.log('?????')
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
                console.log(pastBodyData)
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
                const nowTime = Date.now();
                const rangeData: PastBodyType = JSON.parse(JSON.stringify(TmpBodyData.current));
                
                if(rangeData.data[range.startIdx].contents === '') {
                    const pastData: PastBodyType[] = [{
                        ...rangeData,
                        data: BodyData,
                    }];
                    
                    if (timer.current) {
                        clearInterval(timer.current)
                        timer.current = null;
                        pastData.unshift({
                            ...range,
                            data: rangeData.data,
                        });
                    }

                    const node = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx - 1}"] div div div`)
                    const nodeIdx = (node?.childNodes.length ?? 1) - 1
                    const nodeCursorIdx = node?.childNodes.length !== 0 ? node?.childNodes[node?.childNodes.length - 1].textContent?.length ?? 0 : 0
                    
                    const DIV = document.createElement('div');
                    DIV.innerHTML = rangeData.data[range.startIdx - 1].contents + rangeData.data[range.startIdx].contents
                    useNodeSet(DIV);
                    
                    const Data = {
                        data: [
                            ...rangeData.data.slice(0, range.startIdx),
                            ...rangeData.data.slice(range.startIdx + 1)
                        ],
                        startIdx: range.startIdx - 1,
                        startNodeIdx: nodeIdx,
                        startCursorIdx: nodeCursorIdx,
                        endIdx: range.startIdx - 1,
                        endNodeIdx: nodeIdx,
                        endCursorIdx: nodeCursorIdx,
                        direction: false
                    }
                    
                    TmpBodyData.current = Data;
                    setPastBodyData(pastBodyData => [
                        Data,
                        ...pastData,
                        ...pastBodyData
                    ])
                    setBodyData(Data.data);
                    setViewBodyData(Data.data);
                    cursorIdx.current = range.startIdx - 1;
                    curosrState.current = 'cursorRedefine';
                }
                else if(nowTime - TimeData.current >= 100) {
                    TimeData.current = nowTime;

                    const pastData: PastBodyType[] = [{
                        ...rangeData,
                        data: BodyData,
                    }];
                    
                    if (timer.current) {
                        clearInterval(timer.current)
                        timer.current = null;
                        pastData.unshift({
                            ...range,
                            data: rangeData.data,
                        });
                    }

                    const node = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx - 1}"] div div div`)
                    const nodeIdx = (node?.childNodes.length ?? 1) - 1
                    const nodeCursorIdx = node?.childNodes.length !== 0 ? node?.childNodes[node?.childNodes.length - 1].textContent?.length ?? 0 : 0
                    
                    const DIV = document.createElement('div');
                    DIV.innerHTML = rangeData.data[range.startIdx - 1].contents + rangeData.data[range.startIdx].contents
                    useNodeSet(DIV);
                    
                    const Data = {
                        data: [
                            ...rangeData.data.slice(0, range.startIdx - 1),
                            {
                                ...rangeData.data[range.startIdx - 1],
                                contents: DIV.innerHTML
                            },
                            ...rangeData.data.slice(range.startIdx + 1)
                        ],
                        startIdx: range.startIdx - 1,
                        startNodeIdx: nodeIdx,
                        startCursorIdx: nodeCursorIdx,
                        endIdx: range.startIdx - 1,
                        endNodeIdx: nodeIdx,
                        endCursorIdx: nodeCursorIdx,
                        direction: false
                    }
                    
                    TmpBodyData.current = Data;
                    setPastBodyData(pastBodyData => [
                        Data,
                        ...pastData,
                        ...pastBodyData
                    ])
                    setBodyData(Data.data);
                    setViewBodyData(Data.data);
                    cursorIdx.current = range.startIdx - 1;
                    curosrState.current = 'cursorRedefine';
                }
            }
            else if (!element?.isCollapsed) {
                e.preventDefault();
                const nowTime = Date.now();
                const newRange = document.createRange();
                if(nowTime - TimeData.current >= 100) {
                    TimeData.current = nowTime

                    const rangeData: PastBodyType = JSON.parse(JSON.stringify(TmpBodyData.current));
                    const pastData: PastBodyType[] = [{
                        ...rangeData,
                        data: BodyData,
                    }];
                    
                    if (timer.current) {
                        clearInterval(timer.current)
                        timer.current = null;
                        pastData.unshift({
                            ...range,
                            data: rangeData.data,
                        });
                    }
                    
                    const DIV = document.createElement('div');
                    const startNode = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx}"] div div div`)
                    const endNode = document.querySelector<HTMLElement>(`div[data-idx="${range.endIdx}"] div div div`)
                    
                    if(range.startIdx === range.endIdx) {
                        newRange?.setStart((startNode?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? startNode?.childNodes[range.startNodeIdx].childNodes[0] : startNode?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
                        newRange?.setEnd((startNode?.childNodes[range.endNodeIdx].nodeName === 'SPAN' ? startNode?.childNodes[range.endNodeIdx]?.childNodes[0] : startNode?.childNodes[range.endNodeIdx]) as ChildNode, range.endCursorIdx ?? 0)
                        newRange?.deleteContents()

                        DIV.innerHTML = (startNode?.innerHTML ?? '')
                    } else {
                        newRange?.setStart((startNode?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? startNode?.childNodes[range.startNodeIdx].childNodes[0] : startNode?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
                        newRange?.setEnd(startNode as HTMLElement, startNode?.childNodes.length ?? 1)
                        newRange?.deleteContents()

                        newRange?.setStart(endNode as HTMLElement, 0)
                        newRange?.setEnd((endNode?.childNodes[range.endNodeIdx].nodeName === 'SPAN' ? endNode?.childNodes[range.endNodeIdx]?.childNodes[0] : endNode?.childNodes[range.endNodeIdx]) as ChildNode, range.endCursorIdx ?? 0)
                        newRange?.deleteContents()
                        
                        DIV.innerHTML = (startNode?.innerHTML ?? '') + (endNode?.innerHTML ?? '')
                    }
                    
                    useNodeSet(DIV);
                    useNodeSet(startNode);

                    const nodeIdx = (startNode?.childNodes.length ?? 1) - 1
                    const nodeCursorIdx = startNode?.childNodes.length !== 0 ? startNode?.childNodes[startNode?.childNodes.length - 1].textContent?.length ?? 0 : 0
                    
                    const Data = {
                        data: [
                            ...rangeData.data.slice(0, range.startIdx),
                            {
                                ...rangeData.data[range.startIdx],
                                contents: DIV.innerHTML
                            },
                            ...rangeData.data.slice(range.endIdx + 1)
                        ],
                        startIdx: range.startIdx,
                        startNodeIdx: nodeIdx,
                        startCursorIdx: nodeCursorIdx,
                        endIdx: range.startIdx,
                        endNodeIdx: nodeIdx,
                        endCursorIdx: nodeCursorIdx,
                        direction: false
                    }
                    
                    TmpBodyData.current = Data;
                    setPastBodyData(pastBodyData => [
                        Data,
                        ...pastData,
                        ...pastBodyData
                    ])
                    setBodyData(Data.data);
                    setViewBodyData(Data.data);
                    cursorIdx.current = range.startIdx - 1;
                    curosrState.current = 'cursorRedefine';
                }
            }
        }
        else if(e.key === 'Process' && e.code.match(/^Key[A-Z]/) || (e.key !== 'Process' && e.key.length === 1 && (e.key.match(/[^a-zA-Z0-9가-힣ㄱ-ㅎ]/) || e.key.match(/\w/)))) {
            const range = useRangeData();
            
            if(range.startIdx !== range.endIdx) {
                const rangeData = JSON.parse(JSON.stringify(TmpBodyData.current));
                const pastData: PastBodyType[] = [{
                    ...rangeData,
                    data: BodyData,
                }];
                console.log(e.key, e.code)
                if (timer.current) {
                    clearInterval(timer.current)
                    timer.current = null;
                    pastData.unshift({
                        ...range,
                        data: rangeData.data,
                    });
                }

                const newRange = document.createRange();
                const startNode = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx}"] div div div`)
                const endNode = document.querySelector<HTMLElement>(`div[data-idx="${range.endIdx}"] div div div`)

                newRange?.setStart((startNode?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? startNode?.childNodes[range.startNodeIdx].childNodes[0] : startNode?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
                newRange?.setEnd(startNode as HTMLElement, startNode?.childNodes.length ?? 1)
                newRange?.deleteContents()
                
                newRange?.setStart(endNode as HTMLElement, 0)
                newRange?.setEnd((endNode?.childNodes[range.endNodeIdx].nodeName === 'SPAN' ? endNode?.childNodes[range.endNodeIdx]?.childNodes[0] : endNode?.childNodes[range.endNodeIdx]) as ChildNode, range.endCursorIdx ?? 0)
                newRange?.deleteContents()

                useNodeSet(startNode)
                const nodeIdx = (startNode?.childNodes.length ?? 1) - 1
                const nodeCursorIdx = startNode?.childNodes.length !== 0 ? startNode?.childNodes[startNode?.childNodes.length - 1].textContent?.length ?? 0 : 0

                const DIV = document.createElement('div');
                DIV.innerHTML = (startNode?.innerHTML ?? '') + (endNode?.innerHTML ?? '')
                useNodeSet(DIV)
                
                const Data = {
                    data: [
                        ...rangeData.data.slice(0, range.startIdx),
                        {
                            ...rangeData.data[range.startIdx],
                            contents: DIV.innerHTML
                        },
                        ...rangeData.data.slice(range.endIdx + 1)
                    ],
                    startIdx: range.startIdx,
                    startNodeIdx: nodeIdx,
                    startCursorIdx: nodeCursorIdx,
                    endIdx: range.startIdx,
                    endNodeIdx: nodeIdx,
                    endCursorIdx: nodeCursorIdx,
                    direction: false
                }
                
                TmpBodyData.current = Data;
                setPastBodyData(pastBodyData => [
                    Data,
                    ...pastData,
                    ...pastBodyData
                ])
                setBodyData(Data.data);
                setViewBodyData(Data.data);
                cursorIdx.current = range.startIdx - 1;
                curosrState.current = 'cursorRedefine';
            }
        }
        console.log(e.key)
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
        const range = useRangeData();

        // 노드를 연속으로 삭제하면 문제가 있음
        // 클릭했을 경우 timer가 작동중이면 멈추고 새로 해야함
        // 방향키를 누르는 경우도 마찬가지이고,
        // 스페이스 키를 누르는 경우도 포함

        if (!element?.isCollapsed && curosrState.current !== 'cursorSet') {
            const newRange = document.createRange();
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
        
        if ((cursorIdx.current !== range.startIdx || curosrState.current === 'cursorSet') && curosrState.current !== 'cursorRedefine') {
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
                    placeholder: i === range.startIdx
                }
            }))
            
            curosrState.current = 'standBy';
        }
        cursorIdx.current = range.startIdx;
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
        const range = useRangeData();
        const content = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx}"] div div div`)
        
        if(content?.textContent === '') {
            content.innerHTML = ''
        }

        TmpBodyData.current = {
            ...TmpBodyData.current,
            data:[
                    ...TmpBodyData.current.data.slice(0, range.startIdx),
                    {
                        ...TmpBodyData.current.data[range.startIdx],
                        contents: content?.innerHTML ?? ''
                    },
                    ...TmpBodyData.current.data.slice(range.startIdx + 1)
            ]
        };

        if (JSON.stringify(TmpBodyData.current.data) !== JSON.stringify(BodyData) && !keySet['Control']) {         
            curosrState.current = 'write';

            if (!timer.current) {
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
                }, 2000)
            }            
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
            const setStartNode = startNode?.childNodes[startNodeIdx]?.nodeName === 'SPAN' && startNode?.childNodes[startNode?.childNodes.length - 1].textContent?.length !== 0 ? startNode?.childNodes[startNodeIdx].childNodes[0] : startNode?.childNodes[startNodeIdx];
            const setEndNode = endNode?.childNodes[endNodeIdx]?.nodeName === 'SPAN' && endNode?.childNodes[endNode?.childNodes.length - 1].textContent?.length !== 0 ? endNode?.childNodes[endNodeIdx].childNodes[0] : endNode?.childNodes[endNodeIdx];

            newRange?.setStart((setStartNode ?? startNode) as HTMLElement, startCursorIdx);
            newRange?.setEnd((setEndNode ?? endNode) as HTMLElement, endCursorIdx);

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