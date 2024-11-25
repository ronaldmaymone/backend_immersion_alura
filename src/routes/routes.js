import express from "express";
import { createNewPost, fetchAllPosts } from "../controllers/posts_controller.js";

const posts = [
    {
      id: 1,
      description: "Millie",
      image: "https://placecats.com/millie/300/150"
    },
    {
      id: 2,
      description: "Neo",
      image: "https://placecats.com/neo/300/200"
    },
    {
      id: 3,
      description: "Millie and Neo",
      image: "https://placecats.com/millie_neo/300/200"
    },
    {
      id: 4,
      description: "Neo 2",
      image: "https://placecats.com/neo_2/300/200"
    },
    {
      id: 5,
      description: "Neo Banana",
      image: "https://placecats.com/neo_banana/300/200"
    }
];

const routes = (app) => {
    app.use(express.json());
    app.get("/api", (req, res) => {
        res.status(200).send("Hello World! This is the API endpoint. To test, visit /api");
    })
    
    app.get("/posts", fetchAllPosts)
    
    app.get("/posts/:id", (req, res) => {
        res.status(200).json(posts[req.params.id - 1]);
    })

    app.post("/posts", createNewPost)
}

export default routes;