import "./Button.css";

const Button = ({ text, btnClass }) => {
  return (
    <>
      <a href="#" className={`btn ${btnClass}`}>
        {text}
      </a>
    </>
  );
};

export default Button;
