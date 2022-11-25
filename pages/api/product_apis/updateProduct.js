import connectMongo from '../../../utils/connectMongo';
import Productschema from '../schema/product'
// Delete
const UpdateProduct = async(req, res) => {
  
    try {
        await connectMongo();

        // update
        const UProduct = await Productschema.UpdateOne({_id: id}, {
            $set: {
                ...req.body,
            }
        });


        // return new product
        res.status(200).json({"Updated Products Status": UProduct});
    } catch (e) {
        res.status(202).json({ err: 'Failed' });
    }
    
};

export default UpdateProduct