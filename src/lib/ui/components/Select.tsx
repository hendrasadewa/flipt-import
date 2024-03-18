import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const select = cva(
  ['p-2', 'transition-colors duration-300', 'border rounded-md'],
  {
    variants: {
      intent: {
        outlined: ['', ' focus:outline-gray-500'],
      },
    },
    defaultVariants: {
      intent: 'outlined',
    },
  }
);

export interface Props
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof select> {}

export const Select: React.FC<Props> = ({ className, intent, ...props }) => (
  <select className={select({ intent, className })} {...props} />
);
