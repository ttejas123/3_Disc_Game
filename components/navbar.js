import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import {bodybg, borderColor, boxbg, inputbg, txtcolor, txtsecondcolor} from './globle'

function Navbar({tab, setTab, setGallery, setNftGallery}) {
  return (
    <div className={`bg-]-100 p-2 mx-5 my-5 rounded-lg flex justify-between shadow-lg`}>
        <div className={`Left bg- flex  items-center ml-5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-500 cursor-pointer`} >METAPLEX</div>
        <div className='flex items-center justify-between'>
            <div className='px-4 font-semibold text-sm text-pink-400 hover:text-purple-500 cursor-pointer' onClick={()=> setTab(0)} >UPLOAD</div>
            <div className='px-4 font-semibold text-sm text-pink-400 hover:text-purple-500 cursor-pointer' onClick={()=> setTab(1)} >METADATA</div>
            <div className='px-4 font-semibold text-sm text-blue-400 hover:text-purple-500 cursor-pointer' onClick={()=> setTab(2)} >NFT</div>
            <div className='px-4 font-semibold text-sm text-blue-400 hover:text-purple-500 cursor-pointer' onClick={()=> setTab(3)} >SPL TOKEN</div>
        </div>
        <div className='Right mr-2 flex items-center'>
            <div className='mr-7 text-3xl cursor-pointer' onClick={() => {
              setNftGallery(true)
            }}>🦊</div>
            <div className='mr-7 text-3xl cursor-pointer' onClick={()=> {
                                            setGallery(true)
                                          }}>
              🖼️
            </div>
            <WalletMultiButton />
        </div>
    </div>
  )
}

export default Navbar