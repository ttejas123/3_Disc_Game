import {getNonce, PublicKey} from './metaplex_D'

const handler = async(req, res) => {
    res.nonce = getNonce(req, res)
    const wallet = req.body.wallet
    try {
      const _pubKey = new PublicKey(wallet)
    //   console.log(_pubKey)
      res.status(200).json({
        nonce: res.nonce
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        err: 'Invalid Wallet address provided',
      });
    }
};

export default handler