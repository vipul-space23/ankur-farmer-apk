import React from 'react';

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function SimpleButton({ 
  variant = 'default', 
  size = 'default', 
  className = '', 
  children, 
  ...props 
}: SimpleButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
  
  const variantClasses = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-green-700 hover:bg-green-100",
    secondary: "bg-green-100 text-green-800 hover:bg-green-200"
  };
  
  const sizeClasses = {
    default: "px-4 py-2 rounded-md",
    sm: "px-3 py-1.5 text-sm rounded",
    lg: "px-6 py-3 text-lg rounded-lg",
    icon: "p-2 rounded-md"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={`${classes} dark:bg-green-800 dark:hover:bg-green-900`} {...props}>
      {children}
    </button>
  );
}