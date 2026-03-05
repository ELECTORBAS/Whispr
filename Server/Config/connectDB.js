import mongoose from "mongoose";

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        if(mongoose.connection.on){
            console.log('Database connected');
        }
    } catch (e) {
        console.log(e);
    }
}

export default connectDB;