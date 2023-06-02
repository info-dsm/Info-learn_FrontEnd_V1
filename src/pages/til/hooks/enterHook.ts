import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";


export const useEnterHook = (element: Selection | null, cursorIdx: number) => {
    let idx: number;
    if (cursorIdx === -2) {
        idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);
    } else {
        idx = cursorIdx + 1;
    }

    const newContent: [string, string] = ['', ''];
    const node = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)

    if (element?.anchorNode?.nodeName === '#text') {
        const cursor = element.anchorOffset;
        const newRange = document.createRange();
        const last = node?.childNodes[node?.childNodes.length - 1];
        const num: number = useNodeTextIdxHook(element.anchorNode)
        console.log(element.anchorNode?.parentNode?.nodeName === 'SPAN' ? node?.childNodes[num].childNodes[0] : node?.childNodes[num])
        newRange.setStart((element.anchorNode?.parentNode?.nodeName === 'SPAN' ? node?.childNodes[num].childNodes[0] : node?.childNodes[num]) as ChildNode, cursor)
        // text일때 end parentnode 지정 오류 발생 수정해야함
        newRange.setEnd(node as ParentNode , node?.childNodes.length as number)
        // newRange.setEnd((last?.nodeName === 'SPAN' ? last?.childNodes[0] : last) as ChildNode, Number(last?.textContent?.length))
        console.log(newRange.cloneContents())
        
        const tmpContent = newRange.extractContents()
        const FirstDIV = document.createElement('div')
        const SecondDIV = document.createElement('div')
        let cnt = 0;

        // 자꾸 앞에 데이터가 사라지는 상황이 발생함
        // 변경해야함

        if (node && node.childNodes) {
            for (const value of Object.entries(node.childNodes)) {
                if (value[1].textContent === '') {
                    cnt += 1;
                }
                else {
                    if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                        value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                    }
                    FirstDIV.appendChild(value[1])
                }
            }
        }

        cnt = 0;
        
        for (const value of Object.entries(tmpContent.childNodes)) {
            if (value[1].textContent === '') {
                cnt += 1;
            }
            else {
                if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                    value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                }
                SecondDIV.appendChild(value[1])
            }
        }
        newRange.detach()

        newContent[0] = FirstDIV?.textContent ? FirstDIV?.innerHTML as string : ''
        newContent[1] = SecondDIV?.textContent ? SecondDIV?.innerHTML as string : ''
    }
    else if (element?.anchorNode?.nodeName === 'DIV' && node?.childNodes) {
        newContent[1] = node?.innerHTML as string
    }
    console.log(newContent)
    return { newContent, idx }
}