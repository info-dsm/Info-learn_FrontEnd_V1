import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useEnterHook } from "./enterHook";
import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";

interface BodyType {
    contents: string;
    placeholder: boolean;
    id: string;
    type: string;
    css: string;
}

interface PastBodyType {
    data: BodyType[];
    idx?: number;
    nodeIdx?: number;
    cursorIdx?: number;
    endIdx?: number;
    endNodeIdx?: number;
    endCursorIdx?: number;
    direction?: boolean;
}

export const useListHook = () => {
    const timer = useRef<NodeJS.Timer | null>(null);
    const $Container = useRef<HTMLDivElement | null>(null);
    const cursorIdx = useRef<number>(-2)
    const curosrState = useRef<string>('outside');
    const [pastBodyData, setPastBodyData] = useState<PastBodyType[]>([])
    const TmpBodyData = useRef<PastBodyType | null>(null);
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

        if (!keySet['Shift'] && e.key === 'Enter') {
            const element = document.getSelection();
            e.preventDefault();
            curosrState.current = 'enter';
            // 퀀트롤 z 눌렀을때 이전의 것으로 바뀌고
            // useEffect 발동할 때 새로 추가한 녀석이 사라질 수 있게 조치를 취할 것
            setPastBodyData([{
                data: timer.current ? (TmpBodyData.current as PastBodyType).data : BodyData,
                idx: useNodeIdxHook(element?.anchorNode?.parentElement, 10),
                nodeIdx: useNodeTextIdxHook(element?.anchorNode),
                cursorIdx: element?.anchorOffset ?? 0
            },
            ...pastBodyData
            ]);
            // 이거 저장 조금 이상한 
            if (timer.current) {
                clearInterval(timer.current)
                timer.current = null;
                setBodyData((TmpBodyData.current as PastBodyType).data);
                TmpBodyData.current = null;
            }

            if (element?.isCollapsed) {
                const { newContent, idx } = useEnterHook(element)

                const random = Math.floor(Math.random() * 1000000000);
                TmpBodyData.current = {
                    data: [
                        ...ViewBodyData.slice(0, idx),
                        {
                            ...ViewBodyData[idx],
                            contents: newContent[0]
                        },
                        {
                            contents: newContent[1],
                            placeholder: false,
                            id: `${random}`,
                            type: 'Text',
                            css: '',
                        },
                        ...ViewBodyData.slice(idx + 1)
                    ]
                };

                cursorIdx.current = idx + 1;
            } else {
                const newRange = element?.getRangeAt(0);
                let startCursor = newRange?.startOffset;
                let endCursor = newRange?.endOffset;
                let startNum = useNodeTextIdxHook(newRange?.startContainer);
                let endNum = useNodeTextIdxHook(newRange?.endContainer)
                let startIdx = useNodeIdxHook(newRange?.startContainer.parentElement, 10)
                let endIdx = useNodeIdxHook(newRange?.endContainer.parentElement, 10)
                let startNode = document.querySelector<HTMLElement>(`div[data-idx="${startIdx}"] div div div`)
                let endNode = document.querySelector<HTMLElement>(`div[data-idx="${endIdx}"] div div div`)

                while (!startNode?.textContent && startIdx !== endIdx) {
                    startNode = document.querySelector<HTMLElement>(`div[data-idx="${++startIdx}"] div div div`)
                    startNum = 0;
                    startCursor = 0;
                }
                while (!endNode?.textContent && startIdx !== endIdx) {
                    endNode = document.querySelector<HTMLElement>(`div[data-idx="${--endIdx}"] div div div`)
                    endNum = (endNode?.childNodes.length ?? 1) - 1;
                    endCursor = endNode?.childNodes[endNum].textContent?.length ?? 0;
                }

                if (startIdx === endIdx && startNode?.textContent) {
                    // 인덱스가 같고 텍스트가 있을때
                    newRange?.setStart((startNode?.childNodes[startNum].nodeName === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((endNode?.childNodes[endNum].nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)
                    newRange?.deleteContents()

                    newRange?.setStart((startNode?.childNodes[startNum].nodeName === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((startNode?.childNodes[startNum].nodeName === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)

                    element?.removeAllRanges();
                    element?.addRange(newRange as Range);

                    const { newContent, idx } = useEnterHook(element);

                    const random = Math.floor(Math.random() * 1000000000);
                    TmpBodyData.current = {
                        data: [
                            ...ViewBodyData.slice(0, startIdx),
                            {
                                ...ViewBodyData[startIdx],
                                contents: newContent[0]
                            },
                            {
                                contents: newContent[1],
                                placeholder: false,
                                id: `${random}`,
                                type: 'Text',
                                css: '',
                            },
                            ...ViewBodyData.slice(endIdx + 1)
                        ]
                    };
                    cursorIdx.current = idx + 1;
                } else if (startIdx !== endIdx && startNode?.textContent && endNode?.textContent) {
                    // 드래그 했는데 처음 인덱스와 끝 인덱스가 다를 경우
                    newRange?.setStart((startNode?.childNodes[startNum].nodeName === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((endNode?.childNodes[endNum].nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)
                    newRange?.deleteContents()

                    let cnt = 0;
                    if (startNode && startNode.childNodes) {
                        for (const value of Object.entries(startNode.childNodes)) {
                            if (value[1].textContent === '') {
                                cnt += 1;
                                startNode.removeChild(value[1])
                            }
                            else {
                                if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                                    value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                                }
                            }
                        }
                    }

                    cnt = 0;
                    if (endNode && endNode.childNodes) {
                        for (const value of Object.entries(endNode.childNodes)) {
                            if (value[1].textContent === '') {
                                cnt += 1;
                                endNode.removeChild(value[1])
                            }
                            else {
                                if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                                    value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                                }
                            }
                        }
                    }

                    TmpBodyData.current = {
                        data: [
                            ...ViewBodyData.slice(0, startIdx),
                            {
                                ...ViewBodyData[startIdx],
                                contents: startNode?.childNodes[0]?.parentElement?.innerHTML ?? ''
                            },
                            {
                                ...ViewBodyData[endIdx],
                                contents: endNode?.childNodes[0]?.parentElement?.innerHTML ?? ''
                            },
                            ...ViewBodyData.slice(endIdx + 1)
                        ]
                    };
                    cursorIdx.current = startIdx + 1;
                } else {
                    // 모두 허공 드래그일때
                    newRange?.setStart(startNode as ChildNode, 0)
                    newRange?.setEnd(startNode as ChildNode, 0)

                    element?.removeAllRanges();
                    element?.addRange(newRange as Range);

                    newRange?.detach();
                    const { newContent, idx } = useEnterHook(element)

                    const random = Math.floor(Math.random() * 1000000000);
                    TmpBodyData.current = {
                        data: [
                            ...ViewBodyData.slice(0, idx),
                            {
                                ...ViewBodyData[idx],
                                contents: newContent[0]
                            },
                            {
                                contents: newContent[1],
                                placeholder: false,
                                id: `${random}`,
                                type: 'Text',
                                css: '',
                            },
                            ...ViewBodyData.slice(idx + 1)
                        ]
                    };

                    cursorIdx.current = idx + 1;
                }
            }
            setViewBodyData((TmpBodyData.current as PastBodyType).data)
            setBodyData((TmpBodyData.current as PastBodyType).data)
            TmpBodyData.current = null;
        }
        else if (keySet['Shift'] && e.key === 'Tab') {
            e.preventDefault();
        }
        else if (keySet['Control'] && e.key === 'z') {
            e.preventDefault();
            // 이거 write 설정하는 것 때문에 안 되야하는데 되서 로직 바꿔야함
            if (curosrState.current === 'write' && timer.current) {
                console.log(curosrState.current, timer.current)
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
                console.log(pastBodyData)
                setBodyData(pastBodyData[0].data)
                if(JSON.stringify(BodyData) === JSON.stringify(ViewBodyData)) {
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
            const idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10)
            const nodeIdx = useNodeTextIdxHook(element?.anchorNode)
            if (idx === 0 && element?.anchorOffset === 0 && nodeIdx === 0) {
                e.preventDefault()
            }
            else if(element?.isCollapsed && element.anchorOffset === 0 && nodeIdx === 0) {

                e.preventDefault();
                const node = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)
                let data: BodyType[];
                if(node?.innerHTML === '') {
                    data = [
                        ...BodyData.slice(0, idx),
                        ...BodyData.slice(idx + 1)
                    ];
                    setPastBodyData([
                        {
                            data: BodyData,
                            idx,
                            nodeIdx,
                            cursorIdx: element.anchorOffset
                        },
                        ...pastBodyData
                    ])
                    curosrState.current = 'delNode';
                } else {
                    const node = document.querySelector<HTMLElement>(`div[data-idx="${idx - 1}"] div div div`)
                    
                    const DIV = document.createElement('div');
                    DIV.innerHTML = BodyData[idx - 1].contents + BodyData[idx].contents

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
                        ...BodyData.slice(0, idx - 1),
                        {
                            ...BodyData[idx - 1],
                            contents: DIV.innerHTML
                        },
                        ...BodyData.slice(idx + 1)
                    ];
                    setPastBodyData([
                        {
                            data: data,
                            idx: idx - 1,
                            nodeIdx: (node?.childNodes.length ?? 1) - 1,
                            cursorIdx: node?.childNodes[node?.childNodes.length - 1].textContent?.length
                        },
                        {
                            data: BodyData,
                            idx,
                            nodeIdx,
                            cursorIdx: element.anchorOffset
                        },
                        ...pastBodyData
                    ])
                    curosrState.current = 'cursorRedefine'
                }
                setBodyData(data);
                setViewBodyData(data);
                cursorIdx.current = idx - 1;
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

    const setTmpBodyData = (TmpBodyData: React.MutableRefObject<PastBodyType | null>, BodyData: BodyType[]) => {
        const element = document.getSelection();

        let direction = false;
        const idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);
        const endIdx = useNodeIdxHook(element?.focusNode?.parentElement, 10);
        const nodeIdx = useNodeTextIdxHook(element?.anchorNode);
        const endNodeIdx = useNodeTextIdxHook(element?.focusNode);
        const startCursor = element?.anchorOffset ?? 0;
        const endCursor = element?.focusOffset ?? 0;

        if(idx > endIdx) direction = true;
        if(idx === endIdx && nodeIdx > endNodeIdx) direction = true;
        if(idx === endIdx && nodeIdx === endNodeIdx && startCursor > endCursor) direction = true;
        
        TmpBodyData.current = {
            data: TmpBodyData.current?.data ?? BodyData,
            idx: direction ? endIdx : idx,
            nodeIdx: direction ? endNodeIdx : nodeIdx,
            cursorIdx: direction ? endCursor : startCursor,
            endIdx: direction ? idx : endIdx,
            endNodeIdx: direction ? nodeIdx : endNodeIdx,
            endCursorIdx: direction ? startCursor : endCursor,
            direction
        }
    }

    const select = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        const element = document.getSelection()
        const Idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);

        // 노드를 연속으로 삭제하면 문제가 있음
        // 클릭했을 경우 timer가 작동중이면 멈추고 새로 해야함
        // 방향키를 누르는 경우도 마찬가지이고,
        // 스페이스 키를 누르는 경우도 포함

        if (cursorIdx.current !== Idx) {
            if (timer.current) {
                const idx = TmpBodyData.current?.idx ?? 0
                const nodeIdx = TmpBodyData.current?.nodeIdx ?? 0
                const cursorIdx = TmpBodyData.current?.cursorIdx ?? 0

                setPastBodyData(pastBodyData => [
                    {
                        data: BodyData,
                        idx,
                        nodeIdx,
                        cursorIdx
                    },
                    ...pastBodyData
                ]);
                setBodyData((TmpBodyData.current as PastBodyType).data);
                console.log((TmpBodyData.current as PastBodyType))
                clearInterval(timer.current as NodeJS.Timer);
                timer.current = null;
                curosrState.current = 'standBy';
            }

            
            setViewBodyData(ViewBodyData => ViewBodyData.map((v, i) => {
                return {
                    ...v,
                    placeholder: i === Idx
                }
            }))
            // console.log('상',curosrState.current, cursorIdx.current)
        }
        cursorIdx.current = Idx;
        if(curosrState.current === 'outside') curosrState.current = 'standBy';

        if (element?.isCollapsed) {
            if (!element.anchorNode?.textContent) {
                // placeholder 설정하는 방법 알아내서 여기에 추가 해야함!!!!!!!!!!!
                const node = document.querySelector<HTMLElement>(`div[data-idx="${Idx}"]`);

                // node?.setAttribute('placeholder','명령어는 / 입력')
            }
        }

        if (curosrState.current !== 'write' && timer.current === null) {
            setTmpBodyData(TmpBodyData, ViewBodyData);
        }

        // 이거는 일단 보류하는 걸로 결정
        // else {
        //     // 이거 뭔가 문제가 발생하고 있음
        //     // 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //     if(timer.current) {
        //         clearInterval(timer.current);
        //         timer.current = null;
        //     }

        //     timer.current = setInterval(() => {
        //         const newRange = element?.getRangeAt(0);
        //         let startCursor = newRange?.startOffset;
        //         let endCursor = newRange?.endOffset;
        //         let startNum = useNodeTextIdxHook(newRange?.startContainer);
        //         let endNum = useNodeTextIdxHook(newRange?.endContainer)
        //         let startIdx = useNodeIdxHook(newRange?.startContainer.parentElement, 10)
        //         let endIdx = useNodeIdxHook(newRange?.endContainer.parentElement, 10)
        //         let startNode = document.querySelector<HTMLElement>(`div[data-idx="${startIdx}"] div div div`)
        //         let endNode = document.querySelector<HTMLElement>(`div[data-idx="${endIdx}"] div div div`)

        //         while(!endNode?.textContent && startIdx !== endIdx) {
        //             endNode = document.querySelector<HTMLElement>(`div[data-idx="${--endIdx}"] div div div`)
        //             endNum = (endNode?.childNodes.length ?? 1) - 1;
        //             endCursor = endNode?.childNodes[endNum]?.textContent?.length ?? 0;
        //         }
        //         while(!startNode?.textContent && startIdx !== endIdx) {
        //             startNode = document.querySelector<HTMLElement>(`div[data-idx="${++startIdx}"] div div div`)
        //             startNum = 0;
        //             startCursor = 0;
        //         }

        //         newRange?.setStart((startNode?.childNodes[startNum]?.nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
        //         newRange?.setEnd((endNode?.childNodes[endNum]?.nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)    
        //         element?.removeAllRanges();
        //         element?.addRange(newRange as Range);

        //         clearInterval(timer.current as NodeJS.Timer);
        //         timer.current = null;
        //     }, 100)
        // }
    }

    const moveForward = (idx: number) => {
        const content = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)
        if (content) {
            const selection = document.getSelection();
            selection?.removeAllRanges();
            selection?.selectAllChildren(content)
            selection?.collapseToStart();
            curosrState.current = 'standBy';
        }
    }

    const movebackward = (idx: number) => {
        const content = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)
        if (content) {
            const selection = document.getSelection();
            selection?.removeAllRanges();
            selection?.selectAllChildren(content)
            selection?.collapseToEnd();
            curosrState.current = 'standBy';
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
                data: TmpBodyData.current?.data ?
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

            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
            
            if(JSON.stringify(TmpBodyData.current.data) !== JSON.stringify(BodyData) && !keySet['Control']) {
                console.log(curosrState.current)
                curosrState.current = 'write';
                console.log(e.nativeEvent)
                timer.current = setInterval(() => {
                    const idx = TmpBodyData.current?.idx ?? 0
                    const nodeIdx = TmpBodyData.current?.nodeIdx ?? 0
                    const cursorIdx = TmpBodyData.current?.cursorIdx ?? 0
                    setPastBodyData(pastBodyData => [{
                            data: BodyData,
                            idx,
                            nodeIdx,
                            cursorIdx
                        },
                        ...pastBodyData
                    ]);
                    console.log(idx, nodeIdx, cursorIdx)
                    // cursor 위치 때문에 고민이 됨
                    clearInterval(timer.current as NodeJS.Timer);
                    timer.current = null;
                    setBodyData((TmpBodyData.current as PastBodyType).data)
                    TmpBodyData.current = null;
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
        if (curosrState.current === 'enter') moveForward(cursorIdx.current);
        else if(curosrState.current === 'delNode') movebackward(cursorIdx.current);
        else if (curosrState.current === 'cursorRedefine' && pastBodyData.length) {
            const element = document.getSelection();
            const newRange = document.createRange();
            const { idx = 0, nodeIdx = 0, cursorIdx = 0 } = pastBodyData[0];
            const node = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`);
            const setNode = node?.childNodes[nodeIdx]?.nodeName === 'SPAN' ? node?.childNodes[nodeIdx].childNodes[0] : node?.childNodes[nodeIdx];
            // console.log('되는건가?', node?.childNodes[nodeIdx])
            newRange?.setStart(setNode as ChildNode ?? node, cursorIdx);
            newRange?.setEnd(setNode as ChildNode ?? node, cursorIdx);

            element?.removeAllRanges();
            element?.addRange(newRange as Range);

            newRange?.detach();
            setPastBodyData(pastBodyData.slice(1));
            setViewBodyData(ViewBodyData => ViewBodyData.map((v, i) => {
                return {
                    ...v,
                    placeholder: i === idx
                }
            }))
            curosrState.current = 'standBy'
        }
        else if (curosrState.current === 'before') {
            setViewBodyData(BodyData);
            // const element = document.getSelection();
            // element?.removeAllRanges();
            curosrState.current = 'cursorRedefine'
        }
    }, [ViewBodyData])

    return { keyDown, select, keyUp, $Container, onBlur, ViewBodyData, InputEvent }
}