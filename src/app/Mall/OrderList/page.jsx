"use client"
import {Breadcrumb} from "antd";
import style from './page.module.scss'
import {useEffect, useState} from "react";
import {NetRequest} from "@/Component/Tools";


export default function OrderList() {

    const [select,setSelect] = useState(0)

    const [orderLst,setOrderLst] = useState([])

    useEffect(()=>{

        getList()

    },[])

    function getList() {

        // page	int	第几页
        // page_size	int	每页展示条数
        // address	string	钱包地址

        let pubKey = localStorage.getItem('publicKey')

        //
        let url = 'https://www.cyfcc.cc/transfer/list'
        let params = {
            page:1,
            page_size:10,
            address:pubKey
        }
        NetRequest(url,params).then(res=>{
            console.log(res)


            if (res.record_list){
                setOrderLst(res.record_list)
            }


        }).catch(err=>{
            console.log(err)
        })
    }

    return(<div className={style.orderList}>

        <div className={style.orderListbox}>

            <Breadcrumb items={[
                    {
                        title: <a href="/Mall">JoinCare Mall</a>,
                    },
                    {
                        title: <a href="/Mall/OrderList">View Orders</a>,
                    }
                ]}/>

            <div className={style.orderList_menuBox}>
                <div className={style.orderList_menu} onClick={()=>setSelect(0)}>
                    All Orders
                    <div className={select == 0 ? style.orderList_menuSelect : style.orderList_menuNoSelect} />
                </div>

                <div className={style.orderList_menu}  onClick={()=>setSelect(1)}>
                    Pending Payment
                    <div className={select == 1 ? style.orderList_menuSelect : style.orderList_menuNoSelect} />
                </div>

                <div className={style.orderList_menu}  onClick={()=>setSelect(2)}>
                    Pending Shipment
                    <div className={select == 2 ? style.orderList_menuSelect : style.orderList_menuNoSelect} />
                </div>

                <div className={style.orderList_menu}  onClick={()=>setSelect(3)}>
                    Pending receipt
                    <div className={select == 3 ? style.orderList_menuSelect : style.orderList_menuNoSelect} />
                </div>
            </div>

            <div className={style.orderList_orderLstBox}>

                {orderLst.length == 0 && (
                    <div className={style.orderList_orderDetail} style={{justifyContent:'center'}}>
                        <p style={{color:'#ffffff'}}>Empty</p>
                    </div>
                )}


                {orderLst.map((value)=>{

                    const {name,user_address,status,Price,tel} = value

                    return(<div className={style.orderList_orderDetail}>
                        <div className={style.orderList_orderDetail_img} />
                        <div className={style.orderList_orderDetail_rightBox}>
                            <p className={style.orderList_orderDetail_rightBox_text}>Human body health diagnostic device</p>
                            <p className={style.orderList_orderDetail_rightBox_detail}>Recipient address: {user_address},{name},{tel}</p>

                            <div className={style.orderList_orderDetail_rightBox_btnBar}>
                                <p className={style.orderList_orderDetail_rightBox_btnBar_text}>${Price}</p>
                                {/*<div className={style.orderList_orderDetail_rightBox_btnBar_btn}>*/}
                                {/*    Pay Now*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>)
                })}
            </div>





        </div>


    </div>)

}
