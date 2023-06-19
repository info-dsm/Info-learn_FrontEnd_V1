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
    video_id: number;
    title: string;
    hour: number;
    minute: number;
    second: number;
    sequence: number;
    status: string;
    video_url: string;
}

interface chapterProps {
    title: string,
    sequence: number,
    videos: { video_id: number, title: string, play_time: number, sequence: number }[]
}

interface arrProps {
    sequence: number;
    title: string;
}

interface chapterProps2 {
    chapter_id: number;
    title: string;
    sequence: number;
}