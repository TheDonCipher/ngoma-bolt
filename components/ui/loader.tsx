import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

export const Loader = ({ size = 'md', text, className = '' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-t-indigo-600 border-r-indigo-600/60 border-b-indigo-600/40 border-l-indigo-600/20 rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  );
};

export default Loader;
