import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover hover:shadow-glow',
    secondary: 'bg-surface border border-surfaceBorder text-white hover:bg-surfaceHover',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'text-text-secondary hover:text-white hover:bg-surfaceHover',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
