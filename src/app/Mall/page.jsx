'use client'
import style from './page.module.scss'
import {useRouter} from "next/navigation";
import Modal from "react-modal";
import {useEffect, useRef, useState} from "react";
import {Input} from "antd";
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";
// import * as web3 from "@solana/web3.js";
import {NetRequest} from "@/Component/Tools";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction, createTransferInstruction,
    getAccount,
    getAssociatedTokenAddress,
    Token,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import * as splToken from "@solana/spl-token";
import {ConnectTools} from "@/Component/ConnectTools";
import {saveInfo, saveWallet} from "@/redux/features/auth";
import AlertConnectSelect from "@/Component/AlertConnectSelect";
import {useDispatch, useSelector} from "react-redux";

export default function Mall() {

    const router = useRouter()

    const dispatch = useDispatch()

    const [checkShow,SetCheckShow] = useState(false)
    const [addressShow,SetAddressShow] = useState(false)

    const [addressStr,setAddressStr] = useState('')
    const [phoneStr,setPhoneStr] = useState('')
    const [nameStr,setNameStr] = useState('')

    const selectRefs = useRef(null);

    const authtReducer = useSelector((state)=>state.authReducer)

    useEffect(()=>{

        setNameStr(authtReducer.userName)
        setAddressStr(authtReducer.userAddress)
        setPhoneStr(authtReducer.userPhone)

    },[])

    function alertCheck() {

        const customStyles = {
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0.0)', zIndex: '999999999'},
            content: {top: '0%', left: '0%', right: '0%', bottom: '0%', alignItems: 'center'}
        }

        return (<Modal style={customStyles}
                       className={style.glass}
                       isOpen={checkShow}
                       onRequestClose={() => SetCheckShow(false)}>
            <div className={style.checkout}>
                <div className={style.address_topBar}>
                    <p className={style.address_topBar_txt}>Check Out</p>
                    <div onClick={()=>{
                        SetCheckShow(false)
                    }}  className={style.address_topBar_btn} />
                </div>

                <div className={style.checkout_bar}>
                    <p className={style.checkout_bar_txt1}>$</p>
                    <p className={style.checkout_bar_txt2}>500</p>
                </div>

                <div className={style.checkout_bar}>

                    <div onClick={()=>{
                        // sendUsdt('7ApEemTPojcBdXxcrhXkh1M8BDugCEyCrRJkpTiP4M5o',500)
                        sendUSDT('9awYA3gj3djkbXSMushuTbfin433WbShDR85M1UbGQX4',0.001)
                    }} className={style.checkout_btn}>
                        Pay Now
                    </div>

                </div>


            </div>


        </Modal>)

    }

    function alertAddress() {


        const customStyles = {
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0.0)', zIndex: '999999'},
            content: {top: '0%', left: '0%', right: '0%', bottom: '0%', alignItems: 'center'}
        }

        return (<Modal style={customStyles}
                       className={style.glass}
                       isOpen={addressShow}
                       onRequestClose={() => SetAddressShow(false)}>
            <div className={style.address}>

                <div className={style.address_topBar}>
                    <p className={style.address_topBar_txt}>Address</p>
                    <div onClick={()=>{
                        SetAddressShow(false)
                    }}  className={style.address_topBar_btn} />
                </div>

                <div className={style.address_bar}>
                    <p className={style.address_bar_text}>Address<p className={style.address_bar_text1}>*</p> </p>
                    {/*<input placeholder="type in address" value={addressStr}  />*/}
                    <Input.TextArea rows={4} value={addressStr} placeholder="type in address" onChange={(e) => setAddressStr(e.target.value)}  className={style.address_bar_input} />
                </div>

                <div className={style.address_bar1} style={{marginTop:'24px'}}>
                    <p className={style.address_bar1_text}>Phone<p className={style.address_bar1_text1}>*</p> </p>
                    <Input placeholder="type in phone" value={phoneStr} onChange={(e) => setPhoneStr(e.target.value)}  className={style.address_bar1_input1} />
                </div>

                <div className={style.address_bar1} style={{marginTop:'24px'}}>
                    <p className={style.address_bar1_text}>Name<p className={style.address_bar1_text1}>*</p> </p>
                    <Input placeholder="type in Name" value={nameStr} onChange={(e) => setNameStr(e.target.value)}  className={style.address_bar1_input1} />
                </div>


                <div className={style.address_barbtn}>
                    <div onClick={()=>{
                        SetAddressShow(false)
                    }} className={style.address_barbtn_btn1}>
                        Cancle
                    </div>
                    <div onClick={()=>{
                        // localStorage.setItem('username',nameStr)
                        // localStorage.setItem('useraddress',addressStr)
                        // localStorage.setItem('userphone',phoneStr)
                        //

                        dispatch(saveInfo({userName:nameStr, userPhone:phoneStr, userAddress:addressStr}))


                        SetAddressShow(false)
                    }} className={style.address_barbtn_btn2}>
                        Sure
                    </div>
                </div>

            </div>
        </Modal>)

    }

    function sendUSDT(to,amount) {

        if (!globalProvider.obj){

            console.log(globalProvider.obj)
            console.log('globalProvider.obj is null')

            SetCheckShow(false)

            selectRefs.current?.show()

            return;

        }else{

            let pubKey = authtReducer.walletAddress

            switch (globalProvider.type) {
                default:
                case "okx":{

                    ConnectTools.okxSendUSDT(to,pubKey,amount).then(res=>{
                        console.log('res')
                        console.log(res)
                        orderAdd(res,amount,pubKey)
                    }).catch(err=>{
                        console.log('err')
                        console.log(err)
                    })

                    break;
                }
                case "onekey":{

                    ConnectTools.onekeySendUSDT(to,pubKey,amount).then(res=>{
                        console.log('res')
                        console.log(res)
                        orderAdd(res,amount,pubKey)
                    }).catch(err=>{
                        console.log('err')
                        console.log(err)
                    })

                    break;
                }
            }


        }

    }

    function orderAdd(hash,amount,pubKey) {
        // name	string	是	采用什么链、链名称
        // address	string	是	钱包地址
        // chain_id	int	是	链ID
        // symbol	string	是	币唯一标识
        // amount	string	是	交易金额
        // hash	string	是	交易hash
        // times	string	是	交易时间
        // type	string	是	健康仪器类型
        // receipt_information	object	是	收件信息

        setNameStr(localStorage.getItem('name'))
        setAddressStr(localStorage.getItem('address'))
        setPhoneStr(localStorage.getItem('phone'))

        let url = 'http://39.107.119.127:9595/transfer/add'
        let params = {
            name:authtReducer.userName,
            address:pubKey,
            chain_id:100,
            symbol:'sol',
            amount:amount+'',
            hash:hash,
            times:'1',
            type:'1',
            receipt_information:{
                name:authtReducer.userName,
                tel:authtReducer.userPhone,
                country:' ',
                city:' ',
                code:'000000',
                street:' ',
                community:authtReducer.userAddress
            }
        }

        console.log(params)
        NetRequest(url,params).then(res=>{
            console.log(res)
            alert('order success')
        }).catch(err=>{
            console.log(err)
            alert('order failed')
        })
    }

    return(<div className={style.mallmain}>

        <div className={style.mallTop} >
            <div>
                <div className={style.mallToptitle1}>Welcome to the Health Care Mall.</div>
                <div className={style.mallTopdetail}>Global premium digital healthcare services, leading in the medical field.</div>
            </div>

            <div style={{display:'flex'}}>
                <div onClick={()=>{
                    SetAddressShow(true)

                }} className={style.mallTopbtn}>Setting Address</div>
                <div onClick={()=>{
                    router.push('/Mall/OrderList')
                }} className={style.mallTopbtn}>Check OrderList</div>
            </div>


        </div>

        <div className={style.mallMiddle}>

            <div className={style.mallMiddleBoxDetailOut}>
                <div className={style.mallMiddleBoxDetail}>
                    <div className={style.mallMiddleBoxDetail_img}/>
                    <div className={style.mallMiddleBoxDetail_text1}>Human body health <br/>diagnostic device<br/>$500.00</div>
                </div>
                <div onClick={()=>{


                    // sendTx('5i7a9SDqA3z3G24pvUPJrRGWeVq3cdWVNmuMaySzkm3F',0.001)

                    // console.log(window.globalProvider)


                    SetCheckShow(true)

                }} className={style.mallMiddleBoxDetailBtn}>
                    Buy Now
                </div>
            </div>

            <div className={style.mallMiddleBoxDetailOut}>
                <div className={style.mallMiddleBoxDetail}>
                    <div className={style.mallMiddleBoxDetail_img1}/>
                    {/*<div className={style.mallMiddleBoxDetail_img_mask} />*/}
                    <div className={style.mallMiddleBoxDetail_text1}>Blood glucose monitor<br/><p style={{fontSize:'14px',fontWeight:'400'}}>Stay tuned~</p></div>
                </div>
                {/*<div className={style.mallMiddleBoxDetailBtn}>*/}
                {/*    Buy Now*/}
                {/*</div>*/}
            </div>

            <div className={style.mallMiddleBoxDetailOut}>
                <div className={style.mallMiddleBoxDetail}>
                    <div className={style.mallMiddleBoxDetail_img2}/>
                    {/*<div className={style.mallMiddleBoxDetail_img_mask} />*/}
                    <div className={style.mallMiddleBoxDetail_text1}>Human Health
                        Diagnostic Device<br/><p style={{fontSize:'14px',fontWeight:'400'}}>Stay tuned~</p></div>
                </div>
                {/*<div className={style.mallMiddleBoxDetailBtn}>*/}
                {/*    Buy Now*/}
                {/*</div>*/}
            </div>


        </div>

        <AlertConnectSelect refs={selectRefs} successBlock={(res)=>{

            console.log(res)

            dispatch(saveWallet({walletType:res.type, walletAddress:res.res}))

            // sendUSDT('9awYA3gj3djkbXSMushuTbfin433WbShDR85M1UbGQX4',0.001)

        }} />

        {alertCheck()}

        {alertAddress()}

    </div>)

}
