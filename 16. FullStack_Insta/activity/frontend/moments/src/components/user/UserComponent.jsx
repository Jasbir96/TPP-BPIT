import React, { Component } from 'react';
import Profile from "./Profile";
class UserComponent extends Component {
    state = {}
    render() {
        return (<React.Fragment>
            <Profile></Profile>
        </React.Fragment>);
    }
}

export default UserComponent;