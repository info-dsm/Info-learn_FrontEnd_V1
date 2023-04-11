import React from "react";
import * as _ from './style'

interface ImageProps {
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  ImgString: string | ArrayBuffer | null;
  setImgString: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>

}

const ImageView = ({ setImg, ImgString, setImgString }: ImageProps) => {
  const Reading = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    const selectedFile = (e.target.files as FileList)[0];
    if (selectedFile !== null) {
      fileReader.readAsDataURL(selectedFile);
      setImg(selectedFile);
    }

    fileReader.onload = () => {
      setImgString(fileReader.result);
    };
  }

  return (
    <_.ImageOutBox img={ImgString as string}>
      <_.ImageBlur />
      <_.IamgeInput onChange={(e) => Reading(e)} />
      <_.ImageSelectBox img={ImgString as string} >
        {ImgString === null && <_.Icon className="ri-add-line" />}
      </_.ImageSelectBox>
    </_.ImageOutBox>
  )
}

export default ImageView;