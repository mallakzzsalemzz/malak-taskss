const Post = require('../models/post')

async function index(req , res) {
    const posts = await Post.find({})
   // res.json(posts)
    try {
        res.status(200).json({
            method : "GET" , 
            totalResult : posts.length , 
            url : "http://localhost:5000/api/v1/posts" , 
            data : posts
        })
    }catch(err) {
        res.status(500).json({
            message : err
        })
    }
}

function show(req , res) {}


function store(req , res) {}

function update(req , res) {}


function destroy(req , res) {}


module.exports = {
    index , 
    show , 
    store , 
    update , 
    destroy
}