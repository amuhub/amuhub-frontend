import "./AboutUs.css";
import Title from "../Title/Title";


import Img1 from "../../assets/m1final.png"
import Img2 from "../../assets/m2final.png"


const AboutUS = () => {
  return (
    <div className="about-us-section" id="about-us">
      <Title text="About Us" />

      <div className="about-us-item">
        <div className="content">
          <div className="content-inner">
            <h1>Your Social Platform for AMU</h1>
            <p>
            Welcome to AMUHUB, your social platform designed exclusively for AMU personnels. Connect, engage, and share with students, teachers, alumni, and more. Seek answers, explore updates, and join the vibrant AMU community. Join us today and unlock the power of connection at AMUHUB.
            </p>  
          </div>
        </div>
        {/* <img src={deskImg1} alt="" className="desktop-img" /> */}
        {/* <img src={mobileImg1} alt="" className="mobile-img" /> */}
        <img src={Img1} alt="" className = "img-1"/>
      </div>

      <div className="about-us-item">
        <div className="content">
          <div className="content-inner">
            <h1>Engage with the AMU Community</h1>
            <p>
            At AMUHUB, stay connected with the AMU community easily. Engage with like-minded individuals, exchange knowledge, and stay updated with AMU. Join us now and experience the power of connection through AMUHUB.
            </p>
          </div>
        </div>
        {/* <img src={deskImg2} alt="" className="desktop-img" /> */}
        {/* <img src={mobileImg2} alt="" className="mobile-img" /> */}
        <img src={Img2} alt="" />
      </div>
    </div>
  );
};

export default AboutUS;
