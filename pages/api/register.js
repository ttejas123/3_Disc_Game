import connectMongo from '../../utils/connectMongo';
import Userschema from './schema/user'
// Login
const Register = async(req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    try {
        await connectMongo();
        
        // check if user already exist
        const oldUser = await Userschema.findOne({ mail: mail });
        
        if (oldUser) {
            // if exist than resturn invalid msg;
            res.status(202).json({msg: "User Already Exist"});
            return;
        }

        const data_to_store = {
            mail:mail,
            password:password
        }

        const user = await Userschema.create(data_to_store);

        // return new user
        res.status(200).json(user);
    } catch (e) {
        res.status(202).json({ msg: 'Invalid User Credential' });
    }
    
};

export default Register