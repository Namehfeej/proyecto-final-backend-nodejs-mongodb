import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        
        const mondoDb = await mongoose.connect(process.env.DB_BASE_URL);
        console.log("Db is connected", mondoDb.connections[0].name);
    } catch (error) {
        console.error("Error to connect to DB");
        throw Error(error);
    }   
}