
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-[#0F3460] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Pronto para modernizar seu auto center?
        </h2>
        <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Comece hoje mesmo a usar o CHECAR e transforme a gestão do seu negócio.
          Seus clientes vão notar a diferença!
        </p>
        <Link to="/admin/login">
          <Button size="lg" className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-8 py-4 text-lg">
            Começar Agora
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
