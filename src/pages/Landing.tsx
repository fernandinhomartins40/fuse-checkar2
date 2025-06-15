
import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Benefits from '../components/landing/Benefits';
import Testimonials from '../components/landing/Testimonials';
import CallToAction from '../components/landing/CallToAction';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <Hero />
      <div id="recursos">
        <Features />
      </div>
      <div id="beneficios">
        <Benefits />
      </div>
      <div id="depoimentos">
        <Testimonials />
      </div>
      <CallToAction />
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2023 CHECAR - Sistema de Revisão para Auto Centers</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
