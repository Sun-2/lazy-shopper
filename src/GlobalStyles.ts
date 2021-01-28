import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    
  }

  html, body, #root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
  }
`;
