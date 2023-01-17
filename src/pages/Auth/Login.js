import Title from "../../components/Title/Title";
import errorIcon from "../../assets/form/icon-error.svg";
import "./form.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../utils/isAuth";

const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [error, seterror ] = useState('')
  const [msg, setmsg] = useState(false)
  // const navigate = useNavigate();

  if(isAuthenticated()){
    window.location.href ='/';
  }

  async function loginUser(event) {
    event.preventDefault()
    const user = { username , password }
    const response = await fetch('http://127.0.0.1:8000/auth/login',{
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const resp = await response.json()
    if(resp.data!=null){
      console.log('null nhi hai')
      localStorage.setItem('token',resp.data.token)
      window.location.href ='/';
    } else {
      setmsg(true);
      seterror(resp.message)
    }
    console.log(resp)
  }

  return (
    <div className="form-body">
      <div className="form-container-outer">
        <Title text="Login In" />
        <div className="form-container-inner">
          <div className="sign-in-img">
            <img
              src={require("../../assets/form/12-removebg-preview.png")}
              className="signin"
              alt=""
            />
          </div>

          <form onSubmit={loginUser}>
            <div className="input-div-error">
              {msg && <div><img src={errorIcon} alt="" /><p>{error}</p></div>}
            </div>
            <div className="input-div">
              <input
                type="text"
                value={username} onChange={(e)=>setusername(e.target.value)}
                placeholder="Username"
                id="username"
                name="username"
              />
            </div>
            <div className="input-div">
              <input
                type="password"
                value={password} onChange={(e)=>setpassword(e.target.value)}
                placeholder="Password"
                id="password"
                name="password"
              />
              {/* <p>This is also an error</p>
              <img src={errorIcon} alt="" /> */}
            </div>
            <div className="options">
              <div className="option-list">
                <input type="checkbox" name="remerber-me" id="remember-me" />
                <label for="remerber-me">Remember Me!</label>
              </div>
              <a href="#">Forgot Password ? </a>
            </div>
            <input type="submit" value="Sign in" className="btn" />
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

export default Login;
