import connectMongo from '../../../utils/connectMongo';
import Orderschema from '../schema/orders'
// Login
const addtoOrder = async(req, res) => {
    const mail = req.body.mail;
    try {
        await connectMongo();

        // add
        const Order = await Orderschema.find({ mail: mail });

        // return new order
        res.status(200).json({"Orders": Order});
    } catch (e) {
        res.status(202).json({ err: 'Order Not Found' });
    }
    
};

export default addtoOrder