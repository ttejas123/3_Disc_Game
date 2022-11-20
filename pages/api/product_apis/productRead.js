import connectMongo from '../../../utils/connectMongo';
import Productschema from '../schema/product'
// Login
const addtoOrder = async(req, res) => {
    
    try {
        await connectMongo();

        // add
        const Product = await Productschema.find({});

        // return new product
        res.status(200).json({"Products": Product});
    } catch (e) {
        res.status(202).json({ err: 'Order Not Found' });
    }
    
};

export default addtoOrder