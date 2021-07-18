import React from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({component, path, exac}) {
  const { user } = React.useContext(AuthContext);
  console.log(component)

  return user?.uid ? <Route component={component} path={path} exact={exac}/> : <Redirect to="/react_chat-app/login"  />;
}
