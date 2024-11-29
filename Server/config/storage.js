import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log('DB Successfully Connected')
    } catch (error) {
        console.log('You got error please check that', error)
    }
}

export default connectDB