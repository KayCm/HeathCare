import Modal from "react-modal";
import {useImperativeHandle, useState} from "react";
import styles from "./AlertInfo.module.css";
import ico1 from '../../public/newIcon/icon@2x.png'
import ico2 from '../../public/newIcon/icon@2x (1).png'
import ico3 from '../../public/newIcon/icon@2x (2).png'
import Image from "next/image";


function AlertInfo({refs}) {

    const [errType,setErrType] = useState(2)
    const [errMsg,setErrMsg] = useState('')

    useImperativeHandle(refs,() => ({
        show:(ErrorType,ErrorMsg)=>{
            setShow(true)
            setErrType(ErrorType)
            setErrMsg(ErrorMsg)

        },
        hidden:()=>{
            setShow(false)
        }
    }))

    var img = ico1

    if (errType == 1){
        img = ico1
    }else if (errType == 2){
        img = ico2
    }else if (errType == 3){
        img = ico3
    }


    const [show,setShow] = useState(false)

    const customStyles = {
        overlay: {backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: '999999999'},
        content: {top: '0%', left: '0%', right: '0%', bottom: '0%', alignItems: 'center'}
    }

    return (<Modal style={customStyles}
                   className={styles.glass}
                   isOpen={show}
                   onRequestClose={() => setShow(false)}>
            <div onClick={()=>{
                setShow(false)
            }} style={{width:'100vw',height:'100vh',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
                    <div onClick={()=>{
                        setShow(false)
                    }} className={styles.bg} style={{color:'#fff'}}>
                        {/*<div className={styles.bgIcon} />*/}
                        <Image src={img} alt={''} width={20} height={20} />
                        <div className={styles.bgText}>
                            {errMsg}
                        </div>

                    </div>

            </div>

    </Modal>)
}

export default AlertInfo;
