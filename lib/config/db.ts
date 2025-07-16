import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.mailstw.mongodb.net/swadiamonds-blog');
    console.log("DB Connected");
}

