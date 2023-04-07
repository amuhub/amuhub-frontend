import Title from "../../components/Title/Title";
import errorIcon from "../../assets/form/icon-error.svg";
import "./form.css";
import { useState } from "react";
import isAuthenticated from "../../utils/isAuth";
import baseUrl from "../../utils/constants";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [msg, setmsg] = useState(false);

  if (isAuthenticated()) {
    window.location.href = "/";
  }

  async function registerUser(event) {
    event.preventDefault();
    const user = { username, name, email, password };
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const resp = await response.json();
    if (resp.data != null) {
      console.log(resp.data);
      window.location.href = "/login";
    } else {
      setmsg(true);
      seterror(resp.message);
    }
  }

  return (
    <div className="form-body">
      <div className="form-container-outer">
        <Title text="Register" />
        <div className="form-container-inner">
          <div className="sign-in-img">
            <img
              src={require("../../assets/form/12-removebg-preview.png")}
              className="signup"
              alt=""
            />
          </div>

          <form onSubmit={registerUser}>
            <div className="input-div-error">
              {msg && (
                <div>
                  <img src={errorIcon} alt="" />
                  <p>{error}</p>
                </div>
              )}
            </div>
            <div className="input-div">
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Username"
                id="username"
                name="username"
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Full Name"
                id="name"
                name="name"
              />
            </div>
            <div className="input-div">
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                id="email"
                name="email"
              />
            </div>
            <div className="input-div">
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                id="password"
                name="password"
              />
            </div>
            <div className="options">
              <div className="option-list">
                <input type="checkbox" name="remerber-me" id="remember-me" />
                <label htmlFor="remerber-me">Remember Me!</label>
              </div>
              <Link href="#">Forgot Password ? </Link>
            </div>
            <input type="submit" value="Register" className="btn" />
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

export default Register;
