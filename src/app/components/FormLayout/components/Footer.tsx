import { PropsWithChildren } from 'react';

export function Footer({ children }: PropsWithChildren) {
  return <footer className="border-t py-2">{children}</footer>;
}
