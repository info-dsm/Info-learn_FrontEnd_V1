import axios from "axios";
import toast from "react-hot-toast";
import {AccessToken} from "../Main";

export async function PutLecture({titleJson, inputJson, inputFile, lectureId, tagList}: { titleJson: string, inputJson: string | undefined, inputFile: File | undefined, lectureId: string, tagList: string[] }) {
    const editStatus = toast.loading('강의를 수정중입니다!');
    await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}`,
        data: titleJson,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    }).then(() => {
        console.log('title success');
    })

    tagList.map(async (tag, index) =>
        await axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}/tag`,
            params: {
                tag: tag
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AccessToken}`
            }
        }).then(() => {
            console.log(index + 'tag success');
        })
    );

    inputJson && inputFile && await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}/thumbnail`,
        data: inputJson,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    }).then(response => {
        putS3({url: response.data.url, file: inputFile});
    });

    async function putS3({url, file}: { url: string, file: File }) {
        await axios({
            method: 'PUT',
            url: url,
            data: file,
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": "inline"
            }
        }).then(() => {
            console.log('Thumbnail success');
        })
    }

    toast.success('강의가 수정되었습니다!', {
        id: editStatus,
    });
}

export async function PostLecture({postJson, inputFile}: { postJson: string, inputFile: File }) {
    const upLoadStatus = toast.loading('강의를 등록중입니다!');
    console.log("filename = " + inputFile?.name);
    const postRes = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture`,
        data: postJson,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    }).then(response => {
        PutS3({url: response.data.preSignedUrl.url, file: inputFile});
        return response
    }).catch(error => {
        if (error.response === undefined) toast.error("인터넷 연결 상태를 확인해 주세요", {id: upLoadStatus});
        else toast.error(`${error.response?.data?.data}는` + error.response?.data?.message, {id: upLoadStatus});
    })
    return postRes?.data

    async function PutS3({url, file}: { url: string, file?: File }) {
        await axios({
            method: 'PUT',
            url: url,
            data: file,
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": "inline"
            }
        }).then(() => {
            toast.success('강의가 등록되었습니다!', {
                id: upLoadStatus,
            });
        })
    }
}