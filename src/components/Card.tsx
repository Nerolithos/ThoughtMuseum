import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glassEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  glassEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(
        'museum-card p-6 transition-transform duration-200',
        glassEffect && 'glass-effect',
        hoverable && 'cursor-pointer hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  title,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn('museum-panel', className)}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-museum-border">
          {icon && <div className="text-2xl">{icon}</div>}
          <h3 className="heading-3">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};
