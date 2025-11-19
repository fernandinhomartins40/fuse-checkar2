
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#0F3460] to-[#0F3460]/80 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Sistema Completo de
          <span className="text-[#FF5722] block">Revisão Automotiva</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Gerencie clientes, veículos e revisões com eficiência. 
          Ofereça transparência total aos seus clientes com nosso portal dedicado.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/admin/login">
            <Button size="lg" className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-8 py-4 text-lg">
              Acessar Painel Admin
            </Button>
          </Link>
          <Link to="/cliente/dashboard">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0F3460] px-8 py-4 text-lg">
              Portal do Cliente
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
