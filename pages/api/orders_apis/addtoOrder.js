import connectMongo from '../../../utils/connectMongo';
import Orderschema from '../schema/orders'
// Login
const addtoOrder = async(req, res) => {
    // console.log(req.body)
    const mail = req.body.mail;
    const status = req.body.status;
    const ordered_products = req.body.ordered_products;
    
    try {
        await connectMongo();

        // add
        const Order = await Orderschema.create({ mail: mail, status: status, ordered_products: ordered_products });

        // return new product
        res.status(200).json({"Product": Order});
    } catch (e) {
        res.status(202).json({ err: 'Product Not Added' });
    }
    
};

export default addtoOrder