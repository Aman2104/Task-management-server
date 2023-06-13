const mongoose = require("mongoose")
require('dotenv').config();
const MongoConnection = async () => {

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
    });
}

module.exports = MongoConnection