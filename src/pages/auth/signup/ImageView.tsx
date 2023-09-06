import React, { useState } from "react";
import { toast } from "react-hot-toast";
import * as _ from './style'

interface ImageProps {
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  ImgString: string | ArrayBuffer | null;
  setImgString: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  post: React.Dispatch<React.SetStateAction<[number, number, boolean] | undefined>>;
}

const ImageView = ({ setImg, ImgString, setImgString, post }: ImageProps) => {
  const [DropReady, setReady] = useState<boolean>(false);

  const Reading = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = (e.target.files as FileList)[0];
    upload(selectedFile);
  }

  const DropImg = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = (e.dataTransfer.files as FileList)[0];
    setReady(false);
    upload(selectedFile);
  }

  const upload = (selectedFile: File) => {
    const fileReader = new FileReader();

    if (selectedFile !== null) {
      if(selectedFile.name.match(/^.*\.(jpg|jpeg|png|heic|webp)$/)) {
        fileReader.readAsDataURL(selectedFile);
        setImg(selectedFile);
      } else {
        toast.error('사용할 수 있는 파일이 아닙니다');
      }
    }

    fileReader.onload = () => {
      setImgString(fileReader.result);
    };
  }

  interface EventProps {
    e: React.DragEvent<HTMLDivElement>;
    bool: boolean;
  }

  const Ready = ({ e, bool }: EventProps) => {
    e.preventDefault();
    setReady(bool)
  }

  return (
    <_.ImageOutBox
      onDragOver={(e) => e.preventDefault()}
      onDrop={DropImg}
      onDragEnter={(e) => Ready({ e, bool: true })}
      onMouseMove={(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => post && post([e.clientX, e.clientY, true])}
      onMouseLeave={() => post && post((v) => {if(v) return [v[0], v[1], false]})}
      img={ImgString as string}
    >
      <_.ImageBlur />
      {
        DropReady &&
        <_.ForwardBox
          onDragLeave={(e) => Ready({ e, bool: false })}>
          <_.Icon className="ri-add-line" />
        </_.ForwardBox>
      }
      <_.IamgeInput onChange={(e) => Reading(e)} />
      <_.ImageSelectBox img={ImgString as string} >
        {ImgString === null && <_.Icon className="ri-add-line" />}
      </_.ImageSelectBox>
    </_.ImageOutBox>
  )
}

export default ImageView;