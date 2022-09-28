import Navbar from "./componnets/Navbar/Navbar";
import Hero from "./componnets/Hero/Hero";
import AboutUS from "./componnets/AboutUs/AboutUS";
import Contact from "./componnets/Contact/Contact";
import Footer from "./componnets/Footer/Footer";
import Form from "./componnets/Form/Form";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <AboutUS/>
      <Contact/>
      <Footer/>
      {/* <Form form = "signup"/> */}
    </div>
  );
}

export default App;
