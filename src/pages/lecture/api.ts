import axios from "axios";
import toast from "react-hot-toast";

const AccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJURUFDSEVSIiwianRpIjoibmlnZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjgzMDAxNjk1LCJleHAiOjE2ODMwODgwOTV9.iVl9l0qj52fsF99v3tmTfc0I2dNkYlb3yYAivNMwiKM";

export async function PostLecture({inputFile}: { inputFile: File }) {
    console.log("filename = " + inputFile?.name);
    await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/infolearn/v1/lecture`,
        data: {
            title: "원준이와 함께 하고픈 일",
            explanation: "원준이 맥북 해킹으로 먹고 싶농 히히",
            searchTitle: "dnjswnsdldhk gkaRp gkrhvms dlf",
            searchExplanation: "dnjswnsdl aorqnr gozlddmfh ajrrh tlvshd glgl",
            tagNameList: [
                "현석조",
                "난 원준이가 좋아."
            ],
            lectureThumbnail: {
                fileName: inputFile?.name,
                contentType: "image/png"
            }
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AccessToken}`
        }
    }).then(response => {
        PutS3({url: response.data.preSignedUrl.url, file: inputFile});
    }).catch(error => {
        if(error.response === undefined) toast.error("인터넷 연결 상태를 확인해 주세요")
        else toast.error(`${error.response?.data?.data}는` + error.response?.data?.message);
    })
    console.log('post 함수에 들어왔농!')
}

export async function PutS3({url, file}: { url: string, file?: File }) {
    await axios({
        method: 'PUT',
        url: url,
        data: file,
        headers: {
            "Content-Type": "image/png",
            "Content-Disposition": "inline"
        }
    })
}