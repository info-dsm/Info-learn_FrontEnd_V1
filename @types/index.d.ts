interface vType {
    maxTime: number;
    lastVolume: number;
    isFull: boolean;
    isPnp: boolean;
    isClick: boolean;
    resume: number;
    speed: vSpeed;
    shown: boolean;
}

interface vSpeed {
    count: number;
    before: number;
    news: number;
}

interface vDataProps {
    videoId: number;
    title: string;
    hour: number;
    minute: number;
    second: number;
    sequence: number;
    status: string;
    videoUrl: string;
}

interface chapterProps {
    title: string,
    sequence: number,
    videos: { videoId: number, title: string, playTime: number, sequence: number }[]
}

interface arrProps {
    sequence: number;
    title: string;
}

interface chapterProps2 {
    chapterId: number;
    title: string;
    sequence: number;
}