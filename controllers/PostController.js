const Post = require('../models/post');
class PostController{

    async create(req, res){
        try {
            const payload = {
                ...req.body,
                image: req.file && req.file.path,
                creator: req.user && req.user.user_id
            };
            const post = await Post.create(payload);
            console.log(post)
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    } 

    update(req, res){

    }

    async delete(req, res){
        try {
            const post = await Post.findById(req.params.id);
            if(req.user.user_id !== post.createdBy){
                return res.status(401).json({message: 'Post cannot be deleted.'})
            }

            await post.delete();

            res.status(204).json({});
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

    async view(req, res){
        try {
            const posts = await Post.findById(req.params.id);
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

    async list(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

    async getPostsByUser(req, res){
        try {
            const posts = await Post.find({creator: req.params.user_id},{likes: false}).populate('creator', 'email firstname lastname').populate('category', 'title').sort({'createdAt': -1});
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({message: 'Something went wrong.'})
        }
    }

}

module.exports = PostController;