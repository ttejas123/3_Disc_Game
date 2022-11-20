import { Schema, model, models } from 'mongoose';

const ProductDataSchema = new Schema({
	Name:{
		type:String,
	    required: true
	},
	Price:{
		type:Number,
	    required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});


const Product = models.Product || model("Product", ProductDataSchema)
export default Product
