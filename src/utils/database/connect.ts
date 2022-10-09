const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connect = (mongoUri: string) => {
  mongoose.connect(mongoUri, mongoOptions, (err: Error | null) => {
    if (!err) {
      console.log('MongoDB connection succeeded.');
    } else {
      console.log(
        'Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

export default connect;
