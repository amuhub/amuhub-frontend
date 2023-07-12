import Title from "../../components/Title/Title";
import errorIcon from "../../assets/form/icon-error.svg";
import "./form.css";
import { useState } from "react";
import isAuthenticated from "../../utils/isAuth";
import baseUrl from "../../utils/constants";
import { Link } from "react-router-dom";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import formImg from "../../assets/form/login-new.jpg"

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [msg, setmsg] = useState(false);
  const [load, setLoad] = useState(false)


  if (isAuthenticated()) {
    window.location.href = "/";
  }

  async function loginUser(event) {
    event.preventDefault();
    setLoad(true)
    const user = { username, password };
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const resp = await response.json();
    if (resp.data != null) {
      localStorage.setItem("token", resp.data.token);
      window.location.href = `/profile/${username}`;
    } else {
      setmsg(true);
      seterror(resp.message);
      setLoad(false)
    }
  }

  return (
    <div className="form-body">
      <div className="form-container-outer">
        <h1 className="nav_logo">
          amu<span>hub</span>
        </h1>
        <div className="form-container-inner">
          <div className="sign-in-img">
            <img
              src={formImg}
              className="signin"
              alt=""
            />
          </div>

          <form onSubmit={loginUser}>
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
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                id="password"
                name="password"
              />
            </div>
            
            <button className="btn btn-block btn-lg" onClick={loginUser}>
              {load ? <ButtonLoader/> : `Sign in`}
            </button>
            {/* <div className="horizontal-rule"></div>
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
            </ul> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
