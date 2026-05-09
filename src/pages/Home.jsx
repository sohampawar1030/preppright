import React from 'react';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import Trust from '../components/Trust';
import Placement from '../components/Placement';
import CredentialsPartner from '../components/CredentialsPartner';
import Collaboration from '../components/Collaboration';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <Courses limit={3} />
      <Trust />
      <Placement />
      <CredentialsPartner />
      <Collaboration />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
