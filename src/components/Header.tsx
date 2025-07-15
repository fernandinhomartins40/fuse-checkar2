
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { to: "/", icon: "dashboard", label: "Dashboard" },
    { to: "/clientes", icon: "group", label: "Clientes" },
    { to: "/veiculos", icon: "directions_car", label: "Veículos" },
    { to: "/revisoes", icon: "fact_check", label: "Revisões" },
    { to: "/relatorios", icon: "description", label: "Relatórios" }
  ];

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClick}
          className="hover:text-secondary transition-colors duration-200 flex items-center text-sm md:text-base py-2 md:py-0"
        >
          <span className="material-symbols-outlined mr-2 md:mr-1 text-lg md:text-base">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="material-symbols-outlined text-2xl md:text-3xl">directions_car</span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">CHECAR</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavItems />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-primary text-primary-foreground border-primary/20">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="material-symbols-outlined text-2xl">directions_car</span>
                    <h2 className="text-xl font-bold">CHECAR</h2>
                  </div>
                  <nav className="flex flex-col space-y-2">
                    <NavItems onClick={() => setIsOpen(false)} />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
