'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const Section = ({ children, className, id, fullWidth = false, style }: SectionProps) => {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)} style={style}>
      {fullWidth ? children : <div className="container mx-auto px-4">{children}</div>}
    </section>
  );
};

export { Section };
