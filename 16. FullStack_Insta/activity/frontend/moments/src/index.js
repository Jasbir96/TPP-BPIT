import ReactDOM from 'react-dom';
import ProFileDetails from "./components/user/ProfileDetails";
import Settings from "./components/SettingsPage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";
import PostView from "./components/post/PostView";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './index.css';
// import App from './App';
import React, { Component } from 'react';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
  // functional component
  function ProfileMenu(props) {
    let { changeMenu } = props;
    return (
      <div className="profile-menu">

        <div className="suggestion" onClick={() => {
          changeMenu("suggestion")
        }}>suggestion</div>
        <div className="request" onClick={() => {
          changeMenu("request")
        }}> request</div>
        <div className="follower" onClick={() => {
          changeMenu("followers")
        }}>follower</div>
      </div>
    )
  }


function Profile(props) {
  return (
    <div className="profile">
      {/* function */}
      <ProFileDetails  ></ProFileDetails>
      {/* data */}
      <ProfileMenu changeMenu={props.changeMenu}></ProfileMenu>
    </div>)
}
// current
class UserView extends Component {
  state = {
    cMenu: "suggestion",
    list: []
  }
  changeMenu = async (nMenu) => {
    console.log(nMenu);
    //  get followers of current user 
    // state 
    //  request => get followers_id
    let obj = await axios.get("/api/v1/users/fr/4501f8d9-0b28-4d1f-b661-52ee693006bb");
    let uFollArr = [];
    if (nMenu == "followers") {
      // console.log(uFollArr);
      uFollArr = obj.data.message.
        filter((follower) => { return follower.is_pending == 0 });

    } else if (nMenu == "request") {

      uFollArr = obj.data.message
        .filter(follower => follower.is_pending == 1);
    }
    this.setState({
      cMenu: nMenu,
      list: uFollArr
    })
    // follower_id => user => details
  }
  render() {
    return (<div className="userView">
      <Profile changeMenu={this.changeMenu}></Profile>
      <MenuList list={this.state.list}></MenuList>
    </div>)
  }
}

function MenuList(props) {
  // req => class based 
  let { list } = props;
  return (<div className="menu-list">{
    list.map((follower) => {
      return (<div >
        <img src={follower.p_img_url} alt="profile-img"></img>
        <div> {follower.email_id}</div>
        <div>{follower.handle}</div>
      </div>)
    })
  }</div>)
}
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/profile" >
          <div className="app">
            <UserView></UserView>
            <PostView></PostView>
          </div>
        </Route>
        <Route path="/" exact>
          <LoginPage></LoginPage>
        </Route>
        <Redirect path="/login" exact>
        </Redirect>
        <Route path="/setting" exact>
          <Settings></Settings>
        </Route>
        <Route>
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment >
  );
}
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
