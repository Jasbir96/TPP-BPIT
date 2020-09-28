import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from './components/Profile';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import NavBar from "./components/NavBar";
function App() {
  return (
    <React.Fragment>
      <h2>Hello Routing</h2>
      <NavBar></NavBar>
      <Switch>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Redirect from="/myroute" to="/home" exact>
        </Redirect>
        {/* it will always go to this route  */}
        <Route>
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment>

  );
}

export default App;
