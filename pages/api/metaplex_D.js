const {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
    toMetaplexFile
  } = require('@metaplex-foundation/js');
const {Connection, PublicKey, Keypair, clusterApiUrl, Transaction, sendAndConfirmTransaction, SystemProgram, LAMPORTS_PER_SOL} = require('@solana/web3.js');
// const user_schema = require('./schema/user')
const key = require('./solana/devnet.json');
// const { TokenStandard } = require('@metaplex-foundation/mpl-token-metadata');
const secret = new Uint8Array(key) 
const account = Keypair.fromSecretKey(secret);
const jwt = require("jsonwebtoken");
const NETWORK_MAIN = 'devnet';
const SOLANA_HOST = clusterApiUrl(NETWORK_MAIN);
const connection = new Connection(SOLANA_HOST, 'confirmed');
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(account))
  .use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
  }));

const ACCESS_TOKEN_SECRET="96dd04b32115e9f5d724e5d5e1a61b1c3e0b8bf234b6927c0313c07c745fc8b9ef6c886df565d9b7b4bc05ca257544ce5808490e8b010a1a36b3572c0f1f93fc"
const REFRESH_TOKEN_SECRET="b0faacd617c4fc7c8027b49145c47db11a762f8f90185aa080471d0c7c00162a4661aa31b5f808abf34c209ffb42558c09c12f36918ed05bfaafe32c19967d93" 
const getNonce = (req, res) => { 
    const wallet = req.body.wallet
    const numStr = wallet.replace(/\D+/g, "")
    const numArr = numStr.split("")
    let nonce = 0
  
    for (let i = 0; i < numArr.length; i++) {
      if(i % 2 === 0){
        nonce += parseInt(numArr[i]) * 2
      }else{
        nonce += parseInt(numArr[i]) * 5
      }
    }
    return nonce.toString()
}

async function authenticateToken(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token)
  if(token == null) return false
  let ret = false;
  await jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) ret = false
    ret = true
  })

  return ret
}

export { metaplex, connection, SOLANA_HOST, NETWORK_MAIN, account, PublicKey, LAMPORTS_PER_SOL, toMetaplexFile, getNonce, authenticateToken, jwt, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };