'use client'
import React from "react";
import style from './page.module.scss'

function Business() {

    return(<div className={style.biz}>
        <div className={style.biztopBar}>

            <p className={style.biztopBartitle}>Business cooperation</p>
            <p className={style.biztopBartext}>healthcare2000.1.1@gmail.com</p>

            <div className={style.biztopBarimg} />

            <div className={style.biztopBarimg1} />

        </div>

    </div>)
}


export default React.memo(Business);
