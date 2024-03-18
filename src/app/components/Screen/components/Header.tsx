import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Header({ children }: Props) {
  return (
    <header className="h-12 flex justify-between items-center px-2 w-full border-b">
      {children}
    </header>
  );
}
