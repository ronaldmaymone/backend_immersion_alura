import getAllPosts from "../models/posts_model.js";

export async function fetchAllPosts(req, res){
    const allPosts = await getAllPosts()
    res.status(200).json(allPosts);
}