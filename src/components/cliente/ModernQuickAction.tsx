
import React from 'react';
import { Link } from 'react-router-dom';

interface ModernQuickActionProps {
  title: string;
  description: string;
  icon: string;
  linkTo: string;
  color: 'blue' | 'orange' | 'purple' | 'green' | 'indigo';
  badge?: string;
}

const ModernQuickAction: React.FC<ModernQuickActionProps> = ({
  title,
  description,
  icon,
  linkTo,
  color,
  badge
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hover: 'hover:from-blue-600 hover:to-blue-700',
      shadow: 'shadow-blue-500/25'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      hover: 'hover:from-orange-600 hover:to-orange-700',
      shadow: 'shadow-orange-500/25'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hover: 'hover:from-purple-600 hover:to-purple-700',
      shadow: 'shadow-purple-500/25'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      hover: 'hover:from-green-600 hover:to-green-700',
      shadow: 'shadow-green-500/25'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      hover: 'hover:from-indigo-600 hover:to-indigo-700',
      shadow: 'shadow-indigo-500/25'
    }
  };

  const colors = colorClasses[color];

  return (
    <Link
      to={linkTo}
      className={`relative block ${colors.bg} ${colors.hover} text-white rounded-2xl p-6 shadow-lg ${colors.shadow} hover:shadow-xl transform hover:scale-105 transition-all duration-300 group overflow-hidden`}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
          {badge}
        </div>
      )}
      
      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300 group-hover:scale-110">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
          <span className="material-symbols-outlined text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            arrow_forward
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

export default ModernQuickAction;
