import Modal from "react-modal";
import styles from "@/Component/TopNavBar.module.css";
import {useImperativeHandle, useRef, useState} from "react";
import {ConnectTools} from "@/Component/ConnectTools";

function AlertConnectSelect({refs,successBlock}) {


    useImperativeHandle(refs,() => ({
        show:()=>{
            setShow(true)
        },
        hidden:()=>{
            setShow(false)
        }
    }))

    async function Connecting(){

        switch (globalProvider.type) {

            default:
            case "okx":{

                ConnectTools.okxConnect().then(res=>{
                    console.log('res')
                    console.log(res)
                    localStorage.setItem('publicKey',res.toString())
                    successBlock({type:'okx',res})
                    setShow(false)
                }).catch(err=>{
                    console.log('err')
                    console.log(err)
                    setShow(false)
                })

                break;
            }

            case "onekey":{

                ConnectTools.onekeyConnect().then(res=>{
                    console.log('res')
                    console.log(res)
                    localStorage.setItem('publicKey',res.toString())
                    successBlock({type:'onekey',res})
                    setShow(false)
                }).catch(err=>{
                    console.log('err')
                    console.log(err)
                    setShow(false)
                })

                break;
            }

        }


    }


    const [show,setShow] = useState(false)


    const customStyles = {
        overlay: {backgroundColor: 'rgba(0, 0, 0, 0.0)', zIndex: '999999999'},
        content: {top: '0%', left: '0%', right: '0%', bottom: '0%', alignItems: 'center'}
    }

    return (<Modal style={customStyles}
                   className={styles.glass}
                   isOpen={show}
                   onRequestClose={() => setShow(false)}>
        <div className={styles.modalBg}>

            <div className={styles.modalBgBar}>
                <div>Choose the wallet you want to use</div>
                <div className={styles.modalBgBarClosebtn} onClick={()=>{
                    setShow(false)
                }} />
            </div>

            <div onClick={()=>{

                window.globalProvider.type = 'okx'
                Connecting()

            }} className={styles.modalBgBarBtn}>
                Okx wallet
            </div>



            <div onClick={()=>{

                window.globalProvider.type = 'onekey'
                Connecting()

            }} className={styles.modalBgBarBtn}>
                Onekey wallet
            </div>

        </div>
    </Modal>)
}

export default AlertConnectSelect
