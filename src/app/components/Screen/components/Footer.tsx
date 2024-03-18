import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Footer({ children }: Props) {
  return <footer className="h-12 px-2 border-t">{children}</footer>;
}
