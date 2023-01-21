import "./Button.css";
import { Link } from "react-router-dom";

const Button = ({ text, btnClass , onClick}) => {
  return (
    <>
      <Link to="#" className={`btn ${btnClass}`} onClick = {onClick}>
        {text}
      </Link>
    </>
  );
};

export default Button;
