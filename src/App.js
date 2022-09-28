import React from 'react';
import HomePage from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HomePage/>
      <Login/>
      <Register/>
      <Footer/>
    </div>
  );
}

export default App;
  