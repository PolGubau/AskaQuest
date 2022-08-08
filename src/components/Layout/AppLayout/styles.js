import css from "styled-jsx/css";

import { breakpoints, colors, fonts } from "../../../styles/theme";
import { addOpacityToColor } from "../../../styles/utils";

const backgroundColor = addOpacityToColor(colors.primary, 0.2);

export const globalStyles = css.global`
  :root {
  
      --opacity1: ${addOpacityToColor(colors.primary, 0.1)},
    --opacity3: ${addOpacityToColor(colors.primary, 0.3)},
    --opacity5: ${addOpacityToColor(colors.primary, 0.5)},
  }
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 2px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 5px 25px;
    background-size: 50px 50px;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }
  body {
    margin: 30px 60px;


  }
  * {
    box-sizing: border-box;
  }
  textarea,
  input {
    font-family: ${fonts.base};
  }
`;

export default css`
  .settings {
    position: fixed;
    top: 10px;
    right: 10px;
  }
  div {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -moz-box-orient: horizontal;
    -moz-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 100vh;
    width: 100%;
    padding: 20px;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
  }

  main {
    overflow-y: auto;
    padding: 15px;
    background: #fff;
    border-radius: 20px;
    min-height: fit-content;
    min-height: 60vh;
    border: solid 1px ${colors.primary};
    /* box-shadow: 0px 6px 0px -4px ${colors.primary}; */
    width: 100%;
    position: relative;
  }

  //midas de pc
  @media (min-width: ${breakpoints.tablet}) {
    main {
      height: fit-content;
      max-height: 90vh;
      width: ${breakpoints.tablet};
    }
  }
`;
