
import React from 'react';
import { Link } from 'react-router-dom';

interface ModernVehicleCardProps {
  id: number;
  veiculo: string;
  placa: string;
  ano: number;
  ultimaRevisao: string;
  status: 'em_dia' | 'atencao' | 'urgente';
  recomendacoes?: number;
}

const ModernVehicleCard: React.FC<ModernVehicleCardProps> = ({
  id,
  veiculo,
  placa,
  ano,
  ultimaRevisao,
  status,
  recomendacoes
}) => {
  const statusConfig = {
    em_dia: {
      icon: 'check_circle',
      text: 'Em dia',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    atencao: {
      icon: 'warning',
      text: `${recomendacoes} recomendação${recomendacoes !== 1 ? 'ões' : ''}`,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    urgente: {
      icon: 'error',
      text: 'Atenção urgente',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined text-2xl">directions_car</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{veiculo}</h3>
            <p className="text-gray-500 text-sm">{placa} • {ano}</p>
          </div>
        </div>
        <Link 
          to={`/cliente/veiculos/${id}`} 
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-gray-100 group-hover:scale-110"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Última revisão:</span>
          <span className="text-gray-900">{ultimaRevisao}</span>
        </div>

        <div className={`flex items-center justify-between p-3 rounded-xl ${config.bg} ${config.border} border`}>
          <div className="flex items-center space-x-2">
            <span className={`material-symbols-outlined text-sm ${config.color}`}>
              {config.icon}
            </span>
            <span className={`text-sm font-medium ${config.color}`}>
              {config.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernVehicleCard;
