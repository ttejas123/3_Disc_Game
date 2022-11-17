import connectMongo from '../../utils/connectMongo';
import Userschema from './schema/user'
// Login
const Login = async(req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    try {
        await connectMongo();
        
        // check if user already exist
        const oldUser = await Userschema.findOne({ mail: mail, password: password });
        
        if (oldUser) {
            // if exist than resturn invalid msg;
            res.status(200).json({mail: mail, password: password, msg: "Login Successful"});
            return;
        }

        // return new user
        res.status(202).json({"msg": "Invalid User Credentials"});
    } catch (e) {
        res.status(202).json({ err: 'Invalid User Credential' });
    }
    
};

export default Login