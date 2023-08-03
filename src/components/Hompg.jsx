import React from "react";
import { useState, useEffect } from "react";
import bannerline from "../assets/images/banner-line4.png";
import bannerimgbg from "../assets/images/banner-img-bg11.png";
import slideImage from "../assets/images/1230-min.png";
import bannerimg from "../assets/images/1001.png";
import banneralimenticon1 from "../assets/images/banner-aliment-icon-12.png";
import banneralimenticon2 from "../assets/images/banner-aliment-icon-23.png";
import banneralimenticon3 from "../assets/images/banner-aliment-icon-35.png";
import banneralimenticon4 from "../assets/images/banner-aliment-icon-4.png";
import logo from "../assets/images/LogoZao.png";
import dotsBack from "../assets/images/botsBack.png";
import shape3 from "../assets/images/shape-31.png";
import shape1 from "../assets/images/shape-11.png";
import shape2 from "../assets/images/shape-2.png";
import shape4 from "../assets/images/shape-4.png";
import backLogo from "../assets/images/shape-up-orange.png";
import upLogo from "../assets/images/shape-up-orange.png";
import cta from "../assets/images/cta-bg-img1.png";
import { Link, useNavigate } from "react-router-dom";
import "./Hompg.css";
import { useAuth } from "../context/AuthContext";
const Hompg = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const shopSection = document.getElementById("shop"); // Get the "shop" section by its id
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" }); // Scroll to the "shop" section
    }
  };
  
  const { count,setcount } = useAuth();

  return (
    <div className="home  ">
     <button onClick={()=> setcount(count + 1)}>
    click me
     </button>
     <p> fdfddfd {count}</p>
      <div className={"home22"}>
        <div className={"shape"}>
          {/* <div className={"shape1"}>
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
          </div> */}
          <div className={"contbackLogo"}>
            <img src={backLogo} alt="art shape" className="backLogo" />
            <img src={logo} alt="art shape" className="bLogo" />
          </div>
          <div className={"contdotsBack"}>
            <img src={dotsBack} alt="art shape" className="dotsBack" />
          </div>
        </div>
        <div className={"homeleft"}>
          {/* <div className="logoo ">
                    <img  className='logoImagee'  src={logo} alt="" /> 

          </div>   */}

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
                  className="bannerline"
                />
              </span>
            </span>
          </h1>
          <p className={"sectiontext"}>
            - بارخص الاسعار - <br /> نختص بكل ما يحتاجه الاعب العربي <br />
            توصيل متوفر داخل العراق 🇮🇶 <br />
            <br />
          </p>
          <div className="flex coooo flex-row  justify-center gap-1 mb-3  ">
            <div>
              <h1 className="conect">تواصل معنا على</h1>
            </div>
            <div className=" flex flex-row coo items-center gap-3 ">
            <a
  href="https://www.instagram.com/zao_stor/"
  target="n"
  className="mr-5 co text-neutral-800 dark:text-neutral-200"
>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 c o"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* <a
                href="#!"
                className=" mr-5 text-neutral-800 dark:text-neutral-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a> */}

              <a
                href="https://www.tiktok.com/@ZAO_STOR"
                target="n"
                className="mr-5 co1 text-neutral-800 dark:text-neutral-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 c"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
            </div>
          </div>
          <div className={"homebtngroup"}>
            <button
              onClick={handleButtonClick}
              className={"btnbtnprimary"}
              data-aos="zoom-in"
              data-aos-duration="1400"
            >
              <p className={"btntext"}>تصفح منتجاتنا </p>
              <span className={"square"}></span>
            </button>
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
          <div className={"imgbox"}>
            {/* <img src={bannerimgbg} alt="colorful background shape" className={backgroundshape} /> */}
            <div className="rrr">
              <div className="re">
                <img src={slideImage} alt="banner img" className="bannerimg" />
              </div>
              {/* <div className={"icon"}>
                <div className={"icon11"}>
                  <img src={banneralimenticon1} alt="" className="icomimg1" />
                  <img src={banneralimenticon2} alt="" className="icomimg2" />
                  <img src={banneralimenticon3} alt="" className="icomimg3" />
                  <img src={banneralimenticon4} alt="" className="icomimg4" />
                </div>
              </div> */}
            </div>
            <div className="sertc">
              {/* <div className={"sert"}>
                <img
                  src={bannerimgbg}
                  alt="colorful background shape"
                  className={"backgroundshape1"}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hompg;
