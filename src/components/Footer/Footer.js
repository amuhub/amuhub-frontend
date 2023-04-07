import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <img src={require("./images/amuhub.png")} alt="" className="logo" />
      <ul className="footer_soc_links">
        <li>
          <Link href="#">
            <i className="fab fa-facebook-f"></i>
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="fab fa-twitter"></i>
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="fab fa-instagram"></i>
          </Link>
        </li>
      </ul>
      <p className="attribute">
        {" "}
        &copy; AMUHUB | 2022 <span></span>
      </p>
    </div>
  );
};

export default Footer;
