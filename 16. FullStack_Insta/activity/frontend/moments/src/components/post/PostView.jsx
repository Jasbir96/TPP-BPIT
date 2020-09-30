import React, { Component } from 'react';
import { Link,Route } from "react-router-dom";
class PostView extends Component {
    state = {}
    render() {
        return (
            // Header
            <div className="postview">
                <div className="header">
                    {/* feed/post */}
                    <div className="feed">FEED</div>
                    {/* search */}
                    <div className="search">SEARCH</div>
                    {/* add Post */}
                    <div className="create-post__btn">
                        <Link to="/profile/create" >
                            CREATE
                    </Link>
                    </div>
                </div>
                {/* main */}
                <div className="main">
                </div>
                <Route path="/profile/create" exact>
                    <div className="createPost">
                        {/* image selection */}
                        {/* textarea */}
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        {/* submit  */}
                        {/* query backend */}
                    </div>
                </Route>
            </div>
        );
    }
}

export default PostView;