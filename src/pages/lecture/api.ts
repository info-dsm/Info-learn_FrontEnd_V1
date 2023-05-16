import axios from "axios";
import toast from "react-hot-toast";
import {AccessToken} from "../Main";

export async function DeleteLecture(lectureId: string) {
    const deleteStatus = toast.loading('강의를 삭제중입니다!');
    await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}`,
        headers: {
            Authorization: `Bearer ${AccessToken}`
        }
    }).then(() => {
        toast.success('강의를 삭제하였습니다!', {
            id: deleteStatus
        });
    });
}

interface putProps {
    titleJson: string;
    inputJson: string | undefined;
    inputFile: File | undefined;
    lectureId: string;
    tagList: { tagId: string }[];
    deleteList: { tagId: string }[];
}

export async function PutLecture({titleJson, inputJson, inputFile, lectureId, tagList, deleteList}: putProps) {
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

    tagList[0] !== undefined && await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}/tag`,
        data: tagList,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    })

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
        console.log('파일 사이즈 : ' + file?.size);
        await axios({
            method: 'PUT',
            url: url,
            data: file,
            headers: {
                "Content-Type": file.type,
                "Content-Disposition": "inline"
            }
        }).then(() => {
            console.log('Thumbnail success');
        })
    }

    deleteList[0] !== undefined && await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture/${lectureId}/tag`,
        data: deleteList,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    })

    toast.success('강의가 수정되었습니다!', {
        id: editStatus,
    });
}

export async function PostLecture({postJson, inputFile}: { postJson: string, inputFile: File | undefined }) {
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
        else toast.error(error.response?.data?.message, {id: upLoadStatus});
    })
    return postRes?.data

    async function PutS3({url, file}: { url: string, file: File | undefined }) {
        console.log('파일 사이즈 : ' + file?.size);
        await axios({
            method: 'PUT',
            url: url,
            data: file,
            headers: {
                "Content-Type": file?.type,
                "Content-Disposition": "inline"
            }
        }).then(() => {
            toast.success('강의가 등록되었습니다!', {
                id: upLoadStatus,
            });
        })
    }
}