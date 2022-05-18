const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
  };

const connect = (mongoUri: string) => {
    const db = mongoose.createConnection(mongoUri, mongoOptions);
    db.on('open', () => {
        console.log(`Mongoose connection open`);
      });
      db.on('error', (err:any) => {
        console.log(`Mongoose connection error: ${err}`);
        process.exit(0);
      });
}

export default connect