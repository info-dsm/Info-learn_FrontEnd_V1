import React from "react";
import styled from "styled-components";

/*async function getVDetail(state: string) {
    if (state) {
        const VideoRes = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/video/${state}`,
            headers: {
                Authorization: `Bearer ${AccessToken}`,
                'ngrok-skip-browser-warning': '69420'
            }
        })
        return VideoRes.data
    }
}*/

const DetailVideo = () => {
    const [chapter, setChapter] = useState<chapterProps[]>();
    const {data: detail, remove, refetch} = useQuery(['nigrongrongrong'], () => getLDetail(state.get('lectureId') ?? ''));
    const {data: videoData, remove: removeVideo, refetch: reFetchVideo} = useQuery(['nigrongrongrongrong'], () => getVDetail(Number(state.get('videoId') ?? 0)));
    const [state] = useSearchParams();
    // const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoData?.videoUrl) {
            console.log('video불러오고 ref됨')
        }
    }, [videoData])

    useEffect(() => {
        if (detail) {
            if (detail.lectureId !== state.get('lectureId')) {
                remove()
                refetch()
            }
            if (detail.chapters) {
                const cChapter = detail.chapters;
                cChapter.sort((a: chapterProps, b: chapterProps) => a.sequence - b.sequence);
                setChapter(cChapter);
            }
        }
        if (videoData) {
            if (detail && detail.lectureId !== state.get('lectureId')) {
                remove()
                refetch()
            }
            removeVideo()
            reFetchVideo()
        }
    }, [detail, state]);

    return (
        <Container>
            <VideoBox>
                <Video/>
            </VideoBox>
            <ListBox>

            </ListBox>
        </Container>
    )
}

export default DetailVideo;

const TimeBar = styled.div`

`
const CDiv = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: fit-content;
  aspect-ratio: 16 / 9;
  position: relative;
`
const CustomVDiv = styled.div`
  width: 100%;
  height: 60px;
  background-color: silver;
  position: absolute;
  bottom: 0;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1080px) {
    flex-direction: column;
    div {
      width: 100%;
      overflow: hidden;
    }

    .vd {
      padding: 0;
      width: 94%;
    }

    .lt {
      padding: 40px 0;
      width: 94%;
    }

    height: fit-content;
    padding: 40px 0 120px;
  }

`

const VideoBox = styled.div`
  width: 59.8%;
  display: flex;
  justify-content: center;
  padding: 40px;
`

const ListBox = styled.div`
  width: 40.2%;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 40px;
`

const Video = styled.video.attrs({
    controls: true
})`
  background-color: black;
  width: 100%;
  height: 100%;
`

/*
const TitleGap = styled.div`
  display: flex;
  gap: 10px;
`*/
