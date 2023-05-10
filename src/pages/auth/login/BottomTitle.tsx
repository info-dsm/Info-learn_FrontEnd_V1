import React from "react";
import { useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import * as _ from './style'

interface BottomProps {
  LText: string;
  RText: string;
}

const BottomTitle = ({ LText, RText }: BottomProps) => {
  const navigate = useNavigate();
  return (
    <_.BottomBox>
      <_.ExText>{LText}</_.ExText>
      <_.MoveText onClick={() => navigate('/signup')}>
        <p>{RText}</p>
        <_.Icon size={16} fill='FPrimary500' className="ri-arrow-right-s-line"></_.Icon>
      </_.MoveText>
    </_.BottomBox>
  )
}

export default BottomTitle;