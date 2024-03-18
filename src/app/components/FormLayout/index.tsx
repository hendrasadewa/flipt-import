import { FormHTMLAttributes, ReactNode } from 'react';

import { Header } from './components/Header';
import { Body } from './components/Body';
import { Footer } from './components/Footer';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export default function FormLayout({ children, ...rest }: Props) {
  return (
    <form
      className="px-2 space-y-4 flex h-full justify-center flex-col w-full"
      {...rest}
    >
      {children}
    </form>
  );
}

FormLayout.Header = Header;
FormLayout.Body = Body;
FormLayout.Footer = Footer;
