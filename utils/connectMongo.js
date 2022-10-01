import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb://localhost:27017/meta", { useNewUrlParser: true, useUnifiedTopology: true});

export default connectMongo;