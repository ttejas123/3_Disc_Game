import connectMongo from '../../../utils/connectMongo';
import Orderschema from '../schema/orders'
// Login
const addtoOrder = async(req, res) => {
    // console.log(req.body)
    const id = req.body.id;
    // const mail = req.body.mail;
    const status = req.body.status
    
    try {
        await connectMongo();

        // add
        const Order = await Orderschema.updateOne({ _id: id}, {
            $set: {
                status: status
            }
        });

        // return new product
        res.status(200).json({"Product": Order});
    } catch (e) {
        res.status(202).json({ err: 'Product Not Added' });
    }
    
};

export default addtoOrder