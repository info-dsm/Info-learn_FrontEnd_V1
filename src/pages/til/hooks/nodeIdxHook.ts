export const useNodeIdxHook = (element: HTMLElement | null | undefined, limit: number): number => {
    if(element?.dataset.idx) {
        return Number(element?.dataset.idx)
    }
    if(limit <= 0) return -2;
    
    return useNodeIdxHook(element?.parentElement, limit - 1);
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