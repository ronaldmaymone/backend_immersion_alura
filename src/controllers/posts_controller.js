import fs from "fs";
import {getAllPosts,createPost,updateSinglePost} from "../models/posts_model.js";
import generateDescription from "../services/gemini_service.js";

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

export async function updatePost(req, res){
    const id = req.params.id;
    const url = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescription(imgBuffer);

        const postToUpdate = {
            img_url: url,
            description: description,
            alt: req.body.alt
        }

        const updatedPost = await updateSinglePost(id, postToUpdate);
        res.status(200).json(updatedPost);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}