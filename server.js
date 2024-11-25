import express from "express";
import routes from "./src/routes/routes.js";

const app = express();
//this servers static files from the uploads folder, making them accessible to the client-side
app.use(express.static("uploads"));
routes(app);
app.listen(3000,()=> {
    console.log("Server is running on port 3000");
});
