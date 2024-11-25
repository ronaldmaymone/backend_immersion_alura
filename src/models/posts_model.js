import 'dotenv/config';
import { ObjectId } from "mongodb";
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

export async function updateSinglePost(id, updatedPost) {
    const db = dbConnection.db("immersion_instabytes");
    const collection = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objectId)}, {$set: updatedPost});
}