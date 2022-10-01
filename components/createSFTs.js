import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import React, { useState } from 'react'
import NFTcreate from './createSFT'

function Create({metaplex}) {
    const [data, setData] = useState({});
    const wallet = useWallet();
    const [show, setShow] = useState(false);
    const [createData, setCreateData] = useState({});
    const [makes, setMake] = useState({});
    const [uploading, setUploading] = useState(false);
    const [c_upload, setc_upload] = useState(false);

    const createNFT = async() => {
        try {
            setUploading(true);
            console.log(makes)
            const config = {
                headers: { "authorization": `Bearer ${window.localStorage.getItem("access_token")}` }
            };
            const data = await axios.post('/api/spl-token', {
                "data": makes,
                "auth": wallet.publicKey.toString()
            }, config)

            if(data.status == 200){
                alert("Your SPL token is Created!")  //eslint-disable-line
            } else {
                window.alert("Ohh Sorry ⚠️ we Failed")  //eslint-disable-line
            }
            setUploading(false);
            setShow(false)
        } catch(err) {
            window.alert("Ohh Sorry ⚠️ we Failed")  //eslint-disable-line
            setUploading(false);
            setShow(false);
        }
    }

    const getData = async(uri = "") => {
        try{
            const fetch = await axios.get(uri);
            // console.log(fetch)  //eslint-disable-line
            setCreateData({...fetch.data})
            const make = {
                uri: uri,
            };
            if(fetch.data.seller_fee_basis_points != null){
                make["sellerFeeBasisPoints"] = fetch.data.seller_fee_basis_points;
            } 
            
            if(fetch.data.name != null){
                make["name"] = fetch.data.name;
            }

            if(fetch.data.symbol != null){
                make["symbol"] = fetch.data.symbol;
            }

            if(fetch.data.external_url != null){
                make["external_url"] = fetch.data.external_url;
            }

            if(fetch.data.amount != null){
                make["amount"] = fetch.data.amount;
            }

            setMake(make);
            setShow(true);
        } catch(err){
            alert("Ohh Sorry ⚠️ we Failed")  //eslint-disable-line
        }
    }

    return (
    <div className='flex flex-col justify-center items-center h-[80vh] w-full relative'>
        <>
        {
            c_upload && (
                <div className='h-full w-full absolute '>
                    <NFTcreate metaplex={metaplex} c_upload={c_upload} setc_upload={setc_upload} />
                </div>
            )
        }
        </>

        <>
        {
            !show && (<div className='flex w-full justify-center items-center'>
 
 🪙 Create SPL token without uri
                            
                               <div className="mt-5 bg-blue-50 ml-5 px-5 py-2 rounded-md text-center cursor-pointer mb-5" onClick={()=> setc_upload(!c_upload)}>➜</div>
                       </div>)
        }
        </>
        {
            show ? (<div className='w-[50%]'>
                <div className='flex'>
                    {createData.image != null && (<img src={createData.image} className="w-[100px] h-[100px]" />)}
                    <div className='flex justify-center items-center flex-col ml-5'>
                        <div className='font-semibold'>Name: {createData.name != null && (<>{createData.name}</>)}</div>
                        <div className='font-semibold'>Royalty: {createData.seller_fee_basis_points != null && (<>{createData.seller_fee_basis_points / 100}  %</>)}</div>
                    </div>

                    
                </div>
                <div className='flex mt-5 justify-between' >
                    <div className='bg-red-500 p-2 w-[50%] mr-2 text-center rounded-md cursor-pointer' onClick={()=> setShow(false)}>Back Off</div>
                    <div className='bg-green-500 p-2 w-[50%] ml-2 text-center rounded-md cursor-pointer' onClick={()=> createNFT()}>
                        <>{uploading && (<>
                        <svg role="status" className="inline mr-3 w-4 h-4 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </>)}</>
                        Go Ahead
                    </div>
                </div>
            </div>) : (<></>)
        }
    </div>
    )
}

export default Create