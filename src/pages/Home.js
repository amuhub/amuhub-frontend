import React from 'react';
import Hero from '../components/Hero/Hero';
import AboutUS from '../components/AboutUs/AboutUS';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const  HomePage = () => {
    return ( 
    <>
        <Hero/>
        <AboutUS/>
        <Contact/>
    </>
    );
}
 
export default HomePage;