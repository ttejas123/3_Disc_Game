import { Schema, model, models } from 'mongoose';

const userDataSchema = new Schema({
	pubkey:{
		type:String,
	    required: true
	},
	signature:{
		type:String,
	    required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	},
    access_token: { 
		type: String 
	},
	refresh_token: { 
		type: String 
	}
});


const User = models.user || model("user", userDataSchema)
export default User
