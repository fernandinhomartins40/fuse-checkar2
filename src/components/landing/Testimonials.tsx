
import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      business: "Auto Center Silva",
      text: "O CHECAR transformou completamente nosso atendimento. Os clientes agora confiam mais no nosso trabalho e conseguimos ser muito mais organizados.",
      rating: 5
    },
    {
      name: "Maria Santos",
      business: "Oficina Santos & Filhos",
      text: "Impressionante como conseguimos reduzir o tempo das revisões. O sistema é muito intuitivo e os relatórios são profissionais.",
      rating: 5
    },
    {
      name: "João Oliveira",
      business: "Mecânica Oliveira",
      text: "Nossos clientes adoram poder acompanhar o progresso online. Isso gerou muito mais confiança e fidelização.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600">
            Depoimentos reais de auto centers que transformaram seus negócios
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-yellow-400">
                    star
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-[#FF5722] text-sm">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
