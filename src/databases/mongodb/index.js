const mongoose = require('mongoose');

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASS;

const mongoUrl = 'mongodb+srv://mongoadmin:mongoadmin@cluster0.x7mbh.mongodb.net/chat_app?retryWrites=true&w=majority';

module.exports = {
    
    async connect(){
        try {
            await mongoose.connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            console.log("Connected to MongoDB");
        } catch (e){
            console.error("Authentication failed for MongoDB");
        }
    }

}
