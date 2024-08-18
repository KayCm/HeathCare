"use client";
import styles from './BottomInfoBar.module.css'
import {DiscordOutlined, SendOutlined, XOutlined, YoutubeOutlined} from '@ant-design/icons';

function BottomInfoBar() {
    return(<div>

    <div className={styles.bottomBar}>
        <div className={styles.InfoBar}>

        <div className={styles.InfoBarBox1}>

            <div className={styles.InfoBarBox1Logo} />

            <div className={styles.InfoBarBox1LogoBox}>
                <YoutubeOutlined  onClick={()=>{
                    window.open('https://www.youtube.com/@JoinCare ')
                }}  style={{color:'#fff'}}/>
                <XOutlined onClick={()=>{
                    window.open('https://x.com/JoinCare_Server')
                }} style={{color:'#fff',cursor: 'pointer'}}/>
                <DiscordOutlined onClick={()=>{
                    window.open('https://discord.gg/VXFxcwkK')
                }} style={{color:'#fff'}}/>

                <a href="mailto:ervices@health-care.global">
                    <SendOutlined style={{color:'#fff',cursor: 'pointer'}}/>
                </a>
            </div>



        </div>

        <div className={styles.InfoBarBox2}>
            <p className={styles.InfoBarBox2Title}>Platform Services</p>
            <p className={styles.InfoBarBox2Detail}>App Download</p>
            <p className={styles.InfoBarBox2Detail}>Service Agreement</p>
        </div>

        <div className={styles.InfoBarBox2}>
            <p className={styles.InfoBarBox2Title}>Mall Community</p>
            <p className={styles.InfoBarBox2Detail}>Product Mall</p>
            <p className={styles.InfoBarBox2Detail}>Community Center</p>
        </div>

        <div className={styles.InfoBarBox2}>
            <p className={styles.InfoBarBox2Title}>About Us</p>
            <p className={styles.InfoBarBox2Detail}>Project Overview</p>
            <p className={styles.InfoBarBox2Detail}>Team Introduction</p>
            <p className={styles.InfoBarBox2Detail}>Partnerships</p>
        </div>

        <div className={styles.InfoBarBox2}>
            <p className={styles.InfoBarBox2Title}>Terms and Conditions</p>
            <p className={styles.InfoBarBox2Detail}>User Agreement</p>
            <p className={styles.InfoBarBox2Detail}>Privacy Protection</p>
            <p className={styles.InfoBarBox2Detail}>Legal Declaration</p>
            <p className={styles.InfoBarBox2Detail}>Risk Disclaimer</p>
        </div>

        </div>
        <p style={{color:'rgba(255, 255, 255, 0.30)'}}>©️ 2024 Joincare Foundation All Rights Reserved</p>
    </div>

    <div className={styles.bottomBarMobile} >

        <p style={{color:'#fff'}}>©️ 2024 Joincare Foundation All Rights Reserved</p>

    </div>

    </div>)
}

export default BottomInfoBar;
