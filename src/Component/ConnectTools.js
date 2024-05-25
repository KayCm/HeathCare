import {Connection, PublicKey, Transaction} from "@solana/web3.js";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction, createTransferInstruction, getAccount,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";

async function transactionCreate(to, from, amount) {

    const connection = new Connection("https://go.getblock.io/3e41dec165f14b028989198680bd846d")

    let UsdtAddress = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");

    let fromer = new PublicKey(from);

    let toer = new PublicKey(to);

    const senderTokenAccountAddress = await getAssociatedTokenAddress(UsdtAddress, fromer)

    const receiverTokenAccountAddress = await getAssociatedTokenAddress(UsdtAddress, toer)

    const transaction = new Transaction()
    const createAccountInstruction = createAssociatedTokenAccountInstruction(
        fromer,
        receiverTokenAccountAddress,
        toer,
        UsdtAddress,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    )
    let receiverTokenAccount
    try {
        receiverTokenAccount = await getAccount(
            connection,
            receiverTokenAccountAddress,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
    } catch (e) {
        // If the account does not exist, add the create account instruction to the transaction
        transaction.add(createAccountInstruction)
    }

    const transferInstruction = await createTransferInstruction(
        senderTokenAccountAddress,
        receiverTokenAccountAddress,
        fromer,
        amount*1000000
    )

    transaction.add(transferInstruction)

    return transaction;

}

export const ConnectTools = {
    okxConnect: () => {

        return new Promise(async (resolve, reject) => {

            if (typeof window.okxwallet !== 'undefined') {

                const provider = window.okxwallet.solana;

                globalProvider.obj = provider;

                const resp = await provider.connect();

                resolve(resp.publicKey.toString());


            } else {

                reject('not install')

            }


        })
    },
    okxSendUSDT:async (to, from, amount) => {

        // return new Promise(async (resolve, reject) => {

        let provider = globalProvider.obj

        if (!provider) {

            return;
        }

        let fromer = new PublicKey(from);

        const connection = new Connection("https://go.getblock.io/3e41dec165f14b028989198680bd846d")

        const transaction = await transactionCreate(to, from, amount)

        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

        transaction.recentBlockhash = blockhash;

        transaction.feePayer = fromer;

        const signedTransaction = await provider.signTransaction(transaction);

       return connection.sendRawTransaction(signedTransaction.serialize())


    },
    onekeyConnect:()=>{

        return new Promise(async (resolve, reject) => {
            if ('$onekey' in window) {

                const provider = window.$onekey?.solana;

                globalProvider.obj = provider;

                console.log(provider.isConnected)

                    try {

                        const resp = await provider.connect();

                        console.log(resp.publicKey.toString());

                        resolve(resp.publicKey.toString())

                    } catch (err) {

                        reject(err)

                    }

            }else{
                reject('not install')
            }


        })


    },
    onekeySendUSDT:async (to, from, amount) => {

        let provider = globalProvider.obj

        if (!provider) {

            return;
        }

        let fromer = new PublicKey(from);

        const connection = new Connection("https://go.getblock.io/3e41dec165f14b028989198680bd846d")

        const transaction = await transactionCreate(to, from, amount)

        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

        transaction.recentBlockhash = blockhash;

        transaction.feePayer = fromer;

        const signedTransaction = await provider.signTransaction(transaction);

        return connection.sendRawTransaction(signedTransaction.serialize())

    }
}
