"use client";
import styles from './BottomInfoBar.module.css'
import {DiscordOutlined, SendOutlined, XOutlined, YoutubeOutlined} from '@ant-design/icons';

function BottomInfoBar() {
    return(<div className={styles.bottomBar}>

        <div className={styles.InfoBar}>

        <div className={styles.InfoBarBox1}>

            <div className={styles.InfoBarBox1Logo} />

            <div className={styles.InfoBarBox1LogoBox}>
                <YoutubeOutlined style={{color:'#fff'}}/>
                <XOutlined onClick={()=>{
                    window.open('https://twitter.com/health_care2020')
                }} style={{color:'#fff',cursor: 'pointer'}}/>
                <DiscordOutlined style={{color:'#fff'}}/>
                <SendOutlined onClick={()=>{
                    // https://t.me/health_care2020
                    window.open('https://t.me/health_care2020')
                }} style={{color:'#fff',cursor: 'pointer'}}/>
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
    </div>)
}

export default BottomInfoBar;
