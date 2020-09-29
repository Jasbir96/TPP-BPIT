// import React from 'react';
import React, { Component } from 'react';
import axios from "axios";
class ProFileDetails extends Component {
    // 1. 
    state = {
        src: "",
        email: "",
        handle: "",
        post: "",
        followers: "",
        following: ""
    }
    // 3. 
    componentDidMount() {
        // get additional data
        //  ui => new data => appear
        // setTimeout(() => {
        //     // state update 
        //     this.setState({
        //         name: "Jhon",
        //         src:"data:image/jpeg;base64,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"
        //         ,handle:"abc@gmail.com"
        //     })
        // }, 2000);
        axios.
        get("/api/v1/users/394568e9-54d4-40d6-8d2a-d57f6c0e59a7").then(
            (res) => {
                let { email_id, handle, p_img_url } = res.data.user;
                this.setState({
                    email: email_id,
                    src: p_img_url,
                    handle: handle
                })
            }).then(() => {
                let followerP = axios.get("/api/v1/users/fr/4501f8d9-0b28-4d1f-b661-52ee693006bb")
                return followerP;
            }).then((follwoerRes) => {

                let followers = follwoerRes.data.message.filter((follower) => {
                    return follower.is_pending == 0;
                });
                let followerCount = followers.length;
                console.log(followerCount);

                this.setState({
                    followers: followerCount
                })

            })

    }
    // 2.,4 
    render() {
        let { src, email, handle, post, followers, following } 
        = this.state;
        return (
            <div className="profile-details">
                <div className="profile-subpart">
                    <h1>PROFILE</h1>
                    <img src={src} alt="profile-img" />
                    <div className="email">{email}</div>
                    <div className="handle">{handle}</div>
                </div>
                <div className="profile-stats">
                    <div className="div post">
                        <p>{post}</p>
                        <div>POST</div>
                    </div>
                    <div className="div follower">
                        <p>{followers}</p>
                        <div>Follower</div>

                    </div>
                    <div className="div follwing">
                        <p>{following}</p>
                        <div>Following</div>
                    </div>
                </div>
            </div>)

    }
}

export default ProFileDetails;
