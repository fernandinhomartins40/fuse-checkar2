import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClass?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className, containerClass }) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Header />
      <main className={cn("container mx-auto px-4 py-4 md:py-6", containerClass)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;