import createSPLToken from './create_spl_token'
import { PublicKey, account, connection, authenticateToken } from './metaplex_D'

const handler = async(req, res) => {
    const auth = await authenticateToken(req, res)
    // console.log(auth)
    if(!auth) res.status(403).json({msg: "Unauthorize!!"});
    const owner = new PublicKey(req.body.auth);
    const meta = req.body.data.uri;
    const amount = req.body.data.amount? req.body.data.amount: 1
    const createSft = await createSPLToken(owner, account, connection, amount, 9, false, req.body.data.name, req.body.data.symbol, meta);
    res.status(200).json({uri: createSft})
}

export default handler