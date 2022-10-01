import {metaplex, PublicKey} from './metaplex_D'
const handler = async(req, res) => {
    try{
      const mintAddress = new PublicKey(req.body.id);
      const task = metaplex.nfts().findByMint({ mintAddress });
      const nft = await task.run(); 
      // console.log(nft)
      res.status(200).json({
        nft: nft
      })
    } catch (err) {
      res.status(404).json({
        msg: "Please Give Proper mint-Address/token-Address"
      })
    }
}

export default handler;