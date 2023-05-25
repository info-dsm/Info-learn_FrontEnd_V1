import {createGlobalStyle} from "styled-components";
import {Colors} from "./theme/color";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
    font-size: 14px;
    font-weight: 400;
    user-select: none;
    ::-webkit-scrollbar {
      width: 6px;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      background: ${Colors["Gray400"]};
      border-radius: 6px;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
  }
  // body {
  //   background-color: ${Colors["White"]};
  // }
`

export default GlobalStyle;