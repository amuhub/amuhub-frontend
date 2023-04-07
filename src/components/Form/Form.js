import "./Form.css";
import Title from "../Title/Title";
import errorIcon from "./images/icon-error.svg";
import { Link } from "react-router-dom";

const Form = ({ form }) => {
  return (
    <div className="form-body">
      <div className="form-container-outer">
        {form === "signin" ? (
          <Title text="Sign In" />
        ) : (
          <Title text="Sign Up" />
        )}
        <div className="form-container-inner">
          {
            <div className="sign-in-img">
              <img
                src={require("./images/12-removebg-preview.png")}
                className={form}
                alt=""
              />
            </div>
          }

          <form>
            <div className="input-div">
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
              />
              <p>This is error</p>
              <img src={errorIcon} alt="" />
            </div>
            {form === "signin" && (
              <div className="input-div">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                />
                <p>This is error</p>
                <img src={errorIcon} alt="" />
              </div>
            )}
            <div className="input-div">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
              <p>This is also an error</p>
              <img src={errorIcon} alt="" />
            </div>
            <div className="options">
              <div className="option-list">
                <input type="checkbox" name="remerber-me" id="remember-me" />
                <label htmlFor="remerber-me">Remember Me!</label>
              </div>
              <Link href="#">Forgot Password? </Link>
            </div>
            <input type="submit" value="Sign in" className="btn" />
            <div className="horizontal-rule"></div>
            <ul className="soc-media">
              <li className="fb">
                <Link href="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li className="twit">
                <Link href="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li className="google">
                <Link href="#">
                  <i className="fab fa-google-plus-g"></i>
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
