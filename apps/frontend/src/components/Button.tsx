import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button = ({ className, variant = 'primary', ...props }: Props) => (
  <button
    className={clsx(
      'rounded px-4 py-2 font-medium transition',
      variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-500',
      variant === 'ghost' && 'border border-border text-foreground hover:bg-muted',
      className
    )}
    {...props}
  />
);

