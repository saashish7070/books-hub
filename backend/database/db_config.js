const mongoose = require('mongoose');

// console.log('Hello')
// Connect to the MongoDB database 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });