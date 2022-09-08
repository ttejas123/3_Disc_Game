import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import MainView from '../components/mainview'

export default function Home() {
  const { connected } = useWallet()

  return (
    <div className='app'>
      {connected ? (
        <MainView />
      ) : (
        <div className="h-[100vh] flex justify-center items-center bg-[#4d4d4d] w-full">
           <div className="bg-white w-[90%] sm:w-[90%] md:w-[40%] lg:w-[35%] xl:w-[30%]  flex flex-col justify-center items-center rounded-xl p-5">
                <div className="font-bold text-xl">Connect Your Wallet</div>
                <div className="text-center mt-2 mb-12 text-[#b3b3b3]">Manage your account, check notifications and many more...</div>
                <WalletMultiButton />
           </div>
        </div>
      )}
    </div>
  )
}