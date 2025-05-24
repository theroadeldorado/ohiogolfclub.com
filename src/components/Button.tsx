'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'red' | 'white' | 'black';
  size?: 'default' | 'lg' | 'sm';
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'default', href, target, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 rounded-lg';

  const focusRingStyles = variant === 'red' ? 'focus-visible:ring-primary' : 'focus-visible:ring-white';

  const variants = {
    primary: 'bg-white text-black hover:bg-primary hover:text-white',
    secondary: 'text-white border border-white bg-transparent hover:border-primary hover:text-primary',
    red: 'bg-primary text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary',
    white: 'bg-white text-primary border border-transparent hover:border-white hover:bg-primary hover:text-white',
    black: 'bg-black text-white border border-transparent hover:border-black hover:bg-white hover:text-black',
  };

  const sizes = {
    default: 'h-12 px-6 py-3 text-base',
    sm: 'h-10 px-4 py-2 text-sm',
    lg: 'h-14 px-8 py-4 text-lg',
  };

  const classes = cn(baseStyles, focusRingStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
