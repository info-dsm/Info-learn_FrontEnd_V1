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
    user-select: none
  }

  body {
    background-color: ${Colors["Gray100"]};
  }
`

export default GlobalStyle;