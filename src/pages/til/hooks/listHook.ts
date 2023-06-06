import { useEffect, useRef, useState } from "react";
import { useEnterHook } from "./enterHook";
import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";
interface BodyType {
    contents: string;
    placeholder: boolean;
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
                        placeholder: false,
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
                    
                    const { newContent, idx } = useEnterHook(element, cursorIdx.current);
                    
                    const random = Math.floor(Math.random() * 1000000000);
                    setBodyData([
                        ...BodyData.slice(0, startIdx),
                        {
                            ...BodyData[startIdx],
                            contents: newContent[0]
                        },
                        {
                            contents: newContent[1],
                            placeholder: false,
                            id: `${random}`,
                            type: 'Text',
                            css: '',
                        },
                        ...BodyData.slice(endIdx + 1)
                    ])
                    cursorIdx.current = idx;
                } else if(startIdx !== endIdx && startNode?.textContent && endNode?.textContent) {
                    // 드래그 했는데 처음 인덱스와 끝 인덱스가 다를 경우
                    newRange?.setStart((startNode?.childNodes[startNum].nodeName  === 'SPAN' ? startNode?.childNodes[startNum].childNodes[0] : startNode?.childNodes[startNum]) as ChildNode, startCursor ?? 0)
                    newRange?.setEnd((endNode?.childNodes[endNum].nodeName === 'SPAN' ? endNode?.childNodes[endNum]?.childNodes[0] : endNode?.childNodes[endNum]) as ChildNode, endCursor ?? 0)
                    newRange?.deleteContents()
                    
                    // if(startNode?.childNodes) {
                    //     let cnt = 0;
                    //     for (const value of Object.entries(startNode.childNodes)) {
                    //         if (value[1].textContent === '') {
                    //             cnt += 1;
                    //             delete startNode.childNodes[+value[0]]
                    //         }
                    //         else if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                    //             value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                    //         }
                    //     }
                    // }

                    // if(endNode?.childNodes) {
                    //     let cnt = 0;
                    //     for (const value of Object.entries(endNode.childNodes)) {
                    //         if (value[1].nodeName === '#text' && value[1].textContent === '') {
                    //             cnt += 1;
                    //         }
                    //         else if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                    //             value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                    //         }
                    //     }
                    // }

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
                            placeholder: false,
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
                // console.log(document.getSelection())
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
        
        console.log(2, document.querySelector<HTMLElement>(`div[data-idx="${Idx}"] div div div`)?.innerHTML)
        // console.log(BodyData[Idx])
        if(Idx !== -2 || !element?.getRangeAt(0).collapse) cursorIdx.current = -2;
        setBodyData(BodyData => BodyData.map((v, i) => {
            return {
            ...v,
            placeholder: i === Idx
        }}))
        if(element?.isCollapsed) {
            if(!element.anchorNode?.textContent) {
                // placeholder 설정하는 방법 알아내서 여기에 추가 해야함!!!!!!!!!!!
                const node = document.querySelector<HTMLElement>(`div[data-idx="${Idx}"]`);
                
                // node?.setAttribute('placeholder','명령어는 / 입력')
            }
        }
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

    const EnterSelect = (idx: number) => {
        const content = document.querySelector<HTMLElement>(`div[data-idx="${idx + 1}"] div div div`)
        if(content) {
            const selection = document.getSelection();
            // if(selection?.anchorNode?.nodeName === '#text') {
            //     // const tmp = selection?.anchorNode?.childNodes[0].childNodes[0].childNodes[0] as ChildNode;
            //     // const newRange = document.createRange();
            //     // newRange.setStart(tmp, startOffset);
            //     // newRange.setEnd(endContainer, endOffset);
            // //     console.log(selection?.anchorOffset);
            // //     console.log(selection.anchorNode.textContent)
            // } else {
                // console.log($Container.current)
                selection?.removeAllRanges();
                selection?.selectAllChildren(content)
                selection?.collapseToStart();

            // }
        }
    }

    const InputEvent = (e: React.FormEvent<HTMLDivElement>) => {
        console.log(33333333333)
        const element = document.getSelection();
        const Idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10)
        // getselection으로 관리 할 시 누군가 관리자모드로 수정할 위험이 있

        // 이러니까 모든 텍스트가 가져와짐
        // console.log(e.currentTarget.childNodes)
        // 일단 방법 찾아보고
        // 안되면 getselection쓰던지 해서 해야할듯
    }

    const callback = (mutationsList: any, observer: any) => {
        console.log(1, mutationsList)
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            // 변경된 속성이 개발자 도구에 의한 변경인지 확인
            if (mutation.target.__proto__ !== HTMLDivElement.prototype) {
              // 변경을 막으려는 요소의 속성을 이전 값으로 되돌림
              mutation.target.setAttribute(mutation.attributeName, mutation.oldValue);
            }
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
        EnterSelect(cursorIdx.current)
    }, [BodyData])
return {keyDown,select,keyUp,$Container,setKeySet,BodyData, InputEvent}
}