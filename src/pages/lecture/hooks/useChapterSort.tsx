import {chapterProps} from "../../../components/Chapter/Chapter";

const useChapterSort = (chapters: chapterProps[]) => {
    const cChapter = chapters;
    cChapter.sort((a: chapterProps, b: chapterProps) => a.sequence - b.sequence);
    return {sorted: cChapter}
}

export default useChapterSort;
