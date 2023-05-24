import React, {useEffect, useState} from "react";
import {chapterProps} from "../../../components/Chapter/Chapter";

interface detailProps {
    chapters: chapterProps[];
}

const useChapterTimes = (detail: detailProps, setChapter?: React.Dispatch<React.SetStateAction<chapterProps[] | undefined>>) => {
    const [vA, setVA] = useState<{
        vNum: number;
        vTime: number[];
        cNum: number[];
        cTime: number[][];
        cAll: number[];
    }>({
        vNum: 0,
        vTime: [],
        cNum: [],
        cTime: [],
        cAll: []
    });
    useEffect(() => {
        if (detail) {
            const cChapter = detail.chapters;
            cChapter.sort((a: chapterProps, b: chapterProps) => a.sequence - b.sequence);
            setChapter && setChapter(cChapter);
            let videoNum = 0;
            let videoTime = 0;
            const chapterTime: number[] = [];
            const chapterNum: number[] = [];
            cChapter.map((v: chapterProps) => {
                if (v.videos) {
                    let a = 0;
                    videoNum += v.videos.length;
                    chapterNum.push(v.videos.length);
                    if (v.videos[0]) {
                        a += v.videos?.reduce((accumulator, currentValue) =>
                            accumulator + (currentValue.hour * 3600) + (currentValue.minute * 60) + currentValue.second, 0);
                    }
                    chapterTime.push(a);
                    videoTime += a;
                }
            });
            const videoTimes = [];
            videoTimes.push(Math.floor(videoTime / 3600));
            videoTimes.push(Math.floor(videoTime / 60));
            const chapterTimes = chapterTime.map((v) => [Math.floor(v / 3600), Math.floor(v / 60)]);
            setVA({
                vNum: videoNum,
                vTime: videoTimes,
                cTime: chapterTimes,
                cNum: chapterNum,
                cAll: chapterTime
            })
        }
    }, [detail]);
    return {
        lNum: vA.vNum,
        lTime: vA.vTime,
        cTime: vA.cTime,
        cNum: vA.cNum,
        cAll: vA.cAll
    }
}

export default useChapterTimes