import { Schema, model, models } from 'mongoose';

const PostDataSchema = new Schema({
	mail:{
		type:String,
	    required: true
	},
	msgTouser:{
		type:String,
	    required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});


const Post = models.post || model("post", PostDataSchema)
export default Post
