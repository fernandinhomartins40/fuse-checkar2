
import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      title: "Aumente a Produtividade",
      description: "Reduza o tempo gasto com papelada e processos manuais. Foque no que realmente importa: o atendimento ao cliente.",
      icon: "trending_up"
    },
    {
      title: "Melhore a Transparência",
      description: "Clientes acompanham o progresso das revisões em tempo real, aumentando a confiança no seu serviço.",
      icon: "visibility"
    },
    {
      title: "Profissionalize seu Negócio", 
      description: "Relatórios detalhados e organizados demonstram profissionalismo e geram maior credibilidade.",
      icon: "workspace_premium"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Por que escolher o CHECAR?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme a forma como você gerencia seu auto center
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#FF5722] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-white text-3xl">
                  {benefit.icon}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
