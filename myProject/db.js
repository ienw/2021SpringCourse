import mongoose from 'mongoose';
import dotenv from 'dotenv';

(async () => {
  dotenv.config()

  try {
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('DB connected successfully');
  } catch (err) {
    console.error('Connection to db failed', err);
  }
})();

export default mongoose.connection;
