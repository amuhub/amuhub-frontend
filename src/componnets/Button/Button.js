import './Button.css';

const Button = ({text,btnClass}) => {
  return (
    <><a href="www.gooogle.com" className={`btn ${btnClass}`}>{text}</a></>
  )
}

export default Button