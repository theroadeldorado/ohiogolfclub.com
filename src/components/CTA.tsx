'use client';

import React from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface CTAProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
  variant?: 'default' | 'wide';
}

const CTA = ({ title, description, buttonText, buttonLink, className, variant = 'default' }: CTAProps) => {
  return (
    <div className={cn('bg-black border border-white/10 p-8 md:p-12', variant === 'wide' ? 'w-full' : 'max-w-3xl mx-auto', className)}>
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      {description && <p className="text-gray-400 mb-6">{description}</p>}
      <Button href={buttonLink} variant="primary">
        {buttonText}
      </Button>
    </div>
  );
};

export { CTA };
