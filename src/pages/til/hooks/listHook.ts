import { useEffect, useRef, useState } from "react";
import { useEnterHook } from "./enterHook";
import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";
interface BodyType {
    contents: string;
    id: string;
    type: string;
    css: string;
}

export const useListHook = () => {
    const timer = useRef<NodeJS.Timer | null>(null);
    const $Container = useRef<HTMLDivElement | null>(null);
    const cursorIdx = useRef<number>(-2)
    const [BodyData, setBodyData] = useState<BodyType[]>([
        {
            contents: '여기는 DIV<span className="tmp" data-text-idx=1>이거는 span임</span>글글',
            id: '0',
            type: 'Text',
            css: '',
        },
        {
            contents: '<span data-text-idx=0>이거는 span임</span>',
            id: '1',
            type: 'Text',
            css: '',
        },
        {
            contents: '',
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

            if (element?.isCollapsed) {
                const { newContent, idx } = useEnterHook(element, cursorIdx.current)
                
                const random = Math.floor(Math.random() * 1000000000);
                setBodyData([
                    ...BodyData.slice(0, idx),
                    {
                        ...BodyData[idx],
                        contents: newContent[0]
                    },
                    {
                        contents: newContent[1],
                        id: `${random}`,
                        type: 'Text',
                        css: '',
                    },
                    ...BodyData.slice(idx + 1)
                ])

                cursorIdx.current = idx;
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
                //const newContent: [string, string] = ['', ''];
                
                while(!startNode?.textContent && startIdx !== endIdx) {
                    startNode = document.querySelector<HTMLElement>(`div[data-idx="${++startIdx}"] div div div`)
                    startNum = 0;
                    startCursor = 0;
                }
                while(!endNode?.textContent && startIdx !== endIdx) {
                    endNode = document.querySelector<HTMLElement>(`div[data-idx="${--endIdx}"] div div div`)
                    endNum = (endNode?.childNodes.length ?? 1) - 1;
                    endCursor = endNode?.childNodes[endNum].textContent?.length ?? 0;
                }
                
                if(startIdx === endIdx && startNode?.textContent) {
                    // 인덱스가 같고 텍스트가 있을때
                    newRange?.setStart((startNode?.childNodes[startNum].nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((endNode?.childNodes[endNum].nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)
                    newRange?.deleteContents()

                    newRange?.setStart((startNode?.childNodes[startNum].nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((startNode?.childNodes[startNum].nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
    
                    element?.removeAllRanges();
                    element?.addRange(newRange as Range);
                    
                    newRange?.detach();
                    const { newContent, idx } = useEnterHook(element, cursorIdx.current);
                    
                    const random = Math.floor(Math.random() * 1000000000);
                    console.log(newContent[0])
                    setBodyData([
                        ...BodyData.slice(0, startIdx),
                        {
                            ...BodyData[startIdx],
                            contents: newContent[0]
                        },
                        {
                            contents: newContent[1],
                            id: `${random}`,
                            type: 'Text',
                            css: '',
                        },
                        ...BodyData.slice(endIdx + 1)
                    ])
                    cursorIdx.current = idx;
                } else if(startIdx !== endIdx) {
                    // 드래그 했는데 처음 인덱스와 끝 인덱스가 다를 경우
                    newRange?.setStart((startNode?.childNodes[startNum].nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((endNode?.childNodes[endNum].nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)
                    newRange?.deleteContents()
                    
                    if(startNode?.childNodes) {
                        let cnt = 0;
                        for (const value of Object.entries(startNode.childNodes)) {
                            if (value[1].textContent === '') {
                                cnt += 1;
                                delete startNode.childNodes[+value[0]]
                            }
                            else if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                                value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                            }
                        }
                    }

                    if(endNode?.childNodes) {
                        let cnt = 0;
                        for (const value of Object.entries(endNode.childNodes)) {
                            if (value[1].nodeName === '#text' && value[1].textContent === '') {
                                cnt += 1;
                            }
                            else if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                                value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                            }
                        }
                    }

                    setBodyData([
                        ...BodyData.slice(0, startIdx),
                        {
                            ...BodyData[startIdx],
                            contents: startNode?.childNodes[0].parentElement?.innerHTML as string
                        },
                        {
                            ...BodyData[endIdx],
                            contents: endNode?.childNodes[0].parentElement?.innerHTML as string
                        },
                        ...BodyData.slice(endIdx + 1)
                    ])
                    cursorIdx.current = startIdx;
                } else {
                    // 모두 허공 드래그일때
                    newRange?.setStart(startNode as ChildNode, 0)
                    newRange?.setEnd(startNode as ChildNode, 0)

                    element?.removeAllRanges();
                    element?.addRange(newRange as Range);

                    newRange?.detach();
                    const { newContent, idx } = useEnterHook(element, cursorIdx.current)

                    const random = Math.floor(Math.random() * 1000000000);
                    setBodyData([
                        ...BodyData.slice(0, idx),
                        {
                            ...BodyData[idx],
                            contents: newContent[0]
                        },
                        {
                            contents: newContent[1],
                            id: `${random}`,
                            type: 'Text',
                            css: '',
                        },
                        ...BodyData.slice(idx + 1)
                    ])

                    cursorIdx.current = idx;
                }
            }
        }
        if (keySet['Shift'] && e.key === 'Tab') {
            e.preventDefault();
        }
        if (e.key === 'Backspace') {

            if (BodyData.length === 1) {
                e.preventDefault()
                console.log(document.getSelection())
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
        console.log(element?.isCollapsed)
        if(Idx !== -2 || !element?.getRangeAt(0).collapse) cursorIdx.current = -2;
        // if(element?.isCollapsed) {
        //     if(!element.anchorNode?.textContent) {
        //         // placeholder 설정하는 방법 알아내서 여기에 추가 해야함!!!!!!!!!!!
        //         const node = document.querySelector<HTMLElement>(`div[data-idx="${Idx}"] div div div`);
        //         // node?.setAttribute('placeholder','명령어는 / 입력')
        //     }
        // } else {
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

    const EnterSelect = (idx: number) => {
        const content = document.querySelector<HTMLElement>(`div[data-idx="${idx + 1}"] div div`)
        if(content) {
            const selection = document.getSelection();
            // if(selection?.anchorNode?.nodeName === '#text') {
            //     // const tmp = selection?.anchorNode?.childNodes[0].childNodes[0].childNodes[0] as ChildNode;
            //     // const newRange = document.createRange();
            //     // newRange.setStart(tmp, startOffset);
            //     // newRange.setEnd(endContainer, endOffset);
            //     console.log(selection?.anchorOffset);
            //     console.log(selection.anchorNode.textContent)
            // } else {
                selection?.removeAllRanges();
                selection?.selectAllChildren(content)
                selection?.collapseToStart();
            // }
        }
    }

    useEffect(() => {
        EnterSelect(cursorIdx.current)
    }, [BodyData])
return {keyDown,select,keyUp,$Container,setKeySet,BodyData}
}