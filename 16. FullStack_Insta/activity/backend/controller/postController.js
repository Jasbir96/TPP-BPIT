const postDB = require("../model/post.json");
const postModel=require("../model/postModel");
async function createPost(req, res) {
    try {
        let nPost = await postModel.create(req.body);
        res.status(201).json({
            success: "successfull",
            post: nPost
        })
    } catch (err) {
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}
function getPost(req, res) {
    let { post_id } = req.params;
    let post;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].post_id == post_id) {
            post = postDB[i];
        }
    }
    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }

    res.status(200).json({
        status: "success",
        post: post
    })
}
function updatePost(req, res) {
    let { post_id } = req.params;
    // {post_id:12345}
    let post;
    let toUpdate = req.body;
    for (let i = 0; i < postDB.length; i++) {
        if (postDB[i].post_id == post_id) {
            post = postDB[i];
        }
    }

    if (post == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    // update
    for (let key in toUpdate) {
        post[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));
    // update 
    res.status(200).json({
        status: "success",
        "message": "message"
    })

}
function deletePost(req, res) {
    let { post_id } = req.params;
    // {post_id:12345}
    let initialpostL = postDB.length;
    postDB = postDB.filter(function (post) {
        return post.post_id != post_id;
    })
    if (initialpostL == postDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "post not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "post.json"), JSON.stringify(postDB));

    res.status(200).json({
        status: "success",
        "message": "post deleted"
    })
}
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.getPost = getPost;