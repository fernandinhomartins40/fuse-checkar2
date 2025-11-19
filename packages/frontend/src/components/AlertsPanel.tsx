
import React from 'react';
import { Link } from 'react-router-dom';

const AlertsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Alertas Críticos</h3>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          <li className="flex items-start p-3 bg-red-50 rounded-md border-l-4 border-red-500">
            <span className="material-symbols-outlined text-red-500 mr-2">warning</span>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Freios críticos - Honda Civic (ABC-1234)
              </p>
              <p className="text-xs text-gray-600">Cliente: Maria Silva</p>
              <Link to="/revisoes/1" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                Ver detalhes
              </Link>
            </div>
          </li>
          <li className="flex items-start p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
            <span className="material-symbols-outlined text-yellow-500 mr-2">
              tire_repair
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Pneus desgastados - Fiat Uno (XYZ-9876)
              </p>
              <p className="text-xs text-gray-600">Cliente: José Santos</p>
              <Link to="/revisoes/2" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                Ver detalhes
              </Link>
            </div>
          </li>
          <li className="flex items-start p-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
            <span className="material-symbols-outlined text-blue-500 mr-2">
              priority_high
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Revisão vencida - Toyota Corolla (DEF-5678)
              </p>
              <p className="text-xs text-gray-600">Cliente: Carlos Oliveira</p>
              <Link to="/revisoes/3" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                Ver detalhes
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AlertsPanel;
