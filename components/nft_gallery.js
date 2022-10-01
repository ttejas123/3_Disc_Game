import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection } from '@solana/web3.js';
import React, { useEffect, useState } from 'react'
import { useWalletNfts, NftTokenAccount, WalletResult } from "@nfteyez/sol-rayz-react";

function Gallery({gallery, setGallery}) {
    const [clip, setClip] = useState([])
    const wallet = useWallet();
    const connection = new Connection(clusterApiUrl("devnet"));
    const walletData = useWalletNfts({
        publicAddress: wallet.publicKey.toString(),
        connection,
    })
    console.log(walletData.nfts)
    useEffect(()=> {
        setClip(walletData.nfts)
    }, [walletData])

    return (
        <div className='w-[50%] h-[50%] rounded-3xl bg-[#d4dff7] opacity-[95%] p-5 text-black flex flex-col justify-center items-center'>
            <div className='grid gap-2 grid-cols-4 h-full overflow-y-scroll w-full'>

                {
                    (clip != null && clip.length > 0) && (
                        <>
                            {
                            
                                clip.map((val, index) => {
                                    return (<div key={index} className='flex-col p-3 w-[100px] h-[100px] cursor-pointer bg-red-100 text-[12px]' onClick={()=> {
                                        navigator.clipboard.writeText(`https://solscan.io/token/${val.mint}?cluster=devnet`);
                                        window.alert("Copied To Clipboard");  //eslint-disable-line
                                    }
                                }>
                                        <div>Name: {val.data.name}</div>
                                        <div>symbol: {val.data.symbol}</div>
                                    </div>)
                                })
                            }   
                        </>
                    )
                }

            </div>
        
            {
                    clip == null && (<div className='w-full text-center'> Sorry Nothing Here 😔 </div>)
            }

            <div className='w-full text-center bg-blue-200 hover:bg-blue-300 p-2 rounded-xl mt-10 cursor-pointer' onClick={()=> setGallery(!gallery)}>Done</div>
        </div>
    )
}

export default Gallery


{/* <img key={index} className='flex-col p-3 w-[100px] h-[100px] cursor-pointer' src={val} onClick={()=> {
                                                navigator.clipboard.writeText(val+"");
                                                window.alert("Copied To Clipboard");  //eslint-disable-line
                                            }
                                        } /> */}