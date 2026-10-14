import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button'
}) {
  let baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';
  } else if (variant === 'outline') {
    variantStyles = 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800';
  } else if (variant === 'danger') {
    variantStyles = 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm';
  } else if (variant === 'success') {
    variantStyles = 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm';
  } else if (variant === 'ghost') {
    variantStyles = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100';
  }

  let sizeStyles = '';
  if (size === 'sm') {
    sizeStyles = 'px-3 py-1.5 text-xs gap-1.5';
  } else if (size === 'md') {
    sizeStyles = 'px-4 py-2 text-sm gap-2';
  } else if (size === 'lg') {
    sizeStyles = 'px-5 py-2.5 text-base gap-2.5';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
