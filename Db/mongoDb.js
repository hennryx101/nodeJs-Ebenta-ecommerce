const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;