import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react'
import style from '../styles/DFI.module.css';

import { ImageConfig } from '../config/ImageConfig'; 
import uploadImg from '../assets/cloud-upload-regular-240.png';
import { Metaplex, bundlrStorage, toMetaplexFileFromBrowser, walletAdapterIdentity  } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const DropFileInput = props => {
    // console.log(uploadImg.src)
    const wrapperRef = useRef(null);
    const wallet = useWallet()
    //"mainnet-beta" 
    const connection = new Connection(clusterApiUrl("devnet"));
    // const walletData = useWalletNfts({
    // publicAddress: wallet.publicKey.toString(),
    // connection,
    // })

    // console.log(walletData)
    const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
    }));

    const [fileList, setFileList] = useState([]);
    const [file, setFile] = useState('');
    const [uploadCost, setUploadCost] = useState();
    const [loading, setLoging] = useState(false);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = async(e) => {
        setLoging(true)
        const newFile = e.target.files[0];
        let Cfile = await toMetaplexFileFromBrowser(newFile);
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
            const getUploadCost = await (await metaplex.storage().getUploadPriceForFile(Cfile)).basisPoints.toString(10)
            const cost = parseInt(getUploadCost, 10)
            setUploadCost(cost / LAMPORTS_PER_SOL)
        }
        setLoging(false);
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    return (
        <div className=''>
            <div
                ref={wrapperRef}
                className={style.dropfileinput}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className={style.dropfileinput__label}>
                    <img src={uploadImg.src} alt="" />
                    
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className={style.dropfilepreview}>
                        <p className={style.dropfilepreview__title}>
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <>
                                    <div key={index} className={style.dropfilepreview__item}>
                                        <img src={URL.createObjectURL(item)} alt="" />
                                        <div className={style.dropfilepreview__item__info}>
                                            <p>{item.name}</p>
                                            <p>{item.size}B</p>
                                        </div>
                                        <span className={style.dropfilepreview__item__del} onClick={() => {
                                            fileRemove(item)
                                            setUploadCost(0)
                                        }}>x</span>
                                    </div>
                                    <>{loading && (<>
                                        <svg role="status" className="inline mr-3 w-4 h-4 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                    </>)}</>
                                    <span className='text-center w-full flex'>{uploadCost && (<>Cost :- <div className='text-red-400 pl-2 pr-1'>{" " + uploadCost}</div> SOL</>)}</span>
                                </>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
