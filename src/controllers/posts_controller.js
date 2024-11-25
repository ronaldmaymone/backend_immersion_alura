import fs from "fs";
import {getAllPosts,createPost} from "../models/posts_model.js";

export async function fetchAllPosts(req, res){
    const allPosts = await getAllPosts();
    res.status(200).json(allPosts);
}

export async function createNewPost(req, res){
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(201).json(createdPost);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function uploadImg(req, res){
    const newPost = {
        description: "Uploaded Image from Local Machine",
        img_url: req.file.originalname,
        alt: "Imagem from dog"
    }
    try {
        const createdPost = await createPost(newPost);
        const updatedImg = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, updatedImg);
        res.status(201).json(createdPost);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}