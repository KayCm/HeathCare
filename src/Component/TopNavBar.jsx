"use client";
import styles from './TopNavBar.module.css'
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {notification} from "antd";
import Modal from "react-modal";
import {ConnectTools} from "@/Component/ConnectTools";
import {fixAddressWithNum, NetRequest} from "@/Component/Tools";
import AlertConnectSelect from "@/Component/AlertConnectSelect";
import {useDispatch, useSelector} from "react-redux";
import {delInfo, saveInfo, saveUserInfo, saveWallet} from "@/redux/features/auth";
import Image from "next/image";

import binance from '../../public/newIcon/组 133630@2x (2).png'
import eth from '../../public/newIcon/组 133630@2x.png'
import polugon from '../../public/newIcon/组 133630@2x (1).png'
import solana from '../../public/newIcon/组 133630@2x (3).png'
import AlertInfo from "@/Component/AlertInfo";
// import tron from '../../public/blocks/tron@1x.png'



window.globalProvider = {
    address:'',
    type: '',
    chainStr:0, // 0 sol ,1 bnb, 2 eth , 3 polygon , 4 tron
    obj: null
};

const blockArr = [
    {name:'Solana',value:solana},
    {name:'Binance',value:binance},
    {name:'Etherum',value:eth},
    {name:'Polugon',value:polugon}
]

