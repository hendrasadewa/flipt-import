import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { cx } from 'class-variance-authority';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Body } from './components/Body';

interface Props {
  children: ReactNode;
}

export default function Screen({ children }: Props) {
  return (
    <>
      <div
        className={cx([
          'min-h-screen h-screen max-w-screen-sm m-auto',
          'flex flex-col',
        ])}
      >
        {children}
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}

Screen.Header = Header;
Screen.Body = Body;
Screen.Footer = Footer;
