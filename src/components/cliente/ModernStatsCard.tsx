
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  linkTo?: string;
  linkText?: string;
  description?: string;
}

const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color,
  linkTo,
  linkText,
  description
}) => {
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500/10 to-blue-600/10',
      iconBg: 'bg-blue-500',
      accent: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      gradient: 'from-green-500/10 to-green-600/10',
      iconBg: 'bg-green-500',
      accent: 'text-green-600',
      border: 'border-green-200'
    },
    yellow: {
      gradient: 'from-yellow-500/10 to-yellow-600/10',
      iconBg: 'bg-yellow-500',
      accent: 'text-yellow-600',
      border: 'border-yellow-200'
    },
    purple: {
      gradient: 'from-purple-500/10 to-purple-600/10',
      iconBg: 'bg-purple-500',
      accent: 'text-purple-600',
      border: 'border-purple-200'
    },
    orange: {
      gradient: 'from-orange-500/10 to-orange-600/10',
      iconBg: 'bg-orange-500',
      accent: 'text-orange-600',
      border: 'border-orange-200'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          <div className={`${colors.iconBg} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="material-symbols-outlined text-white text-xl">{icon}</span>
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center space-x-2 mb-3">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}%
            </span>
            <span className="text-xs text-gray-500">vs último mês</span>
          </div>
        )}

        {/* Action Link */}
        {linkTo && linkText && (
          <Link 
            to={linkTo} 
            className={`inline-flex items-center space-x-1 text-sm ${colors.accent} hover:opacity-80 transition-colors duration-200 font-medium`}
          >
            <span>{linkText}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ModernStatsCard;
