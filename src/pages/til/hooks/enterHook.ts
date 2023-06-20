import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";


export const useEnterHook = (element: Selection | null) => {
    const idx: number = useNodeIdxHook(element?.anchorNode?.parentElement, 10);

    const newContent: [string, string] = ['', ''];
    const node = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)

    if (element?.anchorNode?.nodeName === '#text') {
        const cursor = element.anchorOffset;
        const newRange = document.createRange();
        const num: number = useNodeTextIdxHook(element.anchorNode)
        newRange.setStart((element.anchorNode?.parentNode?.nodeName === 'SPAN' ? node?.childNodes[num].childNodes[0] : node?.childNodes[num]) as ChildNode, cursor)
        newRange.setEnd(node as ParentNode , node?.childNodes.length as number)
        
        const tmpContent = newRange.extractContents()
        const DIV = document.createElement('div')
        let cnt = 0;

        if (node && node.childNodes) {
            for (const value of Object.entries(node.childNodes)) {
                if (value[1].textContent === '') {
                    cnt += 1;
                    node.removeChild(value[1])
                }
                else {
                    if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                        value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                    }
                }
            }
        }

        cnt = 0;
        for (const value of Object.entries(tmpContent.childNodes)) {
            if (value[1].textContent === '') {
                cnt += 1;
                tmpContent.removeChild(value[1])
            }
            else {
                if (value[1].nodeName === 'SPAN' && value[1].childNodes[0].parentElement) {
                    value[1].childNodes[0].parentElement.dataset.textIdx = `${Number(value[0]) - cnt}`
                }
            }
        }
        DIV.append(tmpContent);
        
        newContent[0] = node?.textContent ? node?.innerHTML as string : ''
        newContent[1] = DIV?.textContent ? DIV?.innerHTML as string : ''
    }
    else if (element?.anchorNode?.nodeName === 'DIV' && node?.childNodes) {
        newContent[1] = node?.innerHTML as string
    }

    return { newContent, idx }
}