const { getOrCreateAssociatedTokenAccount, createMint, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token, getAssociatedTokenAddress, getMint, getAccount, mintTo, transfer, createSetAuthorityInstruction, AuthorityType } = require('@solana/spl-token')
const { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, Transaction } = require('@solana/web3.js')
const { PROGRAM_ID, DataV2, createCreateMetadataAccountV2Instruction, createUpdateMetadataAccountV2Instruction } = require('@metaplex-foundation/mpl-token-metadata');


async function createSPLToken(owner, fromWallet, connection, quantity = 1, decimals = 9, isChecked = false, tokenName = "QQ_Token", symbol = "QQ", metadata) {
    let mint;
    let fromTokenAccount = '';
    let toWallet = new PublicKey(owner.toString());

    try {
        mint  = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            decimals
        )
      
        console.log("SFT-token: "+`https://solscan.io/token/${mint.toBase58()}?cluster=devnet`)
    
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        )
        
        const tx = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet,
            quantity * 1000000000
        )
  
        // console.log(`Minted ${quantity} token`);

        const MintInfo = await getMint(connection, mint);
        // console.log("Current Supply :" + MintInfo.supply);

        const seed1 = Buffer.from("metadata");
        const seed2 = Buffer.from(PROGRAM_ID.toBytes());
        const seed3 = Buffer.from(mint.toBytes());
        const [metadataPDA, _bump] = PublicKey.findProgramAddressSync([seed1, seed2, seed3], PROGRAM_ID);

        const accounts = {
            metadata: metadataPDA,
            mint,
            mintAuthority: fromWallet.publicKey,
            payer: fromWallet.publicKey,
            updateAuthority: fromWallet.publicKey,
        }
        const dataV2 = {
            name: tokenName,
            symbol: symbol,
            uri: metadata,
            // we don't need that
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        const args =  {
          createMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: fromWallet.publicKey,
                primarySaleHappened: true
            }
        };

        let ix = createCreateMetadataAccountV2Instruction(accounts, args)
        const tx1 = new Transaction()
        tx1.add(ix)
        // const connection = new web3.Connection("https://api.devnet.solana.com");
        const txid = await sendAndConfirmTransaction(connection, tx1, [fromWallet]);
        // console.log("SFT-token MetaData is created: "+txid);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);

        const signature = await transfer(
            connection,
            fromWallet,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            quantity * 1000000000
        );

        // console.log("Transfer Completed: "+signature)
        return `https://solscan.io/token/${mint.toBase58()}?cluster=devnet`
    } catch (error) {
        return (error)
    }

}

export default createSPLToken