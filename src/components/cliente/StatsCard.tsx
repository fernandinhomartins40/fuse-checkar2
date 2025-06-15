
import React from 'react';
import { Link } from 'react-router-dom';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'orange' | 'yellow' | 'green';
  linkTo?: string;
  linkText?: string;
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  linkTo,
  linkText,
  subtitle
}) => {
  const colorClasses = {
    blue: {
      border: 'border-l-[#0F3460]',
      iconBg: 'bg-[#0F3460]/10',
      iconColor: 'text-[#0F3460]',
      linkColor: 'text-[#0F3460] hover:text-[#FF5722]'
    },
    orange: {
      border: 'border-l-[#FF5722]',
      iconBg: 'bg-[#FF5722]/10',
      iconColor: 'text-[#FF5722]',
      linkColor: 'text-[#FF5722] hover:text-[#0F3460]'
    },
    yellow: {
      border: 'border-l-yellow-500',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-600',
      linkColor: 'text-yellow-600 hover:text-[#FF5722]'
    },
    green: {
      border: 'border-l-green-500',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-600',
      linkColor: 'text-green-600 hover:text-[#0F3460]'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${colors.border} border-l-4 p-6 hover:shadow-md transition-all duration-300 group`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className={`h-14 w-14 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <span className={`material-symbols-outlined text-2xl ${colors.iconColor}`}>
            {icon}
          </span>
        </div>
      </div>
      
      {linkTo && linkText && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            to={linkTo} 
            className={`text-sm ${colors.linkColor} flex items-center space-x-1 transition-colors duration-200 font-medium`}
          >
            <span>{linkText}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
