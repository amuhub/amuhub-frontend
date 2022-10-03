import "./AboutUs.css";
import Title from "../Title/Title";

import deskImg1 from "./images/illustration-editor-desktop.svg";
import deskImg2 from "./images/illustration-laptop-desktop.svg";
import phoneImg from "./images/illustration-phones.svg";

import mobileImg1 from "./images/illustration-editor-mobile.svg";
import mobileImg2 from "./images/illustration-laptop-mobile.svg";

const AboutUS = () => {
  return (
    <div className="about-us-section" id="about-us">
      <Title text="About Us" />

      <div className="about-us-item">
        <div className="content">
          <div className="content-inner">
            <h1>Lightweight</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              possimus explicabo est alias eveniet maxime quaerat, dicta
              voluptatum deserunt cum asperiores perferendis tenetur nesciunt ex
              id culpa ducimus corrupti dolorum.
            </p>
          </div>
        </div>
        <img src={deskImg1} alt="" className="desktop-img" />
        <img src={mobileImg1} alt="" className="mobile-img" />
      </div>

      <div className="about-us-item">
        <div className="content">
          <div className="content-inner">
            <h1>Lightweight</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              possimus explicabo est alias eveniet maxime quaerat, dicta
              voluptatum deserunt cum asperiores perferendis tenetur nesciunt ex
              id culpa ducimus corrupti dolorum.
            </p>
          </div>
        </div>
        <img src={deskImg2} alt="" className="desktop-img" />
        <img src={mobileImg2} alt="" className="mobile-img" />
      </div>

      <div className="about-us-item">
        <div className="content">
          <div className="content-inner">
            <h1>Lightweight</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              possimus explicabo est alias eveniet maxime quaerat, dicta
              voluptatum deserunt cum asperiores perferendis tenetur nesciunt ex
              id culpa ducimus corrupti dolorum.
            </p>
          </div>
        </div>
        <img src={phoneImg} alt="" />
      </div>
    </div>
  );
};

export default AboutUS;
