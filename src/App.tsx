import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { Shop } from "./Shop";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Route path={"/"} component={Shop} />
      </BrowserRouter>
    </>
  );
}

export default App;
