import "./Footer.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Footer = () => {

  const [query, setQuery] = useState("");

  return (
    <div className="footer">
      <div className = "footer-inner">
        <img src={require("./images/amuhub.png")} alt="" className="logo" />
        <ul className="footer-links">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="#about-us">
              about
            </Link>
          </li>
          <li>
            <Link to="#contact">
              contact
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <div className="search-div">
            <div className="search-icon">
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange = {(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ul className="footer_soc_links">
        <li>
          <a href="https://www.facebook.com/people/Amuhub/100094499956056/" target="_blank">
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/amuhubsocials" target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/amuhubsocials">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
      <p className="attribute">
        {" "}
        &copy; AMUHUB | 2023 <span></span>
      </p>
    </div>
  );
};

export default Footer;
