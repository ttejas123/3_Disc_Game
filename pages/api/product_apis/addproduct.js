import connectMongo from '../../../utils/connectMongo';
import Productschema from '../schema/product'
// Login
const Login = async(req, res) => {
    const Name = req.body.Name;
    const Price = req.body.Price;

    try {
        await connectMongo();

        // add
        const Product = await Productschema.create({ Name: Name, Price: Price });

        // return new product
        res.status(200).json({"Product": Product});
    } catch (e) {
        res.status(202).json({ err: 'Product Not Added' });
    }
    
};

export default Login