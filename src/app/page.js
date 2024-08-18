'use client'
import styles from "./page.module.css";
import {useState} from "react";


export default function Page() {

    const [textopen,setTextOpen] = useState(false)
    const [bar3moveIn1,setBar3moveIn1] = useState(false)
    const [bar3moveIn2,setBar3moveIn2] = useState(false)
    const [bar3moveIn3,setBar3moveIn3] = useState(false)

    return (<div className={styles.main}>

        <div className={styles.bar1Bg}>

          <div className={styles.bar1BgRightImg} />

          <div className={styles.bar1BgText1}>Precise care, extraordinary for love<div style={{width:'10px',color:'#2DFAA5'}}>!</div></div>
          <div className={styles.bar1BgText2}>JoinCare</div>
          <div className={styles.bar1BgText3}>Global high-quality digital <br/>medical and health services.</div>
          <div className={styles.bar1BgText4}>Building the world's largest <br/>health management community</div>


          <div className={styles.bar1BgBarBox}>

              <div className={styles.bar1BgBarBoxImgBox}>
                  <div className={styles.bar1BgBarBoxImg} />
                  <div className={styles.bar1BgBarBoxtext}>JoinCare is a Web3 health management platform <br/>that combines SocialFi and GameFi, using gamification <br/>to promote scientifically effective health management <br/>for millions of users.</div>
              </div>



              <div className={styles.barDownLoadBg} >

                  <div className={styles.barDownLoadBgLogo} />

                  <div>
                      <div className={styles.barDownLoadBgTitle1}>JoinCare APP</div>
                      <div className={styles.barDownLoadBgTitle2}>Precise care, extraordinary for love</div>
                  </div>

                  <div className={styles.barDownLoadBgBox}>
                      <div className={styles.barDownLoadBgBoxLogo1} />
                      <div className={styles.barDownLoadBgBoxLogo1Text}>Android</div>
                  </div>

                  <div className={styles.barDownLoadBgBox}>
                      <div className={styles.barDownLoadBgBoxLogo2} />
                      <div className={styles.barDownLoadBgBoxLogo1Text}>App Store</div>
                  </div>


              </div>
          </div>



      </div>

        <div className={styles.bar2Bg} >


            <div className={styles.bar2BgLeft} />



            <div>
                <div style={{display:'flex',alignItems: 'center'}}>
                    <div className={styles.bar2BgText}>JoinCare offers</div><div className={styles.bar2BgTextu1} style={{color:' #2DFAA5'}}>users</div>
                </div>
                    <div className={styles.bar2BgText1}>Providing personalized <br/>health management plans<br/>Achieving revenue in the <br/>Web3 domain</div>
                    <div className={styles.bar2Bgbar1}>
                        <div className={styles.bar2Bgbar1Img}/>
                        <div className={styles.bar2Bgbar1Img} style={{marginLeft:'36px'}}/>
                        <div className={styles.bar2Bgbar1Img} style={{marginLeft:'36px'}}/>
                        <div className={styles.bar2Bgbar1Img} style={{marginLeft:'36px'}}/>
                        <div className={styles.bar2Bgbar1Img} style={{marginLeft:'36px'}}/>
                    </div>

                    <div className={styles.bar2BgText2}>
                        JoinCare is operated by the Singapore Compliance Foundation, with a
                        <br/>team of experienced and well-known investors in the Chinese health
                        <br/>consulting industry, along with technical experts with rich experience in
                        <br/>Internet and blockchain technology and applications. The operating entity
                        <br/>is backed by a powerful industry operation parent company - Askap
                        <br/>Social Care, a large-scale consulting group dedicated to various
                        <br/>professional services in the health and medical field.

                        <br/><br/>The parent company of JoinCare, Askap Social Care, is located in
                        <br/>Singapore and is a consulting management group dedicated to
                        <br/>professional services in all aspects of the health and medical field.
                        <br/><br/>The company's business scope includes medical data collection and



                        {textopen&&(<div>


                            <br/>analysis, health management system construction, financial investment,
                            <br/>blockchain projects, medical platform research and development.

                            <br/><br/>We are committed to creating the largest health community platform,
                            <br/>creating a highly adhesive medical health circle, integrating a huge
                            <br/>potential user base, airdropping various benefits, and driving active
                            <br/>consumption and benefits for users within the circle. Here, users can
                            <br/>quickly learn and master blockchain knowledge and applications, while
                            <br/>greatly promoting the development and capital volume of the blockchain
                            <br/>+ industry.

                        </div>)}
                    </div>

                    <div onClick={()=>{
                        setTextOpen(!textopen)
                    }} className={styles.bar2BgTextBtn}>Learn More<div className={styles.bar2BgTextBtnImg}/></div>

            </div>

        </div>

        <div className={styles.bar3Bg} >
            <div className={styles.bar3BgTxt1}>Ai<p className={styles.bar3BgTxt2} style={{marginLeft:'8px'}}>intelligent diagnostic</p><p className={styles.bar3BgTxt3} style={{marginLeft:'8px'}}>monitoring devices</p></div>
            <div className={styles.bar3BgBar}>
                <div className={styles.bar3BgBarText1}>Promoting hundreds of millions of <br/>users to engage in scientifically <br/>effective health management.</div>
                <div className={styles.bar3BgBarText2}>
                    Provide personalized health guidance to <br/>users based on monitoring results to <br/>improve their quality of life.
                </div>

            </div>

            <div className={styles.bar3BgBottomBar}>


                {bar3moveIn1 && (<div onMouseLeave={()=>{
                                           setBar3moveIn1(false)
                                       }} className={styles.bar3BgBottomBarBox1on}>


                    <div className={styles.bar3BgBottomBarBox1onImg1} />

                    <div className={styles.bar3BgBottomBarBox1onImg1Text}>Human Health <br/>Diagnostic Device</div>


                </div> )}

                {!bar3moveIn1 && (<div className={styles.bar3BgBottomBarBox1}
                               onMouseEnter={()=>{
                                   setBar3moveIn1(true)
                               }}>
                     <div className={styles.bar3BgBottomBarImg1Text1}>Human Health <br/>Diagnostic Device</div>
                    <div className={styles.bar3BgBottomBarImg1Text2}>In the healthcare application scenario, users can obtain detailed health data about their internal organs and systems by using smart monitoring devices for regular health checkups. This data helps users understand their body's condition, such as heart function, liver and kidney health, promoting more scientific and effective health management. Through such technological applications, users can receive real-time health monitoring and analysis, helping them adjust their lifestyle habits and health plans promptly, achieving better physical health and quality of life.</div>

                </div>)}




                {bar3moveIn2 && (<div  onMouseLeave={()=>{
                                           setBar3moveIn2(false)
                                       }} className={styles.bar3BgBottomBarBox2on}>

                    <div className={styles.bar3BgBottomBarBox1onImg2} />

                    <div className={styles.bar3BgBottomBarBox1onImg1Text}>Blood glucose monitor</div>

                </div> )}

                {!bar3moveIn2 && (<div className={styles.bar3BgBottomBarBox2}
                               onMouseEnter={()=>{
                                   setBar3moveIn2(true)
                               }}>
                    <div className={styles.bar3BgBottomBarImg1Text1}>Blood glucose monitor<br/>　</div>
                    <div className={styles.bar3BgBottomBarImg1Text2}>
                        On the JoinCare platform, a smart sports watch is integrated as hardware, allowing users to monitor their exercise levels, heart rate, sleep quality, and other health indicators. This enables users to adjust their exercise and rest schedules based on real-time data, optimizing their daily health management. Through this approach, users can gain a better understanding of their physical condition, make more rational lifestyle choices, and ultimately improve their quality of life and physical health.
                    </div>

                </div>)}


                {bar3moveIn3 && (<div  onMouseLeave={()=>{
                                           setBar3moveIn3(false)
                                       }} className={styles.bar3BgBottomBarBox3on}>
                    <div className={styles.bar3BgBottomBarBox1onImg3} />
                    <div className={styles.bar3BgBottomBarBox1onImg1Text}>Human Health <br/>Diagnostic Device</div>
                </div>)}

                {!bar3moveIn3 && (<div className={styles.bar3BgBottomBarBox3} onMouseEnter={()=>{setBar3moveIn3(true)}} >
                    <div className={styles.bar3BgBottomBarImg1Text1}>Blood pressure<br/>detector</div>
                    <div className={styles.bar3BgBottomBarImg1Text2}>
                        Integrating intelligent chronic disease care hardware into the healthcare platform can provide users with continuous chronic disease management and intelligent care. These devices can monitor users' blood glucose and blood pressure levels in real time, helping them understand their health status in a timely manner. By regularly tracking these key health indicators, users can better manage chronic diseases such as diabetes and hypertension, thereby preventing the worsening of their conditions and maintaining a healthy and stable lifestyle.
                    </div>
                </div>)}

                {/*{bar3moveIn3?(<div  onMouseEnter={()=>{*/}
                {/*    setBar3moveIn3(true)*/}
                {/*}}*/}
                {/*                    onMouseLeave={()=>{*/}
                {/*                        setBar3moveIn3(false)*/}
                {/*                    }} className={styles.bar3BgBottomBarBox3on}>*/}

                {/*    <div className={styles.bar3BgBottomBarBox1onImg3} />*/}

                {/*    <div className={styles.bar3BgBottomBarBox1onImg1Text}>Human Health <br/>Diagnostic Device</div>*/}



                {/*</div> ):(<div className={styles.bar3BgBottomBarBox3}*/}
                {/*               onMouseEnter={()=>{*/}
                {/*                   setBar3moveIn3(true)*/}
                {/*               }}*/}
                {/*               onMouseLeave={()=>{*/}
                {/*                   // setBar3moveIn3(false)*/}
                {/*               }}>*/}
                {/*    <div className={styles.bar3BgBottomBarImg1Text1}>Blood pressure<br/>detector</div>*/}
                {/*    <div className={styles.bar3BgBottomBarImg1Text2}>*/}
                {/*        Integrating intelligent chronic disease care hardware into the healthcare platform can provide users with continuous chronic disease management and intelligent care. These devices can monitor users' blood glucose and blood pressure levels in real time, helping them understand their health status in a timely manner. By regularly tracking these key health indicators, users can better manage chronic diseases such as diabetes and hypertension, thereby preventing the worsening of their conditions and maintaining a healthy and stable lifestyle.*/}
                {/*    </div>*/}
                {/*</div>)}*/}



                {/*<div className={styles.bar3BgBottomBarImg2} ></div>*/}
                {/*<div className={styles.bar3BgBottomBarImg3} >*/}
                {/*    <div className={styles.bar3BgBottomBarImg1Text1}>Chronic Disease <br/>Monitor</div>*/}
                {/*    <div className={styles.bar3BgBottomBarImg1Text2}>Integrating intelligent chronic disease care hardware into the healthcare platform can provide users with continuous chronic disease management and intelligent care. These devices can monitor users' blood glucose and blood pressure levels in real time, helping them understand their health status in a timely manner. By regularly tracking these key health indicators, users can better manage chronic diseases such as diabetes and hypertension, thereby preventing the worsening of their conditions and maintaining a healthy and stable lifestyle.</div>*/}
                {/*</div>*/}



            </div>
        </div>

        <div className={styles.bar4Bg} >
            <div className={styles.bar4BgText1}>Utilizing artificial intelligence technology</div>
            <div className={styles.bar4BgText2}>blockchain + AI</div>
            <div className={styles.bar4BgText3}>applied to medical diagnosis</div>
            <div className={styles.bar4BgText4}>Artificial intelligence is widely used in the field of medicine, with applications in clinical medical diagnosis, neural network technology, <br/>traditional Chinese medicine, expert systems, and medical imaging diagnosis. With the development of science and technology, the <br/>application of artificial intelligence technology in medical diagnosis will become increasingly extensive and important.</div>
            <div className={styles.bar4BgBottomBar}>
                <div className={styles.bar4BgBottomBarText}>
                    Smart diagnosis and treatment is a project with physical products <br/>that has been successfully implemented in German stores and <br/>vigorously promoted. Leveraging AI-assisted medical diagnostic <br/>technology and blockchain, the "AI diagnostic equipment" has <br/>garnered nearly 500,000 users, accumulated a wealth of real-world <br/>data, and obtained five national invention patents. Currently, <br/>negotiations with the Swiss WTO for public welfare cooperation are <br/>underway. Upon reaching consensus, the user base and influence <br/>are expected to grow exponentially, serving as an effective means <br/>to promote medical diagnostics globally and gain international <br/>recognition for traditional Chinese medicine. In the future, we will <br/>develop more POCT products independently, open APIs to integrate <br/>with such service providers, collaborate for mutual benefit, and <br/>enrich the smart diagnosis and treatment ecosystem.
                </div>
                <div className={styles.bar4BgBottomBarImg}/>
            </div>
        </div>

        <div className={styles.bar5Bg} >

            <div className={styles.bar5BgText1}>Ai
                <div className={styles.bar5BgText2} style={{marginLeft:'8px'}}>JoinCare Eco-System</div>
                <div className={styles.bar5BgText3} style={{marginLeft:'8px'}}>Partners</div>
            </div>

        </div>

        <div className={styles.bar6Bg} ></div>


         {/*mobile */}

        <div className={styles.bar1BgMobile} >
            <div className={styles.Title1}>Precise care, extraordinary for love<div style={{color:'#2DFAA5'}}>!</div></div>
            <div className={styles.Title2}>JoinCare</div>
            <div className={styles.Title3}>Global high-quality digital medical and <br/>health services.</div>
            <div className={styles.Title4}>Building the world's largest health management community</div>
        </div>

        <div className={styles.bar2BgMobile} >
            <div className={styles.Title1}>Joincare offers <div className={styles.Title2}>users</div></div>
            <div className={styles.Title3}>Providing personalized <br/>health management plans<br/>Achieving revenue in the Web3 domain</div>
            <div className={styles.img1} />
            <div className={styles.btn}>
                Learn More
                <div className={styles.img}/>
            </div>
        </div>

        <div className={styles.bar3BgMobile}>
            <div className={styles.Title1}>Artificial
                <div className={styles.Title2}>intelligence</div>
                <div className={styles.Title3}>monitoring devices</div>
            </div>

            <div className={styles.Title4}>Promoting hundreds of millions of users to engage in scientifically effective health management.</div>

            <div className={styles.img1} />
        </div>

        <div className={styles.bar4BgMobile}>
            <div className={styles.Title1}>Utilizing artificial intelligence technology</div>
            <div className={styles.Title2}>blockchain + AI</div>
            <div className={styles.Title1}>applied to medical diagnosis</div>
            <div className={styles.Img}/>
        </div>

        <div className={styles.bar5BgMobile}>
            <div className={styles.Img1}/>
        </div>

    </div>);
}
