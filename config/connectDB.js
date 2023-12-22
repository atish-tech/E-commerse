const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb://127.0.0.1/Papa-Pets'
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Data Base Connected");
    } catch (error) {
        console.log("Data Base connection faild");
        console.log(error);
    }
}
module.exports = connectDB;