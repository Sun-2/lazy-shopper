import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { Shop } from "./Shop";
import { store } from "./redux/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { LoginView } from "./Auth/LoginView";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import { loginPath } from "./Auth/routing";
import { MuiThemeProvider } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>Loading</div>;

  return (
    <>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyles />
            <BrowserRouter>
              <Switch>
                <Route path={`/${loginPath}`} component={LoginView} />
                <ProtectedRoute path="/" component={Shop} />
              </Switch>
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
