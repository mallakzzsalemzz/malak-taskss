const express = require('express') ,
      router  = express.Router(),
      PostController = require('../app/controllers/post.controller'),
      Post = require('../app/models/post')

// Search posts
router.get('/posts/search', async (req, res) => {
    try {
        const query = {};
        
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' }; 
        }
        
        if (req.query.desc) {
            query.desc = { $regex: req.query.desc, $options: 'i' }; 
        }
        
        const posts = await Post.find(query);
        
        res.status(200).json({
            method: "GET",
            totalResults: posts.length,
            url: "http://localhost:5000/api/v1/posts/search",
            query: req.query,
            data: posts
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get('/posts' , PostController.index);

// Add New Post
router.post('/posts' , async (req , res) => {
    const post = new Post({
        title : req.body.title , 
        desc : req.body.desc
    });
    try {
        const savedPost = await post.save();
        res.status(201).json({
            method : "POST" , 
            url : "http://localhost:5000/api/v1/posts" , 
            post : savedPost
        })
    }
    catch(err) {
        res.status(500).json({
            message : err
        })
    }
})


// Show Single Post
router.get('/posts/:id' , getPost ,  async(req , res ) => {
   const id = req.params.id 
   res.json({
    method : "GET" , 
    url : `http://localhost:5000/api/v1/posts/${id}` , 
    data : res.post
   })
})


router.patch("/posts/:id" , getPost , async(req , res) => {
    const id = req.params.id
    if(req.body.title != null) {
        res.post.title = req.body.title
    }
    if(req.body.desc != null) {
        res.post.desc = req.body.desc
    }
    try {
       const updatedPost =  await res.post.save()
       res.json({
        method : "PATCH" , 
        url : `http://localhost:5000/api/v1/posts/${id}` , 
        data : updatedPost
       })
    }
    catch(err) {
        res.status(500).json({
            message : err
        })
    }
})


router.put('/posts/:id' , getPost , 
    async(req , res , next) => {
        const id = req.params.id
        if(req.body.title != null &&
             req.body.desc != null) {
            res.post.title = req.body.title
            res.post.desc = req.body.desc
        }
        try {
           const updatedPost =  await res.post.save()
           res.json({
            method : "PUT" , 
            url : `http://localhost:5000/api/v1/posts/${id}` , 
            data : updatedPost
           })
        }
        catch(err) {
            res.status(500).json({
                message : err
            })
        }
})


router.delete('/posts/:id' , async(req , res , next) => {
    try {
        await Post.deleteOne(res.post)
        res.status(200).json({message : "Post Deleted Successfully"})
    }catch(err) {
        res.status(500).json({
            message : err
        })
    } 
})


async function getPost(req , res , next) {
    let post
    try {
        post = await Post.findById(req.params.id)
    }
    catch(err) {
        res.status(500).json({
            message : err
        })
    }
    res.post = post
    next()
}

module.exports = router;