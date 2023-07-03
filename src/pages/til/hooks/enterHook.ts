import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";
import useRangeData from './rangeData';
import useNodeSet from "./nodeSet";

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

export const useEnterHook = (Data: React.MutableRefObject<PastBodyType>) => {
    const element = document.getSelection();
    const range = useRangeData();
    const newRange = document.createRange();
    const rangeData: PastBodyType = JSON.parse(JSON.stringify(Data.current));

    const idx: number = useNodeIdxHook(element?.anchorNode?.parentElement, 10);

    const newContent: [string, string] = ['', ''];

    if (range.startIdx === range.endIdx) {
        const node = document.querySelector<HTMLElement>(`div[data-idx="${idx}"] div div div`)
        
        if(!element?.isCollapsed) {
            newRange?.setStart((node?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? node?.childNodes[range.startNodeIdx].childNodes[0] : node?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
            newRange?.setEnd((node?.childNodes[range.endNodeIdx].nodeName === 'SPAN' ? node?.childNodes[range.endNodeIdx]?.childNodes[0] : node?.childNodes[range.endNodeIdx]) as ChildNode, range.endCursorIdx ?? 0)
            newRange?.deleteContents()

            newRange?.setStart((node?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? node?.childNodes[range.startNodeIdx].childNodes[0] : node?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
            newRange?.setEnd((node?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? node?.childNodes[range.startNodeIdx].childNodes[0] : node?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)

            element?.removeAllRanges();
            element?.addRange(newRange as Range);
        }
        
        if (element?.anchorNode?.nodeName === '#text') {
            const cursor = element.anchorOffset;
            const newRange = document.createRange();
            const num: number = useNodeTextIdxHook(element.anchorNode)
            newRange.setStart((element.anchorNode?.parentNode?.nodeName === 'SPAN' ? node?.childNodes[num].childNodes[0] : node?.childNodes[num]) as ChildNode, cursor)
            newRange.setEnd(node as ParentNode, node?.childNodes.length as number)

            const tmpContent = newRange.extractContents();
            const DIV = document.createElement('div');

            useNodeSet(node);
            useNodeSet(tmpContent);
            DIV.append(tmpContent);

            newContent[0] = node?.textContent ? node?.innerHTML as string : ''
            newContent[1] = DIV?.textContent ? DIV?.innerHTML as string : ''
        }
        else if (element?.anchorNode?.nodeName === 'DIV' && node?.childNodes) {
            newContent[1] = node?.innerHTML as string
        }
    } else {
        const startNode = document.querySelector<HTMLElement>(`div[data-idx="${range.startIdx}"] div div div`)
        const endNode = document.querySelector<HTMLElement>(`div[data-idx="${range.endIdx}"] div div div`)

        newRange?.setStart((startNode?.childNodes[range.startNodeIdx].nodeName === 'SPAN' ? startNode?.childNodes[range.startNodeIdx].childNodes[0] : startNode?.childNodes[range.startNodeIdx]) as ChildNode, range.startCursorIdx ?? 0)
        newRange?.setEnd(startNode as HTMLElement, startNode?.childNodes.length ?? 1)
        newRange?.deleteContents()

        newRange?.setStart(endNode as HTMLElement, 0)
        newRange?.setEnd((endNode?.childNodes[range.endNodeIdx].nodeName === 'SPAN' ? endNode?.childNodes[range.endNodeIdx]?.childNodes[0] : endNode?.childNodes[range.endNodeIdx]) as ChildNode, range.endCursorIdx ?? 0)
        newRange?.deleteContents()

        useNodeSet(startNode)
        useNodeSet(endNode)

        newContent[0] = startNode?.textContent ? startNode?.innerHTML as string : ''
        newContent[1] = endNode?.textContent ? endNode?.innerHTML as string : ''
    }

    const random = Math.floor(Math.random() * 1000000000);
    Data.current = {
        data: [
            ...rangeData.data.slice(0, range.startIdx),
            {
                ...rangeData.data[range.startIdx],
                contents: newContent[0]
            },
            range.startIdx === range.endIdx ?
                {
                    contents: newContent[1],
                    placeholder: false,
                    id: `${random}`,
                    type: 'Text',
                    css: '',
                }
                :
                {
                    ...rangeData.data[range.endIdx],
                    contents: newContent[1]
                },
            ...rangeData.data.slice(range.endIdx + 1)
        ],
        startIdx: range.startIdx + 1,
        startNodeIdx: 0,
        startCursorIdx: 0,
        endIdx: range.startIdx + 1,
        endNodeIdx: 0,
        endCursorIdx: 0,
        direction: false
    }

    return range.startIdx + 1;
}