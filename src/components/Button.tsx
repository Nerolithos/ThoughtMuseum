import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClass = 'font-medium rounded-lg transition-all duration-200 active:scale-95';

  const variantClass = {
    primary: 'bg-museum-accent text-white hover:bg-museum-highlight',
    secondary: 'bg-transparent border border-museum-border text-museum-text hover:bg-museum-border',
    tertiary: 'bg-transparent text-museum-accent hover:text-museum-highlight',
  }[variant];

  const sizeClass = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClass} ${variantClass} ${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          处理中...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
