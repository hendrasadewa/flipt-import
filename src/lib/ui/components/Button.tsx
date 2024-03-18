import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const button = cva(
  [
    'rounded-md',
    'transition-colors duration-300',
    'text-base',
    'cursor-pointer disabled:cursor-not-allowed',
  ],
  {
    variants: {
      intent: {
        solid: [
          'bg-emerald-500',
          'hover:bg-emerald-800',
          'disabled:bg-emerald-200',
          'text-white',
        ],
        outlined: [
          'border',
          'border-emerald-500 text-emerald-500',
          'hover:bg-emerald-200',
        ],
        ghost: ['text-emerald-500'],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4'],
      },
    },
    compoundVariants: [
      {
        intent: 'solid',
        size: 'medium',
      },
    ],
    defaultVariants: {
      intent: 'ghost',
      size: 'medium',
    },
  }
);

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<Props> = ({
  className,
  intent,
  size,
  ...props
}) => <button className={button({ intent, size, className })} {...props} />;
