import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => (
  <div className={clsx('rounded-lg border border-border bg-card shadow-sm', className)}>
    {children}
  </div>
);

