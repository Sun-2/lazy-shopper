import React, { FC} from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "normalize.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { createGlobalStyle } from "styled-components";
import { CssBaseline } from "@material-ui/core";

const Main: FC = () => {
  const dndBackend = matchMedia("(any-hover: hover)").matches
    ? HTML5Backend
    : TouchBackend;

  return (
    <DndProvider backend={dndBackend}>
      <App />
    </DndProvider>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    position: relative;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalStyles />
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
