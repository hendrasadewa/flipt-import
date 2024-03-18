import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Body({ children }: Props) {
  return (
    <main className="flex-1 flex h-full w-full p-2">
      <>{children}</>
    </main>
  );
}
