import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb+srv://Tejasdb:eNGrSQ83u6rAjxaE@userdb.0jb7umc.mongodb.net/meta", { useNewUrlParser: true, useUnifiedTopology: true});

export default connectMongo;