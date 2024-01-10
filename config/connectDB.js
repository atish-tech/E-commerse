const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://aatish:hy2KXlK4qrVtbdIG@realtimechatappdb.5xmnrv8.mongodb.net'
        await mongoose.connect(`${uri}/E-Commerse`);
        console.log("Data Base Connected");
    } catch (error) {
        console.log("Data Base connection faild");
        console.log(error);
    }
}
module.exports = connectDB;