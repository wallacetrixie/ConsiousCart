import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import Categories from '../components/Categories.jsx';
import Footer from '../components/Footer.jsx';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Categories />
      <Footer />
    </>
  );
};

export default Homepage;
