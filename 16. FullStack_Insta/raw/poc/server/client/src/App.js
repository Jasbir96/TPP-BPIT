import React, { useEffect, useState } from 'react';
import { Link, Switch, Route, Redirect, } from "react-router-dom";
import axios from "axios";
function App() {
  let [isAuth, setAuth] = useState(false);
  const handleAuth = () => {
    // setAuth(!isAuth);
    window.location = "/auth/google";
  }
  // useEffect=> componentDidMOunt
  useEffect(() => {
    {
      axios.get("/user").then(
        (res) => {
          let { data } = res;
          if (data.status&&data.status == "success") {
            setAuth(true);
            console.log(data.user);
          }else{
            console.log("Please Login")
          }
        }
      )
    }
  })
  return (
    <div className="App">
      <h1>Hello Oauth</h1>
      <Link to="/home">Home</Link>
      <Link to="/setting">Setting</Link>
      <Switch>
        <Route path="/" exact>
          <LoginPage handleAuth={handleAuth} isAuth={isAuth}></LoginPage>
        </Route>
        {/* isAuth=> true */}
        {/* home page */}
        <Route path="/home" render={(props) => {
          return (
            isAuth == true ?
              <Home {...props}></Home> :
              <Redirect to="/"></Redirect>
          )
        }}>
        </Route>
        {/* settings Page */}
        <Route path="/setting" render={(props) => {
          return (
            isAuth == true ?
              <Setting {...props}></Setting> :
              <Redirect to="/" ></Redirect>
          )
        }}></Route>
      </Switch>
    </div >
  );
}
function LoginPage(props) {
  let { isAuth, handleAuth } = props;
  return (
    <React.Fragment>
      {/* <a href="/auth/google">Sign In</a> */}
      <button onClick={handleAuth} >
        {isAuth == true ? <span>Logout</span> :
          <span>Login</span>}</button>
    </React.Fragment>)
}
function Home() {
  return <h1>Home Page</h1>
}
function Setting() {
  return <h1>Setting Page</h1>
}
export default App;
