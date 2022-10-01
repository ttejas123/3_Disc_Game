import connectMongo from '../../utils/connectMongo';
import Userschema from './schema/user'
// import {authenticateToken} from './metaplex_D'

// Login
const handler = async(req, res) => {
    // if(!authenticateToken(req, res)) res.status(404).json({data: "Not a user"})
    
    try {
        await connectMongo();
        const data = await Userschema.remove({})
        res.status(200).json({data})
    } catch (e){
        res.status(404).json({data: "Unable to Connect"})
    }
}

export default handler;