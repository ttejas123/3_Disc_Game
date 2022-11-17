import connectMongo from '../../utils/connectMongo';
import Postschema from './schema/post'

export default async function FetchUserPost(req, res) {
    const mail = req.body.mail;

    try {
        await connectMongo();

        const post = await Postschema.find({mail: mail});

        res.status(200).json({data: [...post]})
    } catch (e){
        res.status(202).json({msg: 'Invalid User' });
    }
}