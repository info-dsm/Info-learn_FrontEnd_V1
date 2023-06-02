import React, { useEffect, useRef, useState } from "react";
import { useListHook } from "../hooks/listHook";
import * as _ from './style';

interface BodyType {
    contents: string;
    id: string;
    type: string;
    css: string;
}

const CreateTIL = () => {
    const {keyDown,select,keyUp,$Container,setKeySet,BodyData} = useListHook();
    
    useEffect(() => {
        console.log(BodyData)
    }, [BodyData])

    return (
        <_.TILContainer
            ref={$Container}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            onBlur={() => setKeySet({})}
            onSelect={(e) => select(e)}
            suppressContentEditableWarning={true}
        >
            {
                BodyData?.map((v: BodyType, i: number) =>
                    <div
                    key={v.id}
                    data-block-id={v.id}
                    data-idx={i} style={_.style.Text}
                    tabIndex={0}
                    >
                        <div style={{color: 'inherit', fill: 'inherit'}}>
                            <div style={{display: 'flex'}}>
                                <div
                                contentEditable={true}
                                spellCheck={true}
                                style={{
                                    maxWidth: '100%',
                                    width: '100%',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    caretColor: 'rgb(55, 53, 47)',
                                    padding: '3px 2px'
                                }}
                                dangerouslySetInnerHTML={{__html: v.contents}}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </_.TILContainer>
    )
}

export default CreateTIL;