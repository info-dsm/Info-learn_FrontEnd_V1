import { useNodeIdxHook, useNodeTextIdxHook } from "./nodeIdxHook";

const useRangeData = () => {
    const element = document.getSelection();

    let direction = false;
    const idx = useNodeIdxHook(element?.anchorNode?.parentElement, 10);
    const endIdx = useNodeIdxHook(element?.focusNode?.parentElement, 10);
    const nodeIdx = useNodeTextIdxHook(element?.anchorNode);
    const endNodeIdx = useNodeTextIdxHook(element?.focusNode);
    const startCursor = element?.anchorOffset ?? 0;
    const endCursor = element?.focusOffset ?? 0;

    if (idx > endIdx) direction = true;
    if (idx === endIdx && nodeIdx > endNodeIdx) direction = true;
    if (idx === endIdx && nodeIdx === endNodeIdx && startCursor > endCursor) direction = true;

    return {
        startIdx: direction ? endIdx : idx,
        startNodeIdx: direction ? endNodeIdx : nodeIdx,
        startCursorIdx: direction ? endCursor : startCursor,
        endIdx: direction ? idx : endIdx,
        endNodeIdx: direction ? nodeIdx : endNodeIdx,
        endCursorIdx: direction ? startCursor : endCursor,
        direction
    };
}

export default useRangeData;