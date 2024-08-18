'use client'
import React from "react";
import style from './page.module.scss'

function Business() {
    return(<div className={style.biz}>
        <div className={style.biztopBar}>

            <p className={style.biztopBartitle}>Business cooperation</p>
            <a href="mailto:ervices@health-care.global">
            <p className={style.biztopBartext}>Services@health-care.global</p>
            </a>

            <div className={style.biztopBarimg} />

            <div className={style.biztopBarimg1} />

        </div>

    </div>)
}


export default React.memo(Business);
