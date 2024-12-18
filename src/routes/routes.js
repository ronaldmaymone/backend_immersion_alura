import express from "express";
import multer from "multer";
import cors from "cors";
import { createNewPost, fetchAllPosts, updatePost, uploadImg } from "../controllers/posts_controller.js";


const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200, 
  // methods: "GET, POST, PUT, DELETE",
  // allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/api", (req, res) => {
        res.status(200).send("Hello World! This is the API endpoint. To test, visit /api");
    });
    
    app.get("/posts", fetchAllPosts);
    
    // app.get("/posts/:id", (req, res) => {
    //     res.status(200).json(posts[req.params.id - 1]);
    // })

    app.post("/posts", createNewPost);
    app.post("/upload",upload.single("img"), uploadImg);
    app.put("/upload/:id", updatePost)
}

export default routes;

// const posts = [
//     {
//       id: 1,
//       description: "Millie",
//       image: "https://placecats.com/millie/300/150"
//     },
//     {
//       id: 2,
//       description: "Neo",
//       image: "https://placecats.com/neo/300/200"
//     },
//     {
//       id: 3,
//       description: "Millie and Neo",
//       image: "https://placecats.com/millie_neo/300/200"
//     },
//     {
//       id: 4,
//       description: "Neo 2",
//       image: "https://placecats.com/neo_2/300/200"
//     },
//     {
//       id: 5,
//       description: "Neo Banana",
//       image: "https://placecats.com/neo_banana/300/200"
//     }
// ];