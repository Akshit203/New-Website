const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongodb database');
    } catch (error) {
        console.log(`Mongo DB connection error ${error}`.red);
    }
}

module.exports = connectDB