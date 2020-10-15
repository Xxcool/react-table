import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route
            path="/"
            render={() => {
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;
