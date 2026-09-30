import type { HTMLAttributes } from 'react';

export function Section({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-16 md:py-24 ${className}`} {...props}>
      {children}
    </section>
  );
}
