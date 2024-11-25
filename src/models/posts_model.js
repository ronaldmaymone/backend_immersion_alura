import connectToDB  from "../config/db_connection.js";

const dbConnection = await connectToDB().catch(console.dir);
export async function getAllPosts() {
    const db = dbConnection.db("immersion_instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = dbConnection.db("immersion_instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}