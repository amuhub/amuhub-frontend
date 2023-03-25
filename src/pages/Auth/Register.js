import Title from "../../components/Title/Title";
import errorIcon from "../../assets/form/icon-error.svg";
import "./form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../utils/isAuth";
import baseUrl from "../../utils/constants";

const Register = () => {
  const navigate = useNavigate();
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
                <label for="remerber-me">Remember Me!</label>
              </div>
              <a href="#">Forgot Password ? </a>
            </div>
            <input type="submit" value="Register" className="btn" />
            <div className="horizontal-rule"></div>
            <ul className="soc-media">
              <li className="fb">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="twit">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="google">
                <a href="#">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
