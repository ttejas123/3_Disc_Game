import {metaplex, authenticateToken} from './metaplex_D'
const handler = async(req, res) => {
    const auth = await authenticateToken(req, res)
    console.log(auth)
    if(!auth) res.status(403).json({msg: "Unauthorize!!"});
    try{
      const metaD = await metaplex
      .nfts()
      .uploadMetadata(req.body.data)
      .run();
      res.status(200).json({meta_data: metaD});
    } catch (err) {
      res.status(404).json({
        msg: "Please Give Proper Image/media."
      });
    }
  }

  export default handler;