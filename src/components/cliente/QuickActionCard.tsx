
import React from 'react';
import { Link } from 'react-router-dom';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  linkTo: string;
  color: 'blue' | 'orange' | 'purple' | 'green';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  color
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hover: 'hover:from-blue-600 hover:to-blue-700'
    },
    orange: {
      bg: 'bg-gradient-to-br from-[#FF5722] to-orange-600',
      hover: 'hover:from-orange-600 hover:to-orange-700'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hover: 'hover:from-purple-600 hover:to-purple-700'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      hover: 'hover:from-green-600 hover:to-green-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <Link
      to={linkTo}
      className={`${colors.bg} ${colors.hover} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group block`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
        <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;
