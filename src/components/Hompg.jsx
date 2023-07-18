import React from 'react'
import { useState, useEffect } from "react";
import bannerline from "../assets/images/banner-line-11.png"
import bannerimgbg from "../assets/images/banner-img-bg1.png"
import bannerimg from "../assets/images/100.png"
import banneralimenticon1 from "../assets/images/banner-aliment-icon-12.png"
import banneralimenticon2 from "../assets/images/banner-aliment-icon-23.png"
import banneralimenticon3 from "../assets/images/banner-aliment-icon-35.png"
import banneralimenticon4 from "../assets/images/banner-aliment-icon-4.png"
import shape3 from "../assets/images/shape-31.png";
import shape1 from "../assets/images/shape-11.png";
import shape2 from "../assets/images/shape-2.png";
import shape4 from "../assets/images/shape-4.png";
import cta from "../assets/images/cta-bg-img1.png";
import { Link } from 'react-router-dom';

 import "./Hompg.css"
const Hompg = () => {
  return (
    <div className='home pt-10 '>
    <div className={"home22"}>
        <div className={"shape"}>
          <div className={"shape1"}>
            <img src={shape1} alt="art shape1" width={70} />
          </div>
          <div className={"shape2"}>
            <img src={shape2} alt="art shape1" width={70} height={55} />
          </div>
          <div className={"shape3"}>
            <img src={shape3} alt="art shape" width={300} />
          </div>
          <div className={"shape4"}>
            <img src={shape4} alt="art shape" width={50} height={64} />
          </div>
        
        </div>
        <div className={"homeleft"}>
          <p className={"stitle"}>اهلا بكم في zao stor</p>

          <h1
            className={"mainheading"}
            data-aos="fade-right"
            data-aos-duration="900"
          >
            احصل على منتجك 
           
            <span className={"underlineimg"}>
            
              <span>
                <img
                  src={bannerline}
                  alt="line"
                  width="302px"
                  height="auto"
                  className='bannerline'
                />
              </span>
            </span>
          </h1>
          <p className={"sectiontext"}>
         
        -  بارخص الاسعار  - <br/>  نختص بكل ما يحتاجه الاعب العربي <br />
        توصيل متوفر داخل العراق 🇮🇶 <br/>your eye care history <br/> 
               and your vision needs. 
            </p>
            <h3>تواصل معنا</h3>
          <div className={"homebtngroup"}>
            <Link to="/#shop">
              <button onClick={"handleButtonClick"}
                className={"btnbtnprimary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"} >تصفح منتجاتنا </p>
                <span className={"square"}></span>
              </button>
            </Link>
            {/* <Link href="/aboutus">
              <button onClick={"handleButton1Click"}
                className={"btnbtnsecondary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Discover your current vision</p>
                <span className={"square"}></span>
              </button>
            </Link> */}
          </div>
        </div>
        <div className={"homeright"}>
         

      
          <div className={'imgbox'}>
            {/* <img src={bannerimgbg} alt="colorful background shape" className={backgroundshape} /> */}
          <div className='rrr' >
            <div className='re'>

            
            <img
              src={'https://firebasestorage.googleapis.com/v0/b/glassesd-cd48f.appspot.com/o/100.png?alt=media&token=46563ef2-7187-4aa3-9f52-ef13ecaea9a9'}
              alt="banner img"
              className="bannerimg"
             
            />
            </div>
            <div className={"icon"}>
              <div className={"icon11"}>
                <img
                  src={banneralimenticon1}
                  alt=""
                  className='icomimg1'
                /><img
                  src={banneralimenticon2}
                  alt=""
                  className='icomimg2'

                /> <img
                  src={banneralimenticon3}
                  alt=""
                  className='icomimg3'

                />
               
            
               <img src={banneralimenticon4} alt="" className='icomimg4'/>
              
              </div>
              
            </div>   
              </div>
            <div className='sertc'>

         
        <div className={"sert"}>
          <img
            src={bannerimgbg}
            alt="colorful background shape"
            className={"backgroundshape1"}
          />
        </div>
        </div>
        </div>
          </div>
         
      </div> 
</div>
  )
}

export default Hompg