import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect } from 'react'
import axios from 'axios'
import MainView from '../components/mainview'

export default function Home() {
  const { connected, publicKey, signMessage } = useWallet()
  useEffect(()=> {
    const fetch = async () => {
      if(publicKey) {
        let signature
        window.localStorage.setItem('access_token', "");
        try{
          const wallet = publicKey.toString() + "";
          // console.log(wallet);
          const getNonce = await axios.post('/api/genarateNonce', {"wallet": wallet});
          const base_signature_message = "Tales of Soulofox wants to sign your wallet: #####, with a nonce: $$$$$. This Signature request will not trigger a blockchain transaction or cost any gas fees."
          const message = base_signature_message.replace("#####", wallet).replace("$$$$$", getNonce.data.nonce)

          signature = await signMessage(
            new TextEncoder().encode(message),
            'utf8'
          )

          const registerdata = {
              "signature": message,
              "wallet": wallet,
              "refresh_token": window.localStorage.getItem("refresh_token")
          }
          const register_login = await axios.post('/api/register', registerdata)
          // console.log(register_login)
          window.localStorage.setItem('access_token', register_login.data.access_token);
          window.localStorage.setItem('refresh_token', register_login.data.refresh_token);
          alert("user Verification Completed")
        }catch(err){
          window.localStorage.setItem('access_token', "");
          alert("A wallet signature is necessary to prove that you own this Wallet! error")
        }
      } 
    }
    fetch() 
  }, [connected])
  return (
    <div className='app'>
      {connected ? (
        <MainView />
      ) : (
        <div className="h-[100vh] flex justify-center items-center bg-[#4d4d4d] w-full">
           <div className="bg-white w-[90%] sm:w-[90%] md:w-[40%] lg:w-[35%] xl:w-[30%]  flex flex-col justify-center items-center rounded-xl p-5">
                <div className="font-bold text-xl">Connect Your Wallet</div>
                <div className="text-center mt-2 mb-12 text-[#b3b3b3]">Manage your account, check notifications and many more...</div>
                <div><WalletMultiButton /></div>
           </div>
        </div>
      )}
    </div>
  )
}