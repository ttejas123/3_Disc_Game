import connectMongo from '../../../utils/connectMongo';
import Productschema from '../schema/product'
// read
const ReadProduct = async(req, res) => {
    
    try {
        await connectMongo();

        // add
        const Product = await Productschema.find({});

        // return new product
        res.status(200).json({"Products": Product});
    } catch (e) {
        res.status(202).json({ err: 'Product not Found' });
    }
    
};

export default ReadProduct