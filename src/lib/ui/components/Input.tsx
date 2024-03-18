import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const input = cva(
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
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export const Input: React.FC<Props> = ({ className, intent, ...props }) => (
  <input className={input({ intent, className })} {...props} />
);
