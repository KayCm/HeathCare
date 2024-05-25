"use client";
import styles from './TopNavBar.module.css'
import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {notification} from "antd";
import Modal from "react-modal";
import {ConnectTools} from "@/Component/ConnectTools";
import {fixAddressWithNum} from "@/Component/Tools";
import AlertConnectSelect from "@/Component/AlertConnectSelect";
import {useDispatch, useSelector} from "react-redux";
import {saveInfo, saveWallet} from "@/redux/features/auth";

window.globalProvider = {
    address:'',
    type: '',
    obj: null
};

function TopNavBar() {

    const dispatch = useDispatch()

    const [api, contextHolder] = notification.useNotification();

    const router = useRouter()

    const [select,setSelect] = useState(0)

    const [address,setAddress] = useState('')

    const [show,setShow] = useState(false)

    const pathName = usePathname();

    let pathArr =  pathName.split('/')

    const selectRefs = useRef(null);

    const authtReducer = useSelector((state)=>state.authReducer)

    useEffect(()=>{


        // let pubKey = localStorage.getItem('publicKey')
        //
        // setAddress(pubKey)

    },[])


    console.log('appsetReducer')
    console.log(authtReducer)


    return(<div className={styles.NavBar}>
        <div className={styles.logo}/>
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
            Health Care Mall
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

        <div onClick={()=>{

            selectRefs.current?.show()

        }} className={styles.menuLink}>{authtReducer.walletAddress?fixAddressWithNum(authtReducer.walletAddress,4):'Link wallet'}</div>

        <div>{authtReducer.walletType}</div>

        {contextHolder}

        <AlertConnectSelect refs={selectRefs} successBlock={(res)=>{

            console.log(res)

            dispatch(saveWallet({walletType:res.type, walletAddress:res.res}))

        }} />

        {/*{alertDownLoad()}*/}
    </div>)

}

export default TopNavBar;



