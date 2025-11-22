
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-3xl text-[#0F3460]">directions_car</span>
            <h1 className="text-2xl font-bold text-[#0F3460] tracking-tight">CHECAR</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-600 hover:text-[#0F3460] transition-colors">
              Recursos
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-[#0F3460] transition-colors">
              Benefícios
            </a>
            <a href="#depoimentos" className="text-gray-600 hover:text-[#0F3460] transition-colors">
              Depoimentos
            </a>
            <Link to="/cliente/dashboard">
              <Button variant="outline" className="border-[#0F3460] text-[#0F3460] hover:bg-[#0F3460] hover:text-white">
                Portal Cliente
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90">
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
