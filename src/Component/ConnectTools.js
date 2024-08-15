import {Connection, PublicKey, Transaction} from "@solana/web3.js";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, createTransferInstruction, getAccount,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import bs58 from 'bs58'
import {Web3} from "web3";

async function transactionCreate(to, from, amount) {

    let UsdtAddress = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    let fromAddress = new PublicKey(from);
    let ToAddress = new PublicKey(to);

    const connection = new Connection("https://go.getblock.io/3e41dec165f14b028989198680bd846d")

    const senderTokenAccountAddress = await getAssociatedTokenAddress(
        UsdtAddress,
        fromAddress
    )

    const receiverTokenAccountAddress = await getAssociatedTokenAddress(
        UsdtAddress,
        ToAddress
    )

    const transaction = new Transaction()

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
        transaction.add(createAssociatedTokenAccountInstruction(
            fromAddress,
            receiverTokenAccountAddress,
            ToAddress,
            UsdtAddress,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        ))
    }

    const transferInstruction = await createTransferInstruction(
        senderTokenAccountAddress,
        receiverTokenAccountAddress,
        fromAddress,
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


        if (!provider.isConnected) {
            const resp = await provider.connect();
            localStorage.setItem('publicKey', resp.publicKey.toString())
            from = localStorage.getItem('publicKey')
        }

        let UsdtAddress = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
        let fromAddress = new PublicKey(from);
        let ToAddress = new PublicKey(to);

        const connection = new Connection("https://go.getblock.io/3e41dec165f14b028989198680bd846d")

        const senderTokenAccountAddress = await getAssociatedTokenAddress(
            UsdtAddress,
            fromAddress
        )

        const receiverTokenAccountAddress = await getAssociatedTokenAddress(
            UsdtAddress,
            ToAddress
        )

        const transaction = new Transaction()

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
            transaction.add(createAssociatedTokenAccountInstruction(
                fromAddress,
                receiverTokenAccountAddress,
                ToAddress,
                UsdtAddress,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            ))
        }

        const transferInstruction = await createTransferInstruction(
            senderTokenAccountAddress,
            receiverTokenAccountAddress,
            fromAddress,
            amount*1000000
        )

        transaction.add(transferInstruction)

        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash

        transaction.recentBlockhash = blockhash;

        transaction.feePayer = new PublicKey(from);

        const signedTransaction = await provider.signTransaction(transaction);

        console.log('signedTransaction')
        console.log(signedTransaction)

        return connection.sendRawTransaction(signedTransaction.serialize())



    },
    okxSign:async (msg) => {
        let provider = globalProvider.obj
        if (!provider) {
            return;
        }
        const message = msg;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(encodedMessage, "utf8");
        return bs58.encode(signedMessage.signature)
    },

    okxEthConnect: async (chainId) => {

        var str = getChainStr(chainId)

        return new Promise(async (resolve, reject) => {

            if (typeof window.okxwallet !== 'undefined') {

                const provider = window.okxwallet;

                globalProvider.obj = provider;
                globalProvider.chainStr = chainId;

                await globalProvider.obj.request({
                    method: 'wallet_switchEthereumChain',
                    // params: [{chainId: '0x38'}],
                    params: [{chainId: str}],
                });


                provider.request({method: 'eth_requestAccounts', params: [{chainId: str}],}).then(res => {
                    resolve(res[0]);
                })


            } else {

                reject('not install')

            }


        })
    },
    okxEthSendUSDT:async (to, from, amount) => {

        var str = getChainStr(globalProvider.chainStr)

        var USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
        var usdtNum = amount * 1000000

        switch (globalProvider.chainStr) {
            case 1:{
                usdtNum = amount * 1000000000000000000
                USDTAddress = '0x55d398326f99059fF775485246999027B3197955'
                break;
            }
            case 2:{
                usdtNum = amount * 1000000
                USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
                break;
            }
            case 3:{
                usdtNum = amount * 1000000
                USDTAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
                break;
            }
        }


        const ERC20_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
        const web3 = new Web3();

// calling any method that interacts with the network will use the supplied provider
        var aaa = await  web3.eth.getBlockNumber();



        let tokenContract = new web3.eth.Contract(ERC20_ABI, USDTAddress);

        console.log(tokenContract)
        console.log(tokenContract)
        console.log(tokenContract)

        const transaction = await tokenContract.methods.transfer(to, usdtNum).encodeABI();


        console.log('transaction')
        console.log(transaction)


        let provider = globalProvider.obj

        if (!provider) {

            return;
        }

        console.log("transaction123")
        return await provider.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: from,
                    to: USDTAddress,
                    value: 0x0,
                    gasPrice: '0x09184e72a000',
                    gas: '0x2710',
                    data:transaction,
                    chainId: str,
                },
            ],
        })
    },
    okxEthSign:async (address,msg)=>{
        let provider = globalProvider.obj
        if (!provider) {
            return;
        }

        // eth_sign
        return await provider.request({method: 'personal_sign', params: [address, msg]})
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

    },
    onekeySign:async (msg) => {
        let provider = globalProvider.obj
        if (!provider) {
            return;
        }
        const message = msg;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(encodedMessage, "utf8");
        return bs58.encode(signedMessage.signature)
    }
}

function getChainStr(chainId) {

    switch (chainId) {
        case 0:{
            return ''
        }
        case 1:{
            return '0x38'
        }
        case 2:{
            return '0x1'
        }
        case 3:{
            return '0x89'
        }
    }

}
