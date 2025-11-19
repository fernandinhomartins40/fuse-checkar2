import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface MobileTableProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileTable: React.FC<MobileTableProps> = ({ children, className }) => {
  return (
    <div className={cn("block md:hidden space-y-3", className)}>
      {children}
    </div>
  );
};

interface MobileTableCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MobileTableCard: React.FC<MobileTableCardProps> = ({ children, className, onClick }) => {
  return (
    <Card className={cn("cursor-pointer hover:shadow-md transition-shadow", className)} onClick={onClick}>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};

interface MobileTableRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const MobileTableRow: React.FC<MobileTableRowProps> = ({ label, value, className }) => {
  return (
    <div className={cn("flex justify-between items-center py-1", className)}>
      <span className="text-sm font-medium text-muted-foreground">{label}:</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  );
};

interface MobileTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileTableHeader: React.FC<MobileTableHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("font-semibold text-base mb-2 pb-2 border-b", className)}>
      {children}
    </div>
  );
};

interface MobileTableActionsProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileTableActions: React.FC<MobileTableActionsProps> = ({ children, className }) => {
  return (
    <div className={cn("flex justify-end gap-2 mt-3 pt-3 border-t", className)}>
      {children}
    </div>
  );
};