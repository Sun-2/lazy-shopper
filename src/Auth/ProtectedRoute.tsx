import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { auth } from "../firebase";
import { loginPath } from "./routing";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Route {...rest}>
      {user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: `/${loginPath}`
          }}
        />
      )}
    </Route>
  );
};
