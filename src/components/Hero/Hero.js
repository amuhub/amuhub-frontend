import Button from "../Button/Button";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero" id="home">
      <div className="text-container">
        <div className="hero-content">
          <div className="hero-title-wrapper">
            <h1>Have a doubt?</h1>
          </div>
          <p>
            Ask away all your queries and get answers from all around the world.
          </p>
        </div>
      </div>
      <img src={require("./images/hero-img.jpg")} alt="" />
    </div>
  );
};

export default Hero;
