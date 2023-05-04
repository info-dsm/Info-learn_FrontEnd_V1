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
    }
    ::-webkit-scrollbar-thumb {
      background: ${Colors["SPrimary500"]};
      border-radius: 6px;
    }
    ::-webkit-scrollbar-track {
      background: none;
    }
  }
  body {
    background-color: ${Colors["White"]};
  }
`

export default GlobalStyle;