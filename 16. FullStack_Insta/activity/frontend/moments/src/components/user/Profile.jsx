import React, { Component } from 'react';
import axios from "axios";
class Profile extends Component {
    // 1. 
    constructor() {
        super();

        state = {
            src: "",
            title: "",
            albumId: ""
        }
    }

    // 3. 
    componentDidMount() {
        
        axios.get("https://jsonplaceholder.typicode.com/photos/1").
            then((res) => {
                let { url, albumId, title } = res.data;
                this.setState({
                    src: url,
                    title: title,
                    albumId: albumId

                })
            }).catch(err => {
                console.log(err);
            })
    }
    // 2. 
    render() {
        let { src, albumId, title } = this.state;
        return (<div className="profile">
            <img src={src} alt="profile-img" />
            <div className="name">{title}</div>
            <div className="handle">{albumId}</div>
        </div>);
    }
}

export default Profile;