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

const Container = styled.div`
  display: flex;
  width: 100%;
  min-width: 500px;
`

const VideoBox = styled.div`
  width: 59.8%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListBox = styled.div`
  width: 40.2%;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 40px;
`

const Video = styled.video`
  width: calc(100% - 80px);
  height: 1%;
  min-width: 200px;
  aspect-ratio: 16 / 9;
`

/*
const TitleGap = styled.div`
  display: flex;
  gap: 10px;
`*/
