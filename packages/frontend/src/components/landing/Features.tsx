
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "group",
      title: "Gestão de Clientes",
      description: "Cadastre e gerencie informações completas dos seus clientes de forma organizada."
    },
    {
      icon: "directions_car",
      title: "Controle de Veículos",
      description: "Mantenha histórico completo de cada veículo, incluindo especificações e manutenções."
    },
    {
      icon: "fact_check",
      title: "Checklist de Revisão",
      description: "Checklists personalizáveis para garantir que nenhum item seja esquecido."
    },
    {
      icon: "description",
      title: "Relatórios Detalhados",
      description: "Gere relatórios completos das revisões para seus clientes e para controle interno."
    },
    {
      icon: "notification_important",
      title: "Recomendações Técnicas",
      description: "Sistema inteligente de recomendações baseado no estado dos componentes."
    },
    {
      icon: "smartphone",
      title: "Portal do Cliente",
      description: "Seus clientes acompanham o progresso das revisões em tempo real."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Recursos Completos para Auto Centers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para modernizar e profissionalizar seu auto center
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-4xl text-[#FF5722] mb-4 block">
                {feature.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
