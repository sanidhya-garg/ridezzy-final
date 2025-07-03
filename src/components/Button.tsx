import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
};
