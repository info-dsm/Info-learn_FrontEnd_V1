import React, { useEffect, useMemo, useRef, useState } from "react";
import { useListHook } from "../hooks/listHook";
import * as _ from './style';

interface BodyType {
    contents: string;
    placeholder: boolean;
    id: string;
    type: string;
    css: string;
}

const CreateTIL = () => {
    const {keyDown,select,keyUp,$Container,setKeySet,BodyData,InputEvent} = useListHook();

    return (
        <_.TILContainer
            id='Id'
            ref={$Container}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            onInput={e => InputEvent(e)}
            onBlur={() => setKeySet({})}
            onSelect={(e) => select(e)}
            suppressContentEditableWarning={true}
        >
            {
                BodyData?.map((v: BodyType, i: number) => (
                    <div
                        key={v.id}
                        data-block-id={v.id}
                        data-idx={i} style={_.style.Text}
                        tabIndex={0}
                    >
                        <div style={{color: 'inherit', fill: 'inherit'}}>
                            <div style={{display: 'flex'}}>
                                <_.TILBlock
                                    placeholder={v.placeholder ? '명령어는 /로 입력' : ''}
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
                                </_.TILBlock>
                            </div>
                        </div>
                    </div>
                ))}

        </_.TILContainer>
    )
}

export default CreateTIL;