import connectToDB  from "../config/db_connection.js";

const dbConnection = await connectToDB().catch(console.dir);
export default async function getAllPosts() {
    const db = dbConnection.db("immersion_instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}