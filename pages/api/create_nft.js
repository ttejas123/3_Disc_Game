import {PublicKey, metaplex, account, authenticateToken} from './metaplex_D'
const handler = async(req, res) => {
    const auth = await authenticateToken(req, res)
    console.log(auth)
    if(!auth) res.status(403).json({msg: "Unauthorize!!"});
    try{
      const newWallet = new PublicKey(req.body.auth);
      const nft = await metaplex
      .nfts()
      .create({
          ...req.body.data,
          tokenOwner: newWallet,
          creators: [
            {
              address: newWallet,
              share: 50
            },
            {
              address: account.publicKey,
              share: 50
            }
          ],
          
      })
      .run();
      res.status(200).json({MetaData_uri: nft});

    } catch (err) {
      res.status(404).json({msg: "Sorry Create NFT fail!"})
    }
}

export default handler;