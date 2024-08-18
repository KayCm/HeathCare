'use client'
import React, {useCallback, useMemo} from "react";
import style from './page.module.scss'
function AboutUS() {




    return(<div className={style.AboutMain}>


        <div className={style.AboutMaintopBar}>

            <div className={style.AboutMaintopBarimg1} />
            <div className={style.AboutMaintopBarimg2} />


            <div className={style.AboutMaintopBartitle1}>About<div className={style.AboutMaintopBartitle2}>JoinCare</div></div>
            <div className={style.AboutMaintopBartext}>
                JoinCare is operated under the compliant foundation model from Singapore, with the operating entity established jointly by a group of investors with extensive experience, high visibility, and strong capabilities in the Chinese health consulting industry, as well as technical experts with rich experience in the Internet and blockchain technology and applications field. It is backed by the strong industry operation capabilities of its parent company - Askap Social Care Guangxun Health Consulting Group, jointly committed to creating "global high-quality digital medical health services".
            </div>
        </div>

        <div className={style.AboutMainbottomBar}>

            <div className={style.AboutMainbottomBarleft}>
                <div className={style.AboutMainbottomBarlefttext}>Vision</div>
                <div className={style.AboutMainbottomBarlefttext1}>Empower everyone to quickly learn and master blockchain knowledge and applications, while significantly promoting the development and capitalization of the blockchain+ industry.</div>
            </div>

            <div className={style.AboutMainbottomBarmid}/>

            <div className={style.AboutMainbottomBarright}>
                <div className={style.AboutMainbottomBarlefttext}>Mission</div>
                <div className={style.AboutMainbottomBarlefttext1}>Committed to building the largest health community platform, creating a highly sticky medical health circle, integrating a huge potential user base, airdropping various benefits within the circle, and driving active consumption and benefits for circle users.</div>
            </div>

        </div>

        <div className={style.AboutMainBottomBar2} >
            <div className={style.AboutMainBottomBar2title}>
                Precise care, extraordinary for love
            </div>
            <div className={style.AboutMainBottomBar2text}>
                JoinCare is creating high-quality digital medical and health services globally, becoming a leader in the medical field.
            </div>

            <div className={style.AboutMainBottomBar2img} />

            <div className={style.AboutMainBottomBar2title} style={{marginTop:'5vh'}}>
                Contact us
            </div>

            <div className={style.AboutMainBottomBar2BarBox}>

                <div className={style.AboutMainBottomBar2BarBoxbox}>
                    <div className={style.AboutMainBottomBar2BarBoximg1}/>
                    <div className={style.AboutMainBottomBar2BarBoxtext1}>Business cooperation</div>
                    <div className={style.AboutMainBottomBar2BarBoxtext2}>healthcare2000.1.1@gmail.com</div>
                </div>

                <div className={style.AboutMainBottomBar2BarBoxbox}>
                    <div className={style.AboutMainBottomBar2BarBoximg2}/>
                    <div className={style.AboutMainBottomBar2BarBoxtext1}>Media cooperation</div>
                    <div className={style.AboutMainBottomBar2BarBoxtext2}>https://x.com/JoinCare_Server</div>
                </div>

                <div className={style.AboutMainBottomBar2BarBoxbox}>
                    <div className={style.AboutMainBottomBar2BarBoximg3}/>
                    <div className={style.AboutMainBottomBar2BarBoxtext1}>Operational support</div>
                    <div className={style.AboutMainBottomBar2BarBoxtext2}>https://x.com/JoinCare_Server</div>
                </div>


            </div>



        </div>

    </div>)
}

export default React.memo(AboutUS,()=>{return false});
