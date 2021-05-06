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
        <Route exact path="/login">
          {Authentication.isLoggedIn() ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {Authentication.isLoggedIn() ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/">
          {Authentication.isLoggedIn() ? <Home /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
