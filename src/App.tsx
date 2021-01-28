import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { Shop } from "./Shop";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyles />
        <BrowserRouter>
          <Route path={"/"} component={Shop} />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
