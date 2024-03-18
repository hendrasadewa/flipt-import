import { PropsWithChildren } from 'react';

export function Body({ children }: PropsWithChildren) {
  return (
    <main className="space-y-4 flex flex-col h-full justify-center px-2">
      {children}
    </main>
  );
}