function TopNavBar() {

    const dispatch = useDispatch()

    const [api, contextHolder] = notification.useNotification();

    const router = useRouter()

    const [select,setSelect] = useState(0)

    const [addressChain,setAddressChain] = useState(0)

    const [menuCol, setMenuCol] = useState(true)

    const [menuWpShow, setMenuWpShow] = useState(false)

    const [WhitePaperShow, setWhitePaperShow] = useState(false)

    const menuArr = [
        { label: 'Home', path: '/' },
        { label: 'Health Care Mall', path: '/Mall' },
        { label: 'Business Cooperation', path: '/Business' },
        { label: 'About Us', path: '/AboutUS' },
        { label: 'WhitePaper', path: '' }

    ]

    const [show,setShow] = useState(false)
    const [blockSelect,setBlockSelect] = useState(0)
    const [blockSelectShow,setBlockSelectShow] = useState(false)

    const pathName = usePathname();

    let pathArr =  pathName.split('/')

    const selectRefs = useRef(null);
    const errorRefs = useRef(null);

    const authtReducer = useSelector((state)=>state.authReducer)

    useEffect(()=>{


        // let pubKey = localStorage.getItem('publicKey')
        //
        // setAddress(pubKey)

    },[])


    // console.log('appsetReducer')
    // console.log(authtReducer)

    function getAddress(address) {

        let url = 'http://39.107.119.127:9595/user/get/address'
        let params = {
            tel:'',
            address: address,
        }

        console.log('params')
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

                })


            }else{
                ConnectTools.okxSign(res.data).then(res=>{
                    console.log(res)
                    console.log(res)
                    console.log(res)

                    login(address,res,index)
                })
            }




        }).catch(err=>{
            console.log(err)
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
            errorRefs.current?.show("1",err.toString())
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

            errorRefs.current?.show("1",err.toString())


            console.log(err)
        })

    }

    return(<div className={styles.NavBar}>
        <div className={styles.logo} onClick={()=>{
            router.push('/')
        }}/>
        <div onClick={()=>{
            setSelect(0)
            router.push('/')
        }} className={styles.menuHome} style={{color:select == 0?'#1FF688':'#B5B5B5'}}>
            Home
            <div className={pathArr[1]== '' ?styles.menuSelect:styles.menuNoSelect}/>
        </div>
        <div onClick={()=>{
            setSelect(1)
            router.push('/Mall')
        }}  className={styles.menuHeathMall} style={{color:select == 1?'#1FF688':'#B5B5B5'}}>
            JoinCare Mall
            <div className={pathArr[1]== 'Mall' ?styles.menuSelect:styles.menuNoSelect}/>
        </div>
        <div onClick={()=>{
            setSelect(2)
            router.push('/Business')
        }}  className={styles.menuBusiness} style={{color:select == 2?'#1FF688':'#B5B5B5'}}>
            Business Cooperation
            <div className={pathArr[1]== 'Business' ?styles.menuSelect:styles.menuNoSelect}/>
        </div>
        <div onClick={()=>{
            setSelect(3)
            router.push('/AboutUS')
        }}  className={styles.menuAboutUS} style={{color:select == 3?'#1FF688':'#B5B5B5'}}>
            About Us
            <div className={pathArr[1]== 'AboutUS' ?styles.menuSelect:styles.menuNoSelect}/>
        </div>

        <div onMouseEnter={()=>{
            setWhitePaperShow(!WhitePaperShow)
        }} onMouseLeave={()=>{
            setWhitePaperShow(!WhitePaperShow)
        }}  className={styles.menuAboutUS} style={{color:'#B5B5B5'}}>
            WhitePaper
            {/*<div className={pathArr[1]== 'AboutUS' ?styles.menuSelect:styles.menuNoSelect}/>*/}

            {WhitePaperShow&&(<div className={styles.wpSelectBox}>
                <a className={styles.wpText} target="_blank" href="/wp_en.pdf">English</a>
                <a className={styles.wpText} target="_blank" href="/wp_cn.pdf">Chinese</a>
                <a className={styles.wpText} target="_blank" href="/wp_kor.pdf">Korean</a>
            </div>)}

        </div>

        {/*<div className={styles.menuBlockSelect} style={{color:select == 3?'#1FF688':'#B5B5B5'}}>*/}

        {/*    <Image onClick={()=>{*/}
        {/*        //setBlockSelectShow(true)*/}




        {/*    }}  src={blockArr[blockSelect]} width={80} height={20} />*/}

        {/*    /!*{blockSelectShow && (<div className={styles.menuBlockSelectAlertBox}>*!/*/}
        {/*    /!*    {blockArr.map((value,index)=>{*!/*/}

        {/*    /!*        return(<Image onClick={()=>{*!/*/}
        {/*    /!*            setBlockSelect(index)*!/*/}
        {/*    /!*            setBlockSelectShow(false)*!/*/}
        {/*    /!*            window.globalProvider.chainStr=index*!/*/}
        {/*    /!*        }} src={value} width={80} height={20} />)*!/*/}

        {/*    /!*    })}*!/*/}
        {/*    /!*</div>)}*!/*/}


        {/*</div>*/}



        <div onMouseEnter={() => {

            if (authtReducer.walletType){
                setShow(true)
            }else{
                setBlockSelectShow(true)
            }

        }}
             onMouseLeave={() => {

                 if (authtReducer.walletType){
                     setShow(false)
                 }else{
                     setBlockSelectShow(false)
                 }

             }}>
            <div className={styles.menuLink}>


                {/*{authtReducer.walletAddress}*/}

                {authtReducer.walletAddress?fixAddressWithNum(authtReducer.walletAddress,4):(<div className={styles.menuLinkImgBox}>
                    <div className={styles.menuLinkImg} />
                    OKX
                </div>)}

            </div>

            {show&&(<div className={styles.menuLinkBox} >
                <div className={styles.menuLinkBoxIn}>
                    <div onClick={()=>{
                        setShow(false)
                    }} className={styles.menuLinkBoxSinge}>{fixAddressWithNum(authtReducer.walletAddress,4)}</div>
                    <div onClick={()=>{
                        setShow(false)
                        // selectRefs.current?.show()

                        dispatch(delInfo())

                    }} className={styles.menuLinkBoxSinge}>Logout</div>
                </div>
            </div>)}


            {blockSelectShow && (
                <div className={styles.menuBlockSelectAlertBoxIn}>
                    {blockArr.map((value1,index)=>{

                     const {name,value} = value1

                    return(<div onClick={()=>{
                        setBlockSelect(index)
                        setBlockSelectShow(false)
                        window.globalProvider.chainStr=index
                        setAddressChain(index)

                        if (index == 0){

                            ConnectTools.okxConnect().then(res=> {
                                console.log('res')
                                console.log(res)
                                localStorage.setItem('publicKey', res.toString())

                                getAddress(res.toString())

                                getStrAndSign(res.toString(),0,index)


                            }).catch(err=>{
                                alert('okx not install')
                            })

                        }else{

                            ConnectTools.okxEthConnect(index).then(res=>{
                                console.log("res")
                                localStorage.setItem('publicKey', res.toString())

                                getAddress(res.toString())
                                getStrAndSign(res.toString(),1,index)

                            }).catch(err=>{
                                alert('okx not install')
                            })

                        }


                    }}  className={styles.menuBlockSelectAlertBoxSingle}>
                        <Image src={value} width={24} height={24} alt="1"/>
                        <div style={{marginLeft:'5px'}}>{name}</div>
                    </div>)

                })}
                </div>)}

        </div>
        {contextHolder}

        <AlertConnectSelect refs={selectRefs} successBlock={(res)=>{

            console.log(res)

            getAddress(res.res)

            getStrAndSign(res.res)

            dispatch(saveWallet({walletType:res.type, walletAddress:res.res}))

        }} />

        <div onClick={() => {
            setMenuCol(menuCol ? false : true)
        }} className={menuCol ? styles.homeMobileNume : styles.playMenu}></div>

        {/*{alertDownLoad()}*/}

        <div className={styles.mobileMenu} style={{ display: menuCol ? 'none' : 'block' }}>
            {menuArr.map((item, index) => {

                if (item.label == "WhitePaper"){
                    return (
                        <div onClick={()=>{
                            setMenuWpShow(true)
                        }} style={{ color: select === index ? '#1FF688' : '#B5B5B5' }}
                             className={styles.mobileMenuItem} style={{height:'35px'}} >{item.label}</div>)
                }else{
                    return (<div key={index} onClick={() => {
                        setMenuCol(true)
                        setSelect(index)
                        router.push(item.path)
                    }} style={{ color: select === index ? '#1FF688' : '#B5B5B5' }} className={styles.mobileMenuItem} >{item.label}</div>)
                }

            })}

            {menuWpShow&&(<div className={styles.mobileWpBg}>
                <a onClick={()=>{
                    setMenuWpShow(false)
                    setMenuCol(true)
                }}  className={styles.wpText} target="_blank" href="/wp_en.pdf">English</a>
                <a onClick={()=>{
                    setMenuWpShow(false)
                    setMenuCol(true)
                }}  className={styles.wpText} target="_blank" href="/wp_cn.pdf">Chinese</a>
                <a onClick={()=>{
                    setMenuWpShow(false)
                    setMenuCol(true)
                }}  className={styles.wpText} target="_blank" href="/wp_kor.pdf">Korean</a>
            </div>)}



        </div>


        <AlertInfo refs={errorRefs}/>
    </div>)

}

export default TopNavBar;



