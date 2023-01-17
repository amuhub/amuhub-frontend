import "./Button.css";

const Button = ({ text, btnClass , onClick}) => {
  return (
    <>
      <a href="#" className={`btn ${btnClass}`} onClick = {onClick}>
        {text}
      </a>
    </>
  );
};

export default Button;
