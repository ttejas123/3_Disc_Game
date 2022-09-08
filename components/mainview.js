import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {SOLANA_HOST} from '../utils/const'
import Gallery from './gallery'
import Navbar from './navbar'
import Upload from './upload'
import Metadata from './metadata'
import { Metaplex, bundlrStorage, toMetaplexFileFromBrowser, walletAdapterIdentity  } from "@metaplex-foundation/js";
// import gd from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from 'axios'
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import Create from './create'
import Update from './update'
const anchor = require('@project-serum/anchor')

const MainView = () => {
  const wallet = useWallet()
                                                //"mainnet-beta" 
  const connection = new Connection(clusterApiUrl("devnet"));
  const metaplex = Metaplex.make(connection)
  .use(walletAdapterIdentity(wallet))
  .use(bundlrStorage({
    address: 'https://devnet.bundlr.network',
    providerUrl: 'https://api.devnet.solana.com',
    timeout: 60000,
  }));

  const [tab, setTab] = useState(0);
  const [gallery, setGallery] = useState(false);
  const walletData = useWalletNfts({
    publicAddress: wallet.publicKey.toString(),
    connection,
  })

  // console.log(walletData)  //eslint-disable-line

  const [address, setAddress] = useState(
    "Fc5cN1JHai5YCoeEq2vQPDwANopQrN9sX1wE5j8QYh2K"
  );
  const [nft, setNft] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uri, setUri] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadCost, setUploadCost] = useState();
  const [error, setError] = useState('');
  const [fileIsSelected, setFileIsSelected] = useState(false)
  const [file, setFile] = useState();
  const [imgpreview, setImgpreview] = useState('');

  const fetchNft = async () => {
    // const mintAddress = new PublicKey("9AdTJhWxV7snnLuSx6EAiSN8Tucq8Bu2WiWS5He72yhh");
    // const task = metaplex.nfts().findByMint({ mintAddress });
    // const nft = await task.run();
    // console.log(nft.uri)  //eslint-disable-line

    // const nftMetaData = await axios.get(nft.uri);

    // console.log(metaD)   //eslint-disable-line
  };

  const createNFTMetaData = async () => {
    const metaD = await metaplex
    .nfts()
    .uploadMetadata({
        name: "TejaRaffle",
        description: "Awesome and epic but yet you can't happy with this",
        image: "https://arweave.net/_pwkP3t4H9lnSpIZa6v9SVwRManmi_gVL6KqqFlrjq0",
    })
    .run();
    // console.log(metaD)  //eslint-disable-line
    const nft = await metaplex
    .nfts()
    .create({
        uri: metaD.uri,
        name: "Tejas Raffle",
        sellerFeeBasisPoints: 5, // Represents 5.00%.
    })
    .run();

    // console.log(nft)  //eslint-disable-line
  }

  const handleFileChange = async (event) => {
    setFileIsSelected(true);
    setUri('');
    setError('');
    setUploading(false);
    const browserFile = event.target.files[0];
    setImgpreview(URL.createObjectURL(event.target.files[0]))
    let Cfile = await toMetaplexFileFromBrowser(browserFile);
    setFile(Cfile);
    setFileName(Cfile.displayName);
    const getUploadCost = await (await metaplex.storage().getUploadPriceForFile(Cfile)).basisPoints.toString(10)
    const cost = parseInt(getUploadCost, 10)
    setUploadCost(cost / LAMPORTS_PER_SOL)
  }

  const UploadFileC = async () => {
      try{
        setError('');
        setUploading(true);
        if (file) {
          // metaplex.storage().upload(file)
          const uri = await metaplex.storage().upload(file);
          // console.log(uri);  //eslint-disable-line
          if (uri) {
            setUri(uri);
            setFileIsSelected(false);
            setUploading(false);
            let prev = JSON.parse(window.localStorage.getItem("NFT_IMG"))
            if(prev) window.localStorage.setItem("NFT_IMG", JSON.stringify([...prev, uri]));
            else window.localStorage.setItem("NFT_IMG", JSON.stringify([uri]))
          }
  
        }
      } catch(err) {
          // console.log(err)  //eslint-disable-line
          setError(err);
          setUploading(false);
      }
  }

  return (
    <>
      <Navbar tab={tab} setTab={setTab} setGallery={setGallery} />

      {
        gallery && (
                  <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full z-50'>
                      <Gallery gallery={gallery} setGallery={setGallery} />
                  </div>
        )
      }
      
      {
        tab == 0 && (
          <div className='flex justify-center w-full bg-red'>
            <div className='flex justify-center w-[60%] bg-green'><Upload metaplex={metaplex} gallery={gallery} setGallery={setGallery} /></div>
          </div>
        )
      }

      {
        tab == 1 && (
          <div className='flex justify-center w-full bg-red'>
            <div className='flex justify-center w-[60%] bg-green'><Metadata metaplex={metaplex} /></div>
          </div>
        )
      }

      {
        tab == 2 && (
          <div className='flex justify-center w-full bg-red'>
            <div className='flex justify-center w-[60%] bg-green '><Create metaplex={metaplex} /></div>
          </div>
        )
      }

      { 
        tab == 3 && (
          <div className='flex justify-center w-full bg-red'>
            <div className='flex justify-center w-[60%] bg-green'><Update metaplex={metaplex} connection={connection} /></div>
          </div>
        )
      }
    </>
  )
}
export default MainView