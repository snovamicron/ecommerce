const mongoose = require('mongoose')
const URI = process.env.MONGOOSE_URI
const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI)
        console.log('database connected successfully');
    } catch (error) {
        console.log('getting error while connecting to database')
        console.dir(error)
    }
}

module.exports = connectToDatabase