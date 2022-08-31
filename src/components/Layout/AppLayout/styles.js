import css from 'styled-jsx/css'

export default css`
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
    width: 100%;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
  }

  main {
    overflow-y: auto;
    padding: 15px;
    background: #fff;
    border-radius: 20px;
    height: 100%;
    min-height: 60vh;
    border: solid 1px var(--primary);
    box-shadow: 0px 0px 20px -10px var(--black);
    width: 100%;
    position: relative;
  }

  // PC
  @media (min-width: 1000px) {
    body {
      margin: 30px 60px;
    }
    main {
      height: fit-content;
      min-height: 60vh;
      max-height: 80vh;
      width: 1000px;
    }
  }
 
`
