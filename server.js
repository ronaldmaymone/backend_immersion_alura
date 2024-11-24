import express from "express";

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

const app = express();
app.use(express.json());

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
});

app.get("/api", (req, res) => {
    res.status(200).send("Hello World! This is the API endpoint. To test, visit /api");
})

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
})

app.get("/posts/:id", (req, res) => {
    res.status(200).json(posts[req.params.id - 1]);
})