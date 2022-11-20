import { Schema, model, models } from 'mongoose';
// import Order_product from './ordered_products';

const OrderproductDataSchema = new Schema({
	Product_Id:{
		type:String,
	    required: true
	},
	quantity:{
		type:Number,
	    required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const OrdersDataSchema = new Schema({
	mail:{
		type:String,
	    required: true
	},
	status:{
		type:String,
	    required: true
	},
    ordered_products:[OrderproductDataSchema],
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});


const Orders = models.Orders || model("Orders", OrdersDataSchema)
export default Orders
