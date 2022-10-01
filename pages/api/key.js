import {account, connection, authenticateToken} from './metaplex_D'
const handler = async(req, res) => {
    const auth = await authenticateToken(req, res)
    console.log(auth)
    if(!auth) res.status(403).json({msg: "Unauthorize!!"});
    
    const b = await connection.getBalance(account.publicKey);
    const balance = b / 1000000000;
    res.status(200).json({
        pubkey: account.publicKey,
        balance: balance + " SOL",
        seckey: account.secretKey
    });
}

export default handler;