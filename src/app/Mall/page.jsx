'use client'
import style from './page.module.scss'
import {useRouter} from "next/navigation";
import Modal from "react-modal";
import {useEffect, useRef, useState} from "react";
import {NetRequest} from "@/Component/Tools";
import {ConnectTools} from "@/Component/ConnectTools";
import {saveInfo, saveUserInfo, saveWallet} from "@/redux/features/auth";
import AlertConnectSelect from "@/Component/AlertConnectSelect";
import {useDispatch, useSelector} from "react-redux";
import { Spin } from 'antd';

import binance from '../../../public/newIcon/组 133630@2x (2).png'
import eth from '../../../public/newIcon/组 133630@2x.png'
import polugon from '../../../public/newIcon/组 133630@2x (1).png'
import solana from '../../../public/newIcon/组 133630@2x (3).png'
import Image from "next/image";
import AlertInfo from "@/Component/AlertInfo";

const blockArr = [
    {name:'Solana',value:solana},
    {name:'Binance',value:binance},
    {name:'Etherum',value:eth},
    {name:'Polugon',value:polugon}
]

export default function Mall() {

    const router = useRouter()

    const dispatch = useDispatch()

    const errorRefs = useRef(null);

    const [checkShow,SetCheckShow] = useState(false)
    const [addressShow,SetAddressShow] = useState(false)

    const [addressStr,setAddressStr] = useState('')
    const [phoneStr,setPhoneStr] = useState('')
    const [nameStr,setNameStr] = useState('')

    const selectRefs = useRef(null);

    const authtReducer = useSelector((state)=>state.authReducer)

    useEffect(()=>{

        setNameStr(authtReducer.shopingName)
        setAddressStr(authtReducer.shopingAddress)
        setPhoneStr(authtReducer.shopingPhone)

    },[authtReducer])

    // console.log(authtReducer)

    const [payLoading,setPayLoading] = useState(false)

    const [loginShow,setLoginShow] = useState(false)
    const [loginSelectShow,setLoginSelectShow] = useState(false)
    const [loginChainSelect,setLoginChainSelect] = useState(0)


    function getAddress(address) {

        let url = 'http://39.107.119.127:9595/user/get/address'
        let params = {
            tel:'',
            address: address,
        }

        console.log('params getAddress')
        console.log(params)

        NetRequest(url,params).then(res=>{
            console.log(res)

            dispatch(saveInfo({shopingName:res.data.name, shopingPhone:res.data.tel, shopingAddress:res.data.street}))

        }).catch(err=>{
            console.log(err)
        })

    }

    function getStrAndSign(address,type=0,index) {

        let url = 'http://39.107.119.127:9595/user/str'

        let params = {
            address:address
        }

        NetRequest(url,params).then(res=> {

            console.log(res.data)
            console.log(res.data)
            console.log(res.data)

            if (type == 1){
                ConnectTools.okxEthSign(address,res.data).then(res=>{

                    loginWithEth(address,res,index)

                }).catch(err=>{
                    errorRefs.current?.show(1,err.toString())
                })


            }else{
                ConnectTools.okxSign(res.data).then(res=>{
                    console.log(res)
                    console.log(res)
                    console.log(res)

                    login(address,res,index)
                }).catch(err=>{
                    errorRefs.current?.show(1,err.toString())
                })
            }




        }).catch(err=>{
            console.log(err)
            errorRefs.current?.show(1,err.toString())
        })

    }
    function loginWithEth(address,signature,index) {

        let url = "http://39.107.119.127:9595/user/login2"

        let chain = 0


        // if (addressChain == 1){
        //     chain = 2
        // }else if (addressChain == 2){
        //     chain = 0
        // }else if (addressChain == 3){
        //     chain = 1
        // }

        let params = {
            type:chain,
            address:address,
            signature:signature
        }

        console.log(params)

        NetRequest(url,params).then(res=> {

            console.log(res)
            console.log(res)
            console.log(res)

            dispatch(saveWallet({walletType:'okx', walletAddress:address,walletChain:index}))
            dispatch(saveUserInfo({...res.data.data,token:res.data.token}))

        }).catch(err=>{
            errorRefs.current?.show(2,err.toString())
            console.log(err)
        })

    }
    function login(address,signature,index) {

        // /user/login

        let url = 'http://39.107.119.127:9595/user/login'

        let params = {
            address:address,
            signature:signature
        }

        console.log(params)

        NetRequest(url,params).then(res=> {

            console.log(res)
            console.log(res)
            console.log(res)

            dispatch(saveWallet({walletType:'okx', walletAddress:address,walletChain:index}))
            dispatch(saveUserInfo({...res.data.data,token:res.data.token}))

        }).catch(err=>{

            errorRefs.current?.show(2,err.toString())


            console.log(err)
        })

    }

    function loginAlert() {

        const customStyles = {
            overlay: {backgroundColor: 'rgba(0, 0, 0, 0.0)', zIndex: '999999999'},
            content: {top: '0%', left: '0%', right: '0%', bottom: '0%', alignItems: 'center'}
        }

        return (<Modal style={customStyles}
                       className={style.glass}
                       isOpen={loginShow}
                       onRequestClose={() => setLoginShow(false)}>
            <div className={style.loginAlert}>
                <div className={style.loginAlert_title}>
                    <div className={style.loginAlert_titletxt}>Select the linked wallet</div>
                    <div className={style.loginAlert_titleimg} onClick={()=>{setLoginShow(false)}} />
                </div>

                <div className={style.loginAlert_select}>

                        <div className={style.loginAlert_select_title}>Select the wallet</div>
                        <div onClick={()=>{setLoginSelectShow(!loginSelectShow)}} className={style.loginAlert_select_box}>

                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <Image src={blockArr[loginChainSelect].value} width={24} height={24} alt="1"/>
                                <div style={{marginLeft:'10px'}}>{blockArr[loginChainSelect].name}</div>
                            </div>

                            <div className={style.loginAlert_select_box_alertBox_selectBarLeftIcon} />

                            {loginSelectShow&&(<div  className={style.loginAlert_select_box_alertBox}>
                                {blockArr.map((value1,index)=>{

                                    const {name,value} = value1

                                    return(<div onClick={()=>{
                                        setLoginChainSelect(index)

                                    }} className={style.loginAlert_select_box_alertBox_selectBar}>
                                        <Image src={value} width={24} height={24} alt="1"/>
                                        <div style={{marginLeft:'10px'}}>{name}</div>
                                    </div>)
                                })}
                            </div>)}
                    </div>



                </div>

                <div onClick={()=>{

                    setLoginShow(false)

                    window.globalProvider.chainStr=loginChainSelect


                    if (loginChainSelect == 0){

                        ConnectTools.okxConnect().then(res=> {
                            console.log('res')
                            console.log(res)
                            localStorage.setItem('publicKey', res.toString())

                            getAddress(res.toString())
                            //
                            getStrAndSign(res.toString(),0,loginChainSelect)

                            // dispatch(saveWallet({walletType:'okx', walletAddress:res.toString(),walletChain:loginChainSelect}))
                        }).catch(err=>{
                            alert('okx not install')
                        })

                    }else{

                        ConnectTools.okxEthConnect(loginChainSelect).then(res=>{
                            console.log("res")
                            localStorage.setItem('publicKey', res.toString())
                            getAddress(res.toString())
                            getStrAndSign(res.toString(),1,loginChainSelect)
                            // dispatch(saveWallet({walletType:'okx', walletAddress:res,walletChain:loginChainSelect}))
                        }).catch(err=>{
                            alert('okx not install')
                        })

                    }

                }} className={style.loginAlert_select_box_alertBox_btn}>
                    <div className={style.loginAlert_select_box_alertBox_btn_txt}>
                        Link wallet
                    </div>

                </div>


            </div>
        </Modal>)

    }

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
                    <div className={style.address_topBar_txt}>Check Out</div>
                    <div onClick={()=>{
                        SetCheckShow(false)
                    }}  className={style.address_topBar_btn} />
                </div>

                <div className={style.checkout_bar}>
                    <div className={style.checkout_bar_txt1}>$</div>
                    <div className={style.checkout_bar_txt2}>500</div>
                </div>

                <div className={style.checkout_bar}>

                    <div onClick={()=>{
                        // sendUsdt('7ApEemTPojcBdXxcrhXkh1M8BDugCEyCrRJkpTiP4M5o',500)
                        setPayLoading(true)
                        sendUSDT('7ApEemTPojcBdXxcrhXkh1M8BDugCEyCrRJkpTiP4M5o',1)
                    }} className={style.checkout_btn}>
                        Pay Now

                        {payLoading&&<Spin style={{marginLeft:'20px'}}/>}
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
                    <div className={style.address_topBar_txt}>Address</div>
                    <div onClick={()=>{
                        SetAddressShow(false)
                    }}  className={style.address_topBar_btn} />
                </div>

                <div className={style.address_bar}>
                    <div className={style.address_bar_text}>Address<div className={style.address_bar_text1}>*</div> </div>
                    {/*<input placeholder="type in address" value={addressStr}  />*/}
                    {/*<Input.TextArea rows={4} value={addressStr} placeholder="type in address" onChange={(e) => setAddressStr(e.target.value)}  className={style.address_bar_input} />*/}
                    <textarea rows={4} value={addressStr} placeholder="type in address" onChange={(e) => setAddressStr(e.target.value)}  className={style.address_bar_input} />
                </div>

                <div className={style.address_bar1} style={{marginTop:'24px'}}>
                    <div className={style.address_bar1_text}>Phone<div className={style.address_bar1_text1}>*</div> </div>
                    {/*<Input placeholder="type in phone" value={phoneStr} onChange={(e) => setPhoneStr(e.target.value)}  className={style.address_bar1_input1} />*/}
                    <input placeholder="type in phone" value={phoneStr} onChange={(e) => setPhoneStr(e.target.value)}  className={style.address_bar1_input1} />
                </div>

                <div className={style.address_bar1} style={{marginTop:'24px'}}>
                    <div className={style.address_bar1_text}>Name<p className={style.address_bar1_text1}>*</p> </div>
                    {/*<Input placeholder="type in Name" value={nameStr} onChange={(e) => setNameStr(e.target.value)}  className={style.address_bar1_input1} />*/}
                    <input placeholder="type in Name" value={nameStr} onChange={(e) => setNameStr(e.target.value)}  className={style.address_bar1_input1} />
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


                        saveAddress(nameStr,addressStr,phoneStr)

                        dispatch(saveInfo({userName:nameStr, userPhone:phoneStr, userAddress:addressStr}))


                        SetAddressShow(false)
                    }} className={style.address_barbtn_btn2}>
                        Sure
                    </div>
                </div>

            </div>
        </Modal>)

    }

    function saveAddress(name,address,phone) {

        let url = 'http://39.107.119.127:9595/user/msg/add'
        let params = {
            content : name,
            address: authtReducer.walletAddress,
            tel:phone,
            // country:'1',
            // city:'1',
            // code:'1',
            street:address,
            // community:'1'
        }

        console.log('params123')
        console.log(params)

        NetRequest(url,params).then(res=>{
            console.log(res)

            getAddress(authtReducer.walletAddress)

            errorRefs.current?.show(3,"Save Address Success")
        }).catch(err=>{
            console.log(err)
            errorRefs.current?.show(1,err.toString())
        })


    }

    function sendUSDT(to,amount) {

        if (!globalProvider.obj){

            // console.log(globalProvider.obj)
            // console.log('globalProvider.obj is null')
            //
            // SetCheckShow(false)
            //
            // selectRefs.current?.show()

            // ConnectTools.okxConnect().then(res=>{
            //     sendUSDT(to,amount)
            // })

            return;

        }else{

            let pubKey = authtReducer.walletAddress
            //
            //
            // ConnectTools.okxSendUSDT(to,pubKey,amount).then(res=>{
            //     console.log('res')
            //     console.log(res)
            //     orderAdd(res,amount,pubKey)
            // }).catch(err=>{
            //     console.log('err')
            //     console.log(err)
            //     setPayLoading(false)
            // })
            //
            //
            // return;

            switch (globalProvider.type) {
                default:
                case "okx":{


                    switch (globalProvider.chainStr) {

                        case 0:{

                            ConnectTools.okxSendUSDT(to,pubKey,amount).then(res=>{
                                console.log('res')
                                console.log(res)
                                orderAdd(res,amount,pubKey)
                            }).catch(err=>{
                                console.log('err')
                                console.log(err)
                                setPayLoading(false)
                            })

                            break;

                        }
                        case 1:
                        case 2:
                        case 3:{
                            ConnectTools.okxEthSendUSDT('0x6beE8F94E38Fe3ff152BfF17cE344B2AAb8F4a28',pubKey,amount).then(res=>{
                                console.log(res)
                                orderAdd(res,amount,pubKey)
                            }).catch(err=>{
                                console.log(err)
                                setPayLoading(false)
                            })
                            break;
                        }

                    }

                }
                // case "onekey":{
                //
                //     ConnectTools.onekeySendUSDT(to,pubKey,amount).then(res=>{
                //         console.log('res')
                //         console.log(res)
                //         orderAdd(res,amount,pubKey)
                //     }).catch(err=>{
                //         console.log('err')
                //         console.log(err)
                //         setPayLoading(false)
                //     })
                //
                //     break;
                // }
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

        // setNameStr(localStorage.getItem('name'))
        // setAddressStr(localStorage.getItem('address'))
        // setPhoneStr(localStorage.getItem('phone'))

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
            SetCheckShow(false)
            setPayLoading(false)
            alert('order success')
        }).catch(err=>{
            console.log(err)
            SetCheckShow(false)
            setPayLoading(false)
            alert('order failed')
        })
    }

    // function getAddress(address) {
    //
    //     let url = 'http://39.107.119.127:9595/user/get/address'
    //     let params = {
    //         tel:'',
    //         address: address,
    //     }
    //
    //     console.log('params')
    //     console.log(params)
    //
    //     NetRequest(url,params).then(res=>{
    //         console.log(res)
    //
    //         setNameStr(res.data.name)
    //         setAddressStr(res.data.street)
    //         setPhoneStr(res.data.tel)
    //
    //         dispatch(saveInfo({userName:res.data.name, userPhone:res.data.tel, userAddress:res.data.street}))
    //
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    //
    // }

    function getInvCode() {

        // /user/code/get

        let url = 'http://39.107.119.127:9595/user/code/get'

        NetRequest(url,null).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })

    }



    return(<div className={style.mallmain}>

        <div className={style.mallTop} >
            <div>
                <div className={style.mallToptitle1}>Welcome to the JoinCare Mall</div>
                <div className={style.mallTopdetail}>Global premium digital healthcare services, leading in the medical field.</div>
            </div>

            <div className={style.mallTopbox} style={{display:'flex'}}>
                <div onClick={()=>{


                    if (authtReducer.walletType){
                        SetAddressShow(true)
                    }else{
                        setLoginShow(true)
                    }


                }} className={style.mallTopbtn}>Setting Address</div>
                <div onClick={()=>{

                    if (authtReducer.walletType){
                        router.push('/Mall/OrderList')
                    }else{
                        setLoginShow(true)
                    }


                }} className={style.mallTopbtn}>Check OrderList</div>
            </div>


        </div>

        <div className={style.mallMiddle}>

            <div className={style.mallMiddleBoxDetailOut}>

                <div className={style.mallMiddleBoxDetail}>
                    <div className={style.mallMiddleBoxDetail_img}/>
                    <div className={style.mallMiddleBoxDetail_text}>Blood pressure detector ｜ Human Health Diagnostic Device ｜Blood glucose monitor</div>
                    <div className={style.mallMiddleBoxDetail_textt}>$699</div>
                </div>
                <div onClick={()=>{
                    if (authtReducer.token){
                        SetCheckShow(true)
                    }else {
                        setLoginShow(true)
                    }
                }} className={style.mallMiddleBoxDetailBtn}>

                    {authtReducer.walletType?'Buy Now':(<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className={style.loginAlert_select_box_alertBox_btn_btnImg}/>
                        <div>OKX</div>
                    </div>)}

                    {authtReducer.walletType&&(<div className={style.mallMiddle_btnImg} />)}

                </div>

            </div>



        </div>

        <AlertInfo refs={errorRefs}/>

        {alertCheck()}

        {alertAddress()}

        {loginAlert()}
    </div>)

}
