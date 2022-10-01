import { PublicKey, jwt, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './metaplex_D'
import connectMongo from '../../utils/connectMongo';
import Userschema from './schema/user'
// Login
const handler = async(req, res) => {
    const wallet = req.body.wallet

    try {
        await connectMongo();
        // console.log("Connected to DB")
        const _pubKey = new PublicKey(wallet)
        
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await Userschema.findOne({ pubkey: wallet });
        // console.log(oldUser)
        if (oldUser) {
        const refresh_token_check_for_old_user = req.body.refresh_token
        if(refresh_token_check_for_old_user == null) return res.sendStatus(401);
        let access_token_gen = "";
        jwt.verify(refresh_token_check_for_old_user, REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            // console.log(user)
            
            access_token_gen = jwt.sign(
            {pubkey: oldUser.pubkey, signature: oldUser.signature},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: "24h",
            }
            );

            // return res.status(200).send({"access_token": access_token_gen});
        })
        return res.json({pubkey: oldUser.pubkey, signature: oldUser.signature, access_token : access_token_gen, refresh_token : refresh_token_check_for_old_user });
        }

        const data_to_store = {
        pubkey: req.body.wallet, // sanitize: convert email to lowercase
        signature: req.body.signature
        }

        // Create token
        const accesstoken = jwt.sign(
        {pubkey: req.body.wallet, signature: req.body.signature},
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "24h",
        }
        );

        const refreshtoken = jwt.sign(
        {pubkey: req.body.wallet, signature: req.body.signature},
        REFRESH_TOKEN_SECRET
        );
        // console.log(accesstoken)
        // save user token
        data_to_store.access_token = accesstoken;
        data_to_store.refresh_token = refreshtoken;

        const user = await Userschema.create(data_to_store);

        // return new user
        res.status(201).json(user);
    } catch (e) {
        console.error(e);
        res.status(400).json({
        err: 'Invalid Wallet address provided',
        });
    }
    
};

export default handler