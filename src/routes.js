import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";

import Authentication from "./Services/Authentication";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/v1/login">
          {Authentication.isLoggedIn() ? <Redirect to="/v1" /> : <Login />}
        </Route>
        <Route exact path="/v1/register">
          {Authentication.isLoggedIn() ? <Redirect to="/v1" /> : <Register />}
        </Route>
        <Route exact path="/v1">
          {Authentication.isLoggedIn() ? <Home /> : <Redirect to="/v1/login" />}
        </Route>
        <Route exact path="/">
          <Redirect to="/v1" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
