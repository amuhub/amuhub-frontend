import "./Contact.css";
import Title from "../Title/Title";

const Contact = () => {
  return (
    <>
      <Title text="Contact Us" />
      <div class="form-container">
        <div class="contact-img">
          <img src={require("./images/12-removebg-preview.png")} alt="" />
        </div>
        <form>
          <div class="input-div">
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
            />
            <p>This is error</p>
            <img src="./images/icon-error.svg" alt="" />
          </div>
          <div class="input-div">
            <input type="email" placeholder="Email" id="email" name="email" />
            <p>This is also an error</p>
            <img src="./images/icon-error.svg" alt="" />
          </div>
          <div class="input-div">
            <textarea
              name=""
              id=""
              cols="30"
              rows="5 "
              placeholder="Your Message Goes Here"
            ></textarea>
          </div>
          <input type="submit" value="Send" class="btn" />
        </form>
      </div>
    </>
  );
};

export default Contact;
