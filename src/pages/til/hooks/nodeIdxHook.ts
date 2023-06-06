export const useNodeIdxHook = (element: HTMLElement | null | undefined, limit: number): number => {
    while(element && limit-- !== 0) {
        if(element?.dataset.idx) {
            return Number(element?.dataset.idx)
        }
        element = element?.parentElement
    }
    return -2;
}

export const useNodeTextIdxHook = (element: Node | null | undefined) => {
    if(element?.parentNode?.nodeName === 'SPAN') {
        return Number(element.parentElement?.dataset.textIdx);
    }
    else if(element?.nextSibling?.nodeName === 'SPAN') {
        return Number(element.nextSibling.childNodes[0].parentElement?.dataset.textIdx) - 1                    }
    else if(element?.previousSibling?.nodeName === 'SPAN') {
        return Number(element.previousSibling.childNodes[0].parentElement?.dataset.textIdx) + 1
    }
    return 0;
}