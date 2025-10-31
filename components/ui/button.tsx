import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#FF7A00] text-white hover:bg-[#E66D00] focus:ring-[#FF7A00]',
    secondary: 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] focus:ring-[#1A1A1A]',
    outline: 'border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white focus:ring-[#FF7A00]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] focus:ring-[#EF4444]',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
